import { Routes } from '@angular/router';
import { TaskStatisticsComponent } from './tasks/task-statistics/task-statistics.component';

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
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks/statistics',
    component: TaskStatisticsComponent,
  },
];
