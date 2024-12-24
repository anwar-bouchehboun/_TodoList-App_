import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CategoryService } from '../../categories/category.service';
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
        const date = new Date(formValue.dueDate);
        date.setHours(12, 0, 0, 0);
        formValue.dueDate = date.toISOString().slice(0, 10);
      }

      try {
        if (this.isEditMode && this.taskId) {
          this.taskService.updateTask(this.taskId, formValue);
        } else {
          console.log(formValue);
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
            const date = new Date(task.dueDate);
            date.setHours(12, 0, 0, 0);

            this.taskForm.patchValue({
              title: task.title,
              description: task.description || '',
              dueDate: date,
              categoryId: task.categoryId,
              priority: task.priority,
              status: task.status,
            });
          }
        },
        error: (error) => console.log('Erreur lors du chargement de la tâche:'),
      });
    }
  }
  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      dueDate: ['', [Validators.required, this.futureDateValidator()]],
      categoryId: [null, Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  private futureDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const selectedDate = new Date(control.value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate >= today ? null : { dateInvalide: true };
    };
  }
}
