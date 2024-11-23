import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationSettingsService {
  private apiUrl = '/api/notification-settings';

  constructor(private http: HttpClient) {}

  updateNotificationSettings(settings: { daysBefore: number; enabled: boolean }): Observable<any> {
    return this.http.put<any>(this.apiUrl, settings);
  }

  getNotificationSettings(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
