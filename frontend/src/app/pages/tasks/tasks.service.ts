import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'https://76.155.212.102:3000/api/tasks';
  private classesUrl = 'https://76.155.212.102:3000/api/classes';

  constructor(private http: HttpClient) {}

  getTasksByClassId(classId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/class/${classId}`);
  }

  getTasksByUserId(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/owner/${userId}`);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, newTask);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${updatedTask.id}`, updatedTask);
  }


}
