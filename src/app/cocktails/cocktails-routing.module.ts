import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CocktailsComponent } from './cocktails.component';

const routes: Routes = [
  {
    path: '',
    component: CocktailsComponent,
  },
  {
    path: ':idDrink',
    loadChildren: () =>
      import('../cocktail/cocktail.module').then((m) => m.CocktailModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailsRoutingModule {}
