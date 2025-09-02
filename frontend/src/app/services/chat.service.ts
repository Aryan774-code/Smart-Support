import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Define a structure for each message in our chat history
export interface Message {
  sender: 'user' | 'bot';
  text: string;
}

// Define the structure of a full conversation
export interface Conversation {
  id: string;
  title: string;
  timestamp: number;
  messages: Message[];
}

// Define the shape of the response object we expect from the backend
interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/api/chat';
  private historyKey = 'smart-support-chat-history';

  constructor(private http: HttpClient) { }

  sendMessage(userMessage: string): Observable<ChatResponse> {
    const requestBody = { prompt: userMessage };
    return this.http.post<ChatResponse>(this.apiUrl, requestBody);
  }

  // --- HISTORY MANAGEMENT ---

  saveConversation(messages: Message[]): void {
    if (messages.length === 0) return;

    const conversations = this.getConversations();
    const newConversation: Conversation = {
      id: new Date().toISOString(), // Simple unique ID
      title: messages[0].text.substring(0, 40) + '...', // Title is first 40 chars of first message
      timestamp: Date.now(),
      messages: messages
    };

    conversations.unshift(newConversation); // Add to the beginning of the list
    localStorage.setItem(this.historyKey, JSON.stringify(conversations));
  }

  getConversations(): Conversation[] {
    const historyJson = localStorage.getItem(this.historyKey);
    return historyJson ? JSON.parse(historyJson) : [];
  }

  getConversationById(id: string): Observable<Conversation | undefined> {
    const conversations = this.getConversations();
    const conversation = conversations.find(c => c.id === id);
    return of(conversation); // Return as an Observable
  }
}

