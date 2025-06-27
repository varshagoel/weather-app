import { Routes } from '@angular/router';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

export const routes: Routes = [
  { path: 'weather/:city', component: WeatherPageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '', redirectTo: '/weather/New york', pathMatch: 'full' },
];
