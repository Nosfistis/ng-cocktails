import { Cocktail } from '../cocktails/cocktail';
import { IngredientPipe } from './ingredient.pipe';

describe('IngredientPipe', () => {
  let pipe: IngredientPipe;

  beforeEach(() => (pipe = new IngredientPipe()));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a cocktail ingredient with measure', () => {
    expect(
      pipe.transform(
        { strIngredient1: 'Milk', strMeasure1: '1 cup' } as Cocktail,
        '1'
      )
    ).toEqual('Milk (1 cup)');
  });

  it('should return empty string if the ingredient is falsy', () => {
    expect(
      pipe.transform(
        { strIngredient1: null, strMeasure1: null } as Cocktail,
        '1'
      )
    ).toEqual('');
  });
});
