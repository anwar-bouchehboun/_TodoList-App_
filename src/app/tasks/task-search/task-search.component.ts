import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../categories/category.model';

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
  categories$ = new BehaviorSubject<Category[]>([]);
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
  }

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
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

  private loadCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories$.next(categories);
    });
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId) return 'Sans catégorie';
    const category = this.categories$.value.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.name : 'Sans catégorie';
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

  private loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks$ = of(tasks);
    });
  }
}
