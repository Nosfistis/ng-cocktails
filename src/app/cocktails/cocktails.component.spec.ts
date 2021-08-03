import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { BasePage } from '../../testing';
import { Cocktail } from './cocktail';
import { CocktailService } from './cocktail.service';
import { CocktailsComponent } from './cocktails.component';
import { CocktailsModule } from './cocktails.module';

describe('CocktailsComponent', () => {
  let component: CocktailsComponent;
  let fixture: ComponentFixture<CocktailsComponent>;
  let page: Page;
  let cocktailService: jasmine.SpyObj<CocktailService>;

  class Page extends BasePage<CocktailsComponent> {
    get cocktailTitles() {
      return this.queryAll<HTMLDivElement>('.mat-card-title');
    }

    get cocktailCategories() {
      return this.queryAll<HTMLDivElement>('.mat-card-subtitle');
    }

    get cocktailThumbnails() {
      return this.queryAll<HTMLImageElement>('img.mat-card-image');
    }

    set categoryValue(value: string) {
      this.setInputValue('select[name="category"]', value);
    }

    set nameValue(value: string) {
      this.setInputValue('input[name="name"]', value);
    }

    get searchButton() {
      return this.query<HTMLButtonElement>('button[type="submit"]');
    }
  }

  const cocktails = [
    {
      strDrink: 'Afternoon',
      strCategory: 'Coffee / Tea',
      strDrinkThumb: 'https://url/afternoon',
    },
    {
      strDrink: 'Acapulco',
      strCategory: 'Ordinary drink',
      strDrinkThumb: 'https://url/acapulco',
    },
    {
      strDrink: 'Adam',
      strCategory: 'Cocktail',
      strDrinkThumb: 'https://url/adam',
    },
  ] as Cocktail[];

  beforeEach(async () => {
    cocktailService = jasmine.createSpyObj<CocktailService>(
      'CocktailService',
      [
        'getCategories',
        'getCocktails',
        'getCocktailsByCategory',
        'getCocktailsByName',
      ],
    );
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), CocktailsModule, NoopAnimationsModule],
      providers: [{ provide: CocktailService, useValue: cocktailService }],
    }).compileComponents();

    cocktailService.getCocktails.and.returnValue(of(cocktails));
    cocktailService.getCategories.and.returnValue(of(cocktails));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailsComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all cocktails on page load', () => {
    expect(page.cocktailTitles.map(title => title.textContent)).toEqual(cocktails.map(cocktail => cocktail.strDrink));
    expect(page.cocktailCategories.map(category => category.textContent)).toEqual(cocktails.map(cocktail => cocktail.strCategory));
    expect(page.cocktailThumbnails.map(thumbnail => thumbnail.src)).toEqual(cocktails.map(cocktail => cocktail.strDrinkThumb));
    expect(page.cocktailThumbnails.map(thumbnail => thumbnail.alt)).toEqual(cocktails.map(cocktail => cocktail.strDrink));
  });

  it('should render cocktails by category', async () => {
    cocktailService.getCocktailsByCategory.and.returnValue(of(cocktails.slice(2)));

    page.categoryValue = 'Cocktail';
    page.searchButton.click();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(TestBed.inject(ActivatedRoute).snapshot.queryParams).toEqual({ category: 'Cocktail' });
    expect(cocktailService.getCocktailsByCategory).toHaveBeenCalledOnceWith('Cocktail');
    expect(cocktailService.getCocktailsByName).not.toHaveBeenCalled();
    expect(page.cocktailTitles).toHaveSize(1);
    expect(page.cocktailCategories).toHaveSize(1);
    expect(page.cocktailThumbnails).toHaveSize(1);
  });

  it('should render cocktails by name', async () => {
    cocktailService.getCocktailsByName.and.returnValue(of(cocktails.slice(2)));

    page.nameValue = 'Aca';
    page.searchButton.click();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(TestBed.inject(ActivatedRoute).snapshot.queryParams).toEqual({ name: 'Aca' });
    expect(cocktailService.getCocktailsByName).toHaveBeenCalledOnceWith('Aca');
    expect(cocktailService.getCocktailsByCategory).not.toHaveBeenCalled();
    expect(page.cocktailTitles).toHaveSize(1);
    expect(page.cocktailCategories).toHaveSize(1);
    expect(page.cocktailThumbnails).toHaveSize(1);
  });

  it('should render cocktails by name and category', async () => {
    cocktailService.getCocktailsByName.and.returnValue(of(cocktails.slice(1)));
    cocktailService.getCocktailsByCategory.and.returnValue(of(cocktails.slice(2)));

    page.nameValue = 'A';
    page.categoryValue = 'Cocktail';
    page.searchButton.click();
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(TestBed.inject(ActivatedRoute).snapshot.queryParams).toEqual({ name: 'A', category: 'Cocktail' });
    expect(cocktailService.getCocktailsByName).toHaveBeenCalledOnceWith('A');
    expect(cocktailService.getCocktailsByCategory).toHaveBeenCalledOnceWith('Cocktail');
    expect(page.cocktailTitles).toHaveSize(1);
    expect(page.cocktailCategories).toHaveSize(1);
    expect(page.cocktailThumbnails).toHaveSize(1);
  });
});
