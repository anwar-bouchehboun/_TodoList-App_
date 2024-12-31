import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { TaskFilterPipe } from '../task-filter.pipe';
import { BehaviorSubject } from 'rxjs';
import { TaskSearchComponent } from '../task-search/task-search.component';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    TaskFilterPipe,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$ = new BehaviorSubject<Task[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories$.next(categories);
    });
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks$.next(tasks);
    });
  }

  deleteTask(id: number | undefined) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe(() => {
        const currentTasks = this.tasks$.value;
        const updatedTasks = currentTasks.filter((task) => task.id !== id);
        this.tasks$.next(updatedTasks);
      });
    }
  }

  updateTaskStatus(
    task: Task,
    newStatus: 'not_started' | 'in_progress' | 'completed'
  ) {
    if (task.id) {
      const updatedTask: Task = {
        ...task,
        status: newStatus,
        id: task.id,
      };

      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
        },
      });
    }
  }

  isDatePassed(dueDate: string | undefined): boolean {
    if (!dueDate) return false;
    const today = new Date();
    const taskDate = new Date(dueDate);
    return taskDate < today;
  }

  getDateColor(dueDate: string | undefined): string {
    return this.isDatePassed(dueDate) ? 'red' : 'inherit';
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return 'Sans catégorie';
    const category = this.categories$.value.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.name : 'Sans catégorie';
  }
}
