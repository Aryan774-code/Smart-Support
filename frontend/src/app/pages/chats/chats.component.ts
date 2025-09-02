import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatService, Conversation } from '../../services/chat.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  conversations: Conversation[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.conversations = this.chatService.getConversations();
  }

  // Helper function to format the timestamp for display
  formatTimestamp(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }
}

