import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ChatService, Message } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  userInput: string = '';
  messages: Message[] = [];
  isLoading: boolean = false;
  private routeSub: Subscription | undefined;
  private isNewConversation = true;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // We are loading a past conversation
        this.isNewConversation = false;
        this.chatService.getConversationById(id).subscribe(convo => {
          if (convo) {
            this.messages = convo.messages;
          }
        });
      } else {
        // --- THIS IS THE FIX ---
        // This is a new chat, so we must clear any old messages from a re-used component.
        this.messages = [];
        this.isNewConversation = true;

        // Check for a sample prompt passed from the prompts page
        this.route.queryParams.subscribe(queryParams => {
            const samplePrompt = queryParams['prompt'];
            if(samplePrompt) {
                this.userInput = samplePrompt;
                this.sendMessage();
            }
        });
      }
    });
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput;
    this.messages.push({ sender: 'user', text: userMessage });
    
    // Save conversation right after the first message is sent
    if (this.isNewConversation) {
        this.saveCurrentConversation();
        this.isNewConversation = false; 
    }

    this.userInput = '';
    this.isLoading = true;

    this.chatService.sendMessage(userMessage).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'bot', text: response.response });
        this.isLoading = false;
      },
      error: (err) => {
        this.messages.push({ sender: 'bot', text: 'Sorry, something went wrong. Please try again.' });
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  startNewChat(): void {
      this.saveCurrentConversation();
      this.router.navigate(['/chat']).then(() => {
          this.messages = [];
          this.isNewConversation = true;
          this.userInput = '';
      });
  }

  saveCurrentConversation(): void {
      if (this.messages.length > 0) {
          this.chatService.saveConversation(this.messages);
      }
  }

  ngOnDestroy(): void {
    this.saveCurrentConversation(); // Save conversation when leaving the page
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

