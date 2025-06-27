import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherPageComponent } from './weather-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WeatherService } from '../weather.service';

describe('WeatherPageComponent', () => {
  let component: WeatherPageComponent;
  let fixture: ComponentFixture<WeatherPageComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create a mock WeatherService
    mockWeatherService = jasmine.createSpyObj('WeatherService', [
      'getCitySuggestions',
      'getCurrentConditions',
      'getFiveDayForecast'
    ]);

    // Mock route with paramMap
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => 'Fremont'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [WeatherPageComponent], // ✅ standalone
      providers: [
        { provide: WeatherService, useValue: mockWeatherService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get city name from route param and call selectCity()', () => {
    spyOn(component, 'selectCity');
    component.ngOnInit();
    expect(component.selectCity).toHaveBeenCalledWith
  })
})