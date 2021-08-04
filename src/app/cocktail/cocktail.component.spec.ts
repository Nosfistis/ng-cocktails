import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { BasePage } from '../../testing';
import { Cocktail } from '../cocktails/cocktail';
import { CocktailComponent } from './cocktail.component';
import { CocktailModule } from './cocktail.module';

describe('CocktailComponent', () => {
  let component: CocktailComponent;
  let fixture: ComponentFixture<CocktailComponent>;
  let page: Page;

  class Page extends BasePage<CocktailComponent> {
    get title() {
      return this.query<HTMLHeadingElement>('.mat-card-title > h1');
    }

    get subtitle() {
      return this.query<HTMLDivElement>('.mat-card-subtitle');
    }

    get thumbnail() {
      return this.query<HTMLImageElement>('img');
    }

    get ingredients() {
      return this.queryAll<HTMLDivElement>('.mat-list-item-content');
    }

    get instructions() {
      return this.query<HTMLParagraphElement>('p');
    }

    get backLink() {
      return this.query<HTMLAnchorElement>('a');
    }
  }

  const cocktail = {
    strDrink: 'Afternoon',
    strCategory: 'Coffee / Tea',
    strDrinkThumb: 'https://url/afternoon',
    strInstructions: 'Mix together',
    strIngredient1: 'Milk',
    strMeasure1: '1 cup',
    strIngredient2: 'Cocoa',
    strMeasure2: '1 scoop',
  } as Cocktail;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CocktailModule],
    }).compileComponents();

    TestBed.inject(ActivatedRoute).data = new BehaviorSubject({ cocktail });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the cocktail details', () => {
    expect(page.title.textContent).toEqual(cocktail.strDrink);
    expect(page.subtitle.textContent).toEqual(cocktail.strCategory);
    expect(page.thumbnail.src).toEqual(cocktail.strDrinkThumb);
    expect(page.thumbnail.alt).toEqual(cocktail.strDrink);
    expect(
      page.ingredients.map((ingredient) => ingredient.textContent)
    ).toEqual(['Milk (1 cup)', 'Cocoa (1 scoop)']);
    expect(page.instructions.textContent).toEqual(cocktail.strInstructions);
  });

  it('should go back to list', () => {
    const backSpy = spyOn(history, 'back');

    page.backLink.click();
    fixture.detectChanges();

    expect(backSpy).toHaveBeenCalled();
  });
});
