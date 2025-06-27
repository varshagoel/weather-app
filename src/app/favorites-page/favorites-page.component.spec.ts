import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  let component: FavoritesPageComponent;
  let fixture: ComponentFixture<FavoritesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesPageComponent]  // Standalone component!
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites from localStorage on init', () => {
    // Arrange: mock localStorage
    const fakeFavorites = [
      { city: 'Fremont', isFavorite: true },
      { city: 'San Jose', isFavorite: true }
    ];
    spyOn(localStorage, 'favorites').and.returnValue(JSON.stringify(fakeFavorites));

    // Act: call ngOnInit manually
    component.ngOnInit();

    // Assert: check the array
    expect(component.favorites.length).toBe(2);
    expect(component.favorites[0].city).toBe('Fremont');
  });

  it('should set favorites to empty array if no localStorage data', () => {
    spyOn(localStorage, 'favorites').and.returnValue(null);

    component.ngOnInit();

    expect(component.favorites).toEqual([]);
  });
});
