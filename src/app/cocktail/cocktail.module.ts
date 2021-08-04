import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { CocktailRoutingModule } from './cocktail-routing.module';
import { CocktailComponent } from './cocktail.component';
import { IngredientPipe } from './ingredient.pipe';

@NgModule({
  declarations: [CocktailComponent, IngredientPipe],
  imports: [
    CommonModule,
    CocktailRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class CocktailModule {}
