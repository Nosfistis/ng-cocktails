import { Category } from './category';

type Count = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15';
type IngredientKey = `strIngredient${Count}`;
type MeasureKey = `strMeasure${Count}`;

type Language = '' | 'DE' | 'ES' | 'FR' | 'IT' | 'ZH-HANS' | 'ZH-HANT';
type InstructionsKey = `strInstructions${Language}`;

type CocktailWithExtras = {
  [Property in IngredientKey | MeasureKey | InstructionsKey]: string;
}

export interface Cocktail extends CocktailWithExtras, Category {
  dateModifier: string;
  isDrink: string;
  strAlcoholic: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkAlternate: string;
  strDrinkThumb: string;
  strGlass: string;
  strIBA: string;
  strImageAttribution: string;
  strImageSource: string;
  strTags: string;
  strVideo: string;
}
