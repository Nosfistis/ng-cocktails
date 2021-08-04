import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CocktailComponent } from './cocktail.component';
import { CocktailResolver } from './cocktail.resolver';

const routes: Routes = [
  {
    path: '',
    component: CocktailComponent,
    resolve: {
      cocktail: CocktailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailRoutingModule {}
