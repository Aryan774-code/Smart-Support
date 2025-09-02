import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  // Use a BehaviorSubject to easily track the current theme
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    // We use Renderer2 to safely manipulate the DOM (the document body)
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Initializes the theme based on user's saved preference or system preference.
   */
  initializeTheme(): void {
    const savedPreference = localStorage.getItem('theme');
    // Check for saved preference first, then fall back to system preference
    if (savedPreference) {
      this.setTheme(savedPreference === 'dark');
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    }
  }

  /**
   * Toggles the current theme between light and dark.
   */
  toggleTheme(): void {
    const newThemeState = !this.isDarkMode.value;
    this.setTheme(newThemeState);
  }

  /**
   * Applies the selected theme to the application.
   * @param isDark - True for dark mode, false for light mode.
   */
  private setTheme(isDark: boolean): void {
    this.isDarkMode.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}
