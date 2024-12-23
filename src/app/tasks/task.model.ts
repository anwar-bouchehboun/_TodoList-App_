export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed';
  categoryId: number;
}

