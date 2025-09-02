import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { PromptsComponent } from './pages/prompts/prompts.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'chat/:id', component: ChatComponent }, // To load a specific chat
    { path: 'chats', component: ChatsComponent },
    { path: 'prompts', component: PromptsComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: '**', redirectTo: '/home' } // Wildcard route for 404
];
