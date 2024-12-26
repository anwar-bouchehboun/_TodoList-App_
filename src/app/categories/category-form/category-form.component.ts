import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;
  categoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  //init form and check if we are in edit mode
  ngOnInit(): void {
    this.createForm();
    this.checkEditMode();
  }

  //create form
  private createForm(): void {
    this.categoryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  //check if we are in edit mode
  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.categoryId = +id;
      this.categoryService.getCategory(+id).subscribe((category) => {
        if (category) {
          this.categoryForm.patchValue(category);
        }
      });
    }
  }

  //submit button create or update category
  onSubmit(): void {
    if (this.categoryForm.valid) {
      try {
        if (this.isEditMode && this.categoryId) {
          this.categoryService.updateCategory({
            ...this.categoryForm.value,
            id: this.categoryId,
          });
        } else {
          this.categoryService.addCategory(this.categoryForm.value);
        }
        this.router.navigate(['/categories']);
      } catch (error) {
        console.error('Error saving category:', error);
      }
    }
  }

  //cancel button
  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
