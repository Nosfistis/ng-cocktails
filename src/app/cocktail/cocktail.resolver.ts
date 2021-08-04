import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cocktail } from '../cocktails/cocktail';
import { CocktailService } from './cocktail.service';

@Injectable({ providedIn: 'root' })
export class CocktailResolver implements Resolve<Cocktail> {
  constructor(
    private readonly cocktailService: CocktailService,
    private readonly router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Cocktail> {
    return this.cocktailService
      .getCocktail(route.paramMap.get('idDrink')!)
      .pipe(
        catchError(() => {
          this.router.navigate(['error', 'not-found'], {
            skipLocationChange: true,
          });

          return EMPTY;
        })
      );
  }
}
