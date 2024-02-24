// tab4.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {
  msOfficeRating = 4; // Ganti dengan nilai sesuai kebutuhan
  berhitungRating = 5;
  menulisRating = 4;
  leadershipRating = 4;

  getRatingCircles(rating: number): string[] {
    const circles: string[] = [];
    for (let i = 0; i < 5; i++) {
      circles.push(i < rating ? 'blue' : 'black');
    }
    return circles;
  }
}
