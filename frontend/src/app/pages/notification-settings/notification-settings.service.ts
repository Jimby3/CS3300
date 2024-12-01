import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationSettingsService {

  private apiUrl = 'https://76.155.212.102:3000/api/notification-settings';

  constructor(private http: HttpClient) {}

  updateNotificationSettings(settings: { userId: string; daysBefore: number; enabled: boolean; method: string; times: any[] }): Observable<any> {
    return this.http.post(this.apiUrl, settings, { responseType: 'text' });
  }

  getNotificationSettings(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
