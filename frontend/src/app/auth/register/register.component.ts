import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // <-- CORRECTED: Points to its own stylesheet
})
export class RegisterComponent {
  credentials = {
    username: '',
    password: ''
  };
  // We need both success and error messages
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.authService.register(this.credentials).subscribe(() => {
      this.successMessage = 'Registration successful! Redirecting to login...';
      // Redirect to login after a short delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    });
  }
}

