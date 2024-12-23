import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  Cat = 'Catégorie';

  categories$: Observable<Category[]> = this.categoryService.getCategories();



  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
   /* this.categories$.subscribe(
      categories => console.log('Categories received:', categories),
      error => console.error('Error:', error)
    );*/
  }

  deleteCategory(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
    this.categoryService.deleteCategory(id);
    }
  }
}
