import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Cocktail } from './cocktail';
import { CocktailService } from './cocktail.service';

type ListItem = Pick<Cocktail, 'strCategory' | 'strDrink' | 'strDrinkThumb'>;

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailsComponent {
  categories$ = this.cocktailService.getCategories();
  searchForm = new FormGroup({
    category: new FormControl(),
    name: new FormControl(),
  });
  cocktails$: Observable<ListItem[]> = this.route.queryParams.pipe(
    switchMap(({ category, name }) =>
      category && name
        ? forkJoin({
            name: this.cocktailService.getCocktailsByName(name),
            category: this.getCocktailsByCategory(category),
          }).pipe(map(this.combineNameAndCategoryResults))
        : category
        ? this.getCocktailsByCategory(category)
        : name
        ? this.cocktailService.getCocktailsByName(name)
        : this.cocktailService.getCocktails()
    )
  );

  constructor(
    private readonly cocktailService: CocktailService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  onSearch(): void {
    this.router.navigate(['.'], { queryParams: this.searchForm.value });
  }

  private combineNameAndCategoryResults({
    name,
    category,
  }: {
    name: Cocktail[];
    category: ListItem[];
  }): ListItem[] {
    return name.filter((n) => category.some((c) => c.strDrink === n.strDrink));
  }

  private getCocktailsByCategory(category: string): Observable<ListItem[]> {
    return this.cocktailService
      .getCocktailsByCategory(category)
      .pipe(
        map((results) =>
          results.map((result) => ({ ...result, strCategory: category }))
        )
      );
  }
}
