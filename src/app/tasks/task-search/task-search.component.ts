import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css'],
})
export class TaskSearchComponent {
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');

  ngOnInit() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks$ = of(tasks);
      console.log('Tableau des tâches:', this.tasks$);
    });
  }

  constructor(private taskService: TaskService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.onSearch(value ?? '');
      });
  }

  onSearch(searchTerm: string) {
    this.taskService.searchTasks(searchTerm).subscribe((filteredTasks) => {
      console.log('Tâches filtrées:', filteredTasks);
      this.tasks$ = of(filteredTasks);
      this.search.emit(searchTerm);
    });
  }

  private getAllTasks(): Task[] {
    // Remplacez ceci par votre logique pour obtenir toutes les tâches
    return []; // Exemple vide, remplacez par votre logique réelle
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in_progress':
        return 'status-in-progress';
      case 'not_started':
        return 'status-pending';
      default:
        return '';
    }
  }
}
