import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cocktail } from '../cocktails/cocktail';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  constructor(private readonly http: HttpClient) {}

  getCocktail(id: string): Observable<Cocktail> {
    const params = new HttpParams({ fromObject: { i: id } });

    return this.http
      .get<{ drinks: [Cocktail] }>('/lookup.php', { params })
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error('Not found');
          }

          return response.drinks[0];
        })
      );
  }
}
