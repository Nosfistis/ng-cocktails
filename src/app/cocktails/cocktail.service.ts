import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Category, CategoryQueryResult } from './category';

import { Cocktail } from './cocktail';

@Injectable({ providedIn: 'root' })
export class CocktailService {
  constructor(private readonly http: HttpClient) {
  }

  getCocktails(): Observable<Cocktail[]> {
    return this.http.get<{ drinks: Cocktail[] }>('/search.php?f=a')
      .pipe(pluck('drinks'));
  }

  getCocktailsByName(name: string): Observable<Cocktail[]> {
    const params = new HttpParams({ fromObject: { s: name } });

    return this.http.get<{ drinks: Cocktail[] }>('/search.php', { params })
      .pipe(map(result => result.drinks ?? []));
  }

  getCocktailsByCategory(category: string): Observable<CategoryQueryResult[]> {
    const params = new HttpParams({ fromObject: { c: category } });

    return this.http.get<{ drinks: Cocktail[] }>('/filter.php', { params })
      .pipe(pluck('drinks'));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<{ drinks: Category[] }>('/list.php?c=list')
      .pipe(pluck('drinks'));
  }
}
