import {Component, OnInit} from '@angular/core';
import { Class } from './class.model';
import { ClassesService } from './classes.service';
import { TasksService } from '../tasks/tasks.service';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import { Task } from '../tasks/task.model';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../components/auth.service";
import {color} from "chart.js/helpers";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    NgStyle
  ],
  styleUrls: ['./classes.component.css'],
  standalone: true,
  providers: [TasksService]
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  selectedClass: Class | null = null;
  tasks: Task[] = [];
  showAddClassForm: boolean = false;
  newClassName: string = '';
  editMode: boolean = false;
  newClassColor: string = '';

  constructor(private classesService: ClassesService, private tasksService: TasksService) {}

  ngOnInit(): void {
    this.classesService.getClasses().subscribe(
      (data: Class[]) => {
        this.classes = data;
      },
      (error) => {
        if (error.status === 401) {
          alert('You are not authorized. Please log in again.');
          console.error('Unauthorized access:', error);
        } else {
          alert('Failed to fetch classes. Please try again later.');
          console.error('Error fetching classes:', error);
        }
      }
    );
  }

  selectClass(classId: number): void {
    if (this.selectedClass && this.selectedClass.id === classId) {
      this.selectedClass = null; // Unselect if the same task is clicked
    }
    else {
      this.selectedClass = this.classes.find(c => c.id === classId) || null;
      this.editMode = false;
      this.tasksService.getTasksByClassId(classId).subscribe(
        (data: Task[]) => {
          this.tasks = data;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  }

  toggleAddClassForm(): void {
    this.showAddClassForm = !this.showAddClassForm;
  }

  addClass(): void {
    if (this.newClassName.trim()) {
      const userId = AuthService.getUserId();
      if (!userId) {
        alert('User ID is missing. Please log in again.');
        return;
      }
      const newClass: Class = { id: 0, name: this.newClassName, ownerId: userId, color: this.newClassColor };
      this.classesService.addClass(newClass).subscribe({
        next: (data: Class) => {
          this.classes.push(data);
          this.newClassName = '';
          this.newClassColor = '';
          this.showAddClassForm = false;
        },
        error: (error) => {
          if (error.status === 401) {
            alert('You are not authorized. Please log in.');
          } else if (error.status === 403) {
            alert('You do not have permission to perform this action.');
          } else {
            alert('An error occurred while adding the class.');
          }
          console.error('Error adding class:', error);
        }
      });
    }
  }

  enableEditMode(isEditMode: boolean = true): void {
    this.editMode = isEditMode;
  }

  updateClass(): void {
    if (this.selectedClass) {
      this.classesService.updateClass(this.selectedClass).subscribe(
        (updatedClass: Class) => {
          const index = this.classes.findIndex(c => c.id === updatedClass.id);
          if (index !== -1) {
            this.classes[index] = updatedClass;
          }
          this.editMode = false;
        },
        (error) => {
          console.error('Error updating class:', error);
        }
      );
    }
  }

  deleteClass(classId: number): void {
    this.classesService.deleteClass(classId).subscribe(
      () => {
        this.classes = this.classes.filter(c => c.id !== classId);
        this.selectedClass = null;
      },
      (error) => {
        console.error('Error deleting class:', error);
      }
    );
  }

  protected readonly color = color;
}
