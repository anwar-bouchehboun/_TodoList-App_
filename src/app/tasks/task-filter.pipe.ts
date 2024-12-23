import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'taskFilter',
  standalone: true,
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[] | null, status: string): Task[] {
    return tasks ? tasks.filter((task) => task.status === status) : [];
  }
}
