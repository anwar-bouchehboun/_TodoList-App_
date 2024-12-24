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
    TaskSearchComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
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
}
