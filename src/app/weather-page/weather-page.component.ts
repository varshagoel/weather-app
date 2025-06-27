import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';

interface SelectedCity {
  key: string;
  name: string;
  isFavorite: boolean;
  currentCondition: any;
  forecast: any;
}

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [CommonModule,
     FormsModule,
     MatToolbarModule, 
     MatInputModule,
      MatButtonModule,
      MatCardModule ,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule,RouterModule],
  templateUrl: './weather-page.component.html'
})
export class WeatherPageComponent {
  query = 'New york';
  suggestions: any[] = [];
  
  selectedCity: SelectedCity = {
    key : '',
    name: '',
    isFavorite: false,
    currentCondition: null,
    forecast: null
  };

  constructor(private weatherService: WeatherService,private route: ActivatedRoute) {}

  // searchCity() {
  //   console.log('Query changed:', this.query);  // <-- Debug line
  //   if(this.query.length > 2){
  //     this.weatherService.getCitySuggestions(this.query).subscribe(
  //       res => {
  //         console.log('Suggestions:', res);
  //         this.suggestions = res;
  //       },
  //       err => console.error('API error:', err)
  //     );
  //   }
  // }

  ngOnInit(): void {
    let cityName = this.route.snapshot.paramMap.get('city')!;
    this.selectCity(cityName ? cityName: 'New york');
  }

  selectCity(cityName: string){
    // this.selectedCity.isFavorite = false;
    this.weatherService.getCitySuggestions(cityName).subscribe(locations => {
      if (locations.length > 0) {
        const locationKey = locations[0].Key;
        let favorites: SelectedCity[] = this.getFavorites();
        if (!favorites.some(item => item.key === locationKey)) {
          this.weatherService.getCurrentConditions(locationKey).subscribe(data => {
            this.selectedCity.currentCondition  = data[0];
            this.selectedCity.key = locationKey;
            this.selectedCity.name = cityName;
          });
          this.weatherService.getFiveDayForecast(locationKey).subscribe(data => {this.selectedCity.forecast = data;console.log(this.selectedCity)});
        }
        else{
          this.selectedCity = favorites.find(item => item.key === locationKey)!;
        }
      }
    });
  }

getFavorites(): SelectedCity[] {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

  addToFavorites(city: SelectedCity): void {
    // Step 1: Get the existing list (or start with empty array)
    let favorites: SelectedCity[] = this.getFavorites();
  
    // Step 2: Check if item is already in list (optional)
    if (!favorites.some(item => item.key === city.key)) {
      city.isFavorite = true;
      favorites.push(city);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(`${city} added to favorites.`);
    } else {
      console.log(`${city} is already in favorites.`);
    }
  }

  removeFromFavorites(city: SelectedCity): void {
    let favorites: SelectedCity[] = this.getFavorites();
    favorites = favorites.filter(item => item.key !== city.key);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log(`${city} removed from favorites.`);
    city.isFavorite = false;
  }
  toggleFavorite(city: SelectedCity) {
    const favorites = this.getFavorites();
    if (favorites.some(item => item.key === city.key)) {
      this.removeFromFavorites(city);
    } else {
      this.addToFavorites(city);
    }
  }
}
