import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from './category';

import { Cocktail } from './cocktail';
import { CocktailService } from './cocktail.service';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const drinks: Cocktail[] = [
    { strDrink: 'abc', strCategory: 'Drink' } as Cocktail,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CocktailService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request all cocktails', () => {
    service.getCocktails().subscribe((data) => expect(data).toEqual(drinks));

    const req = httpTestingController.expectOne('/search.php?f=a');

    expect(req.request.method).toEqual('GET');
    req.flush({ drinks });
  });

  it('should request cocktails by name', () => {
    service
      .getCocktailsByName('abc')
      .subscribe((data) => expect(data).toEqual(drinks));

    const req = httpTestingController.expectOne('/search.php?s=abc');

    expect(req.request.method).toEqual('GET');
    req.flush({ drinks });
  });

  it('should return empty list if no cocktail is found by name', () => {
    service
      .getCocktailsByName('Test')
      .subscribe((data) => expect(data).toEqual([]));

    const req = httpTestingController.expectOne('/search.php?s=Test');

    expect(req.request.method).toEqual('GET');
    req.flush({ drinks: null });
  });

  it('should request cocktails by category', () => {
    service
      .getCocktailsByCategory('Drink')
      .subscribe((data) => expect(data).toEqual(drinks));

    const req = httpTestingController.expectOne('/filter.php?c=Drink');

    expect(req.request.method).toEqual('GET');
    req.flush({ drinks });
  });

  it('should retrieve categories', () => {
    const categories: Category[] = [{ strCategory: 'Drink' }];

    service
      .getCategories()
      .subscribe((data) => expect(data).toEqual(categories));

    const req = httpTestingController.expectOne('/list.php?c=list');

    expect(req.request.method).toEqual('GET');
    req.flush({ drinks: categories });
  });
});
