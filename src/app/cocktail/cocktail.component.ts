import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cocktail, Count } from '../cocktails/cocktail';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../../styles/card.css', '/cocktail.component.css'],
})
export class CocktailComponent {
  cocktail$: Observable<Cocktail> = this.route.data.pipe(
    map((data) => data.cocktail)
  );

  ingredientList = Array.from(Array(15)).map((_, index) =>
    String(index + 1)
  ) as Count[];

  constructor(readonly route: ActivatedRoute) {}

  goBack(): void {
    history.back();
  }
}
