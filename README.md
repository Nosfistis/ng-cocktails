# NgCocktails

[![CI through Github Actions](https://github.com/Nosfistis/ng-cocktails/actions/workflows/ci.yml/badge.svg)](https://github.com/Nosfistis/ng-cocktails/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Nosfistis/ng-cocktails/branch/master/graph/badge.svg?token=IMRAK0ZTPJ)](https://codecov.io/gh/Nosfistis/ng-cocktails)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Details

The application loads a cocktails list on the main page. Due to limitations of the [CocktailsDB](https://www.thecocktaildb.com/)
free model, the cocktails list only consists of cocktails starting with A.

The cocktail details screen mentions the cocktail ingredients, measures per ingredient and instructions.

The current theme selection is saved in the local storage by default, although a dark theme is preferred.

## Testing

Tests have been applied to most components and functions, showcasing the suggested test approach for any angular component.
