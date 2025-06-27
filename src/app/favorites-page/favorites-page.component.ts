import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list'
import {MatToolbar} from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, MatListModule, MatToolbar,RouterModule,MatIconModule,MatCardModule],
  templateUrl: './favorites-page.component.html'
})
export class FavoritesPageComponent implements OnInit {
  favorites: any[] = [];

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        this.favorites = JSON.parse(saved);
      }
    }
}
}