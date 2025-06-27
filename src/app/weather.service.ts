import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private API_KEY = '1IJpdJrchnlqbw7cCdQfxTaMtAeTXp1U';
  private BASE_URL = 'https://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}

  getCitySuggestions(query: string): Observable<any> {
    if (!query) return of([]);
    return this.http.get(`${this.BASE_URL}/locations/v1/cities/autocomplete`, {
      params: { apikey: this.API_KEY, q: query }
    });
  }

  getCurrentConditions(cityKey: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/currentconditions/v1/${cityKey}`, {
      params: { apikey: this.API_KEY }
    });
  }

  getFiveDayForecast(cityKey: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/forecasts/v1/daily/5day/${cityKey}`, {
      params: { apikey: this.API_KEY, metric: 'true' }
    });
  }
}