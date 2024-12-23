import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];
