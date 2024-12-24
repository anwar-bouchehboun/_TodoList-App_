import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError, map } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly STORAGE_KEY = 'tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    this.tasksSubject.next(this.tasks);
  }

  getAllTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTaskById(id: number): Observable<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      const taskCopy = {
        ...task,
        dueDate:
          task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate),
      };
      return of(taskCopy);
    }
    return throwError(() => new Error('Tâche non trouvée'));
  }

  createTask(task: Task): Observable<Task> {
    const newTask = {
      ...task,
      id: Date.now(),
      status: task.status || 'not_started',
    };

    this.tasks.push(newTask);
    this.saveToLocalStorage();
    this.tasksSubject.next(this.tasks);
    return of(newTask);
  }

  updateTask(id: number, task: Task): Observable<void> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks[index] = {
        ...task,
        id: id,
      };
      this.saveToLocalStorage();
      this.tasksSubject.next([...this.tasks]);
      return of(void 0);
    }
    return throwError(() => new Error('Tâche non trouvée'));
  }

  deleteTask(id: number): Observable<void> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveToLocalStorage();
      this.tasksSubject.next(this.tasks);
      return of(void 0);
    }
    return throwError(() => new Error('Tâche non trouvée'));
  }

  searchTasks(searchTerm: string): Observable<Task[]> {
    return this.getAllTasks().pipe(
      map((allTasks: Task[]) => {
        console.log('Toutes les tâches:', allTasks);
        return allTasks.filter((task: Task) =>
          task.description?.includes(searchTerm) || task.title.includes(searchTerm)
        );
      })
    );
  }

  /*
  getTasksByStatus(status: string): Observable<Task[]> {
    const filteredTasks = this.tasks.filter((task) => task.status === status);
    return of(filteredTasks);
  }

  getTasksByPriority(priority: string): Observable<Task[]> {
    const filteredTasks = this.tasks.filter(
      (task) => task.priority === priority
    );
    return of(filteredTasks);
  }

  getTasksByCategory(categoryId: number): Observable<Task[]> {
    const filteredTasks = this.tasks.filter(
      (task) => task.categoryId === categoryId
    );
    return of(filteredTasks);
  }
  */
}
