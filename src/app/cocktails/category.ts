import { Cocktail } from './cocktail';

export interface Category {
  strCategory: string;
}

export type CategoryQueryResult = Pick<
  Cocktail,
  'isDrink' | 'strDrink' | 'strDrinkThumb'
>;
