import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { TaskListComponent } from './task-list/task-list.component';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { TaskSearchComponent } from './task-search/task-search.component';

const routes: Routes = [
  { path: 'list', component: TaskListComponent },
  { path: 'newTask', component: TasksFormComponent },
  { path: 'edit/:id', component: TasksFormComponent },
  { path: 'search', component: TaskSearchComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
  ],
})
export class TasksModule {}
