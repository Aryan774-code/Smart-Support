import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for async pipe
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service'; // <-- IMPORT

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add CommonModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDarkMode$: Observable<boolean>; // Create an observable to track the theme

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.isDarkMode$; // Assign the observable
  }

  toggleTheme(): void {
    this.themeService.toggleTheme(); // Method to call when the button is clicked
  }
}

