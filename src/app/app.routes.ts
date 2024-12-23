import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
  },
  { path: '', redirectTo: '/tasks/list', pathMatch: 'full' },
];
