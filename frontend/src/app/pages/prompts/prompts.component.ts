import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prompts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent {
  samplePrompts: string[] = [
    "Explain quantum computing in simple terms.",
    "What are three tips for improving productivity?",
    "Write a short story about a robot who discovers music.",
    "What was the significance of the Silk Road?",
    "Give me a recipe for a simple pasta dish."
  ];
}

