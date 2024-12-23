import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CategoryService } from '../../categories/category.service';
import { Task } from '../task.model';
import { Category } from '../../categories/category.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.css',
})
export class TasksFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode: boolean = false;
  taskId!: number;
  categories$: Observable<Category[]> = this.categoryService.getCategories();
  minDate = new Date();
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.checkEditMode();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = { ...this.taskForm.value };
      if (formValue.dueDate) {
        formValue.dueDate = formValue.dueDate
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '-');
      }
      try {
        if (this.isEditMode && this.taskId) {
          this.taskService.updateTask(this.taskId, formValue);
        } else {
          this.taskService.createTask(formValue);
        }
        this.router.navigate(['/tasks/list']);
      } catch (error) {
        alert('Error saving task:');
      }
    }
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.taskService.getTaskById(+id).subscribe({
        next: (task) => {
          if (task) {
            this.taskForm.patchValue({
              title: task.title,
              description: task.description || '',
              dueDate: new Date(task.dueDate),
              categoryId: task.categoryId,
              priority: task.priority,
              status: task.status,
            });
          }
        },
        error: (error) =>
          console.log('Erreur lors du chargement de la tâche:'),
      });
    }
  }
  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      dueDate: ['', [Validators.required]],
      categoryId: [null, Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
}
