import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemeService } from './services/theme.service'; // <-- IMPORT

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-support-frontend';

  // Inject the service and initialize the theme in the constructor
  constructor(private themeService: ThemeService) {
    this.themeService.initializeTheme();
  }
}

