import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryFormComponent } from '../category-form/category-form/category-form.component';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'liste', component: CategoryListComponent },
      { path: 'new', component: CategoryFormComponent },
      { path: 'edit/:id', component: CategoryFormComponent },
    ]),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
})
export class CategoriesModule {}
