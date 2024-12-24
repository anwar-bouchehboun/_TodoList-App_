import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [];
  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    const storedCategories = localStorage.getItem('categories');

    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    } else {
      this.categories = [
        { id: 1, name: 'Catégorie Test 1' },
        { id: 2, name: 'Catégorie Test 2' },
      ];
      this.saveCategories();
    }

    this.categoriesSubject.next(this.categories);
  }

  private saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.categoriesSubject.next(this.categories);

  }

  getCategories(): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  getCategory(id: number): Observable<Category | undefined> {
    return this.categoriesSubject.pipe(
      map((categories) => categories.find((category) => category.id === id))
    );
  }

  addCategory(category: Category) {
    category.id = this.generateId();
    if (this.isCategoryNameUnique(category.name)) {
      this.categories.push(category);
      this.saveCategories();
    } else {
      alert('Category name must be unique');
    }
  }

  updateCategory(updatedCategory: Category) {
    const index = this.categories.findIndex(
      (category) => category.id === updatedCategory.id
    );
    if (
      index !== -1 &&
      this.isCategoryNameUnique(updatedCategory.name, updatedCategory.id)
    ) {
      this.categories[index] = updatedCategory;
      this.saveCategories();
    } else {
      alert('Category name must be unique');
    }
  }

  deleteCategory(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.saveCategories();
    }
  }

  private generateId(): number {
    return this.categories.length > 0
      ? Math.max(...this.categories.map((category) => category.id ?? 0)) + 1
      : 1;
  }

  private isCategoryNameUnique(name: string, id?: number): boolean {
    return !this.categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() && category.id !== id
    );
  }
}
