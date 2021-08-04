import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CocktailResolver } from './cocktail.resolver';
import { CocktailService } from './cocktail.service';

describe('CocktailResolver', () => {
  let resolver: CocktailResolver;
  let cocktailService: jasmine.SpyObj<CocktailService>;

  beforeEach(() => {
    cocktailService = jasmine.createSpyObj<CocktailService>('CocktailService', [
      'getCocktail',
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: CocktailService, useValue: cocktailService }],
    });
    resolver = TestBed.inject(CocktailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
