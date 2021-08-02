import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CocktailsRoutingModule } from './cocktails-routing.module';

@NgModule({
  imports: [CommonModule, CocktailsRoutingModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatOptionModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class CocktailsModule {
}
