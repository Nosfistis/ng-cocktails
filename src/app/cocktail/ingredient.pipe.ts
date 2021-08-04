import { Pipe, PipeTransform } from '@angular/core';

import {
  Cocktail,
  Count,
  IngredientKey,
  MeasureKey,
} from '../cocktails/cocktail';

@Pipe({ name: 'ingredient' })
export class IngredientPipe implements PipeTransform {
  transform(cocktail: Cocktail, index: Count): string {
    const ingredientKey: IngredientKey = `strIngredient${index}`;
    const measureKey: MeasureKey = `strMeasure${index}`;

    return cocktail[ingredientKey]
      ? `${cocktail[ingredientKey]} (${cocktail[measureKey]
          ?.trim()
          .toLowerCase()})`
      : '';
  }
}
