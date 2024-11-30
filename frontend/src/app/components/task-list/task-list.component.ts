import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../pages/tasks/tasks.service';
import { AuthService } from '../auth.service';
import { Task } from '../../pages/tasks/task.model';
import { ClassesService } from '../../pages/classes/classes.service';
import { Class } from '../../pages/classes/class.model';
import { FormsModule } from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
    NgIf,
  ],
  templateUrl: './task-list.component.html',
  standalone: true,
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  public selectedTask: Task | null = null;
  public editMode: boolean = false;
  public classes: Class[] = [];

  constructor(private tasksService: TasksService, private classesService: ClassesService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadClasses();
  }

  loadTasks(): void {
    const userId = AuthService.getUserId();
    if (userId !== null) {
      this.tasksService.getTasksByUserId(userId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    }
  }

  loadClasses(): void {
    this.classesService.getClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
    });
  }

  selectTask(taskId: number): void {
    this.selectedTask = this.tasks.find(task => task.id === taskId) || null;
  }

  enableEditMode(): void {
    this.editMode = true;
  }

  updateTask(): void {
    if (this.selectedTask) {
      this.tasksService.updateTask(this.selectedTask).subscribe(
        () => {
          this.editMode = false;
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  }

  deleteTask(taskId: number): void {
    this.tasksService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.selectedTask = null;
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
