import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-statistics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule],
  template: `
    <div class="stats-container">
      <mat-card class="stat-card completed">
        <mat-card-header>
          <mat-icon>check_circle</mat-icon>
          <mat-card-title>Tâches accomplies</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-numbers">
            <span class="big-number">{{ completedTasks }}</span>
            <span class="total"
              >sur {{ totalTasks }} ({{ completedPercentage }}%)</span
            >
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="completedPercentage"
          ></mat-progress-bar>
        </mat-card-content>
      </mat-card>

      <mat-card class="stat-card pending">
        <mat-card-header>
          <mat-icon>pending</mat-icon>
          <mat-card-title>Tâches non accomplies</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-numbers">
            <span class="big-number">{{ pendingTasks }}</span>
            <span class="total"
              >sur {{ totalTasks }} ({{ pendingPercentage }}%)</span
            >
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="pendingPercentage"
          ></mat-progress-bar>
        </mat-card-content>
      </mat-card>

      <mat-card class="stat-card overdue">
        <mat-card-header>
          <mat-icon>warning</mat-icon>
          <mat-card-title>Tâches en retard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="stat-numbers">
            <span class="big-number">{{ overdueTasksCount }}</span>
            <span class="total">tâches</span>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .stats-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
      }

      .stat-card {
        padding: 16px;
      }

      .stat-card mat-card-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .stat-card mat-icon {
        margin-right: 8px;
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .completed mat-icon {
        color: #4caf50;
      }

      .pending mat-icon {
        color: #2196f3;
      }

      .overdue mat-icon {
        color: #f44336;
      }

      .stat-numbers {
        display: flex;
        align-items: baseline;
        margin-bottom: 12px;
      }

      .big-number {
        font-size: 32px;
        font-weight: bold;
        margin-right: 8px;
      }

      .total {
        color: rgba(0, 0, 0, 0.6);
      }

      mat-progress-bar {
        height: 8px;
        border-radius: 4px;
      }

      .completed mat-progress-bar ::ng-deep .mdc-linear-progress__bar-inner {
        border-color: #4caf50;
      }

      .pending mat-progress-bar ::ng-deep .mdc-linear-progress__bar-inner {
        border-color: #2196f3;
      }
    `,
  ],
})
export class TaskStatisticsComponent implements OnInit {
  completedTasks: number = 0;
  pendingTasks: number = 0;
  totalTasks: number = 0;
  completedPercentage: number = 0;
  pendingPercentage: number = 0;
  overdueTasksCount: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.calculateStatistics();
  }

  private calculateStatistics() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.totalTasks = tasks.length;
      if (this.totalTasks === 0) return;

      this.completedTasks = tasks.filter(
        (task) => task.status === 'completed'
      ).length;
      this.pendingTasks = this.totalTasks - this.completedTasks;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.overdueTasksCount = tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate < today && task.status !== 'completed';
      }).length;

      this.completedPercentage = Math.round(
        (this.completedTasks / this.totalTasks) * 100
      );
      this.pendingPercentage = Math.round(
        (this.pendingTasks / this.totalTasks) * 100
      );
    });
  }
}
