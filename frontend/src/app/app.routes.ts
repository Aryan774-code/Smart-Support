import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { PromptsComponent } from './pages/prompts/prompts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth.guard'; // <-- IMPORT GUARD

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // --- PROTECTED ROUTES ---
    { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
    { path: 'chat/:id', component: ChatComponent, canActivate: [authGuard] },
    { path: 'chats', component: ChatsComponent, canActivate: [authGuard] },
    { path: 'prompts', component: PromptsComponent, canActivate: [authGuard] },
];

