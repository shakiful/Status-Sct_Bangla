import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.model';
import { LeaveStatus } from '../models/leaveStatus.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  fetchStatus(): Observable<Status> {
    const apiUrl = `${environment.statusApiUrl}/task_time_data_service.php?service=get_all_user_status_angular`;

    return this.http.get<Status>(`${apiUrl}`);
  }

  fetchLeaveStatusData(date: string): Observable<LeaveStatus> {
    const apiUrl = `${environment.leaveStatusApiUrl}/employee?start_date=${date}&end_date=${date}&user_id=`;

    return this.http.get<LeaveStatus>(`${apiUrl}`);
  }

  fetchModalData(id: number): Observable<LeaveStatus> {
    const apiUrl = `${environment.statusApiUrl}/task_time_data_service.php?service=get_user_today_activity&user_id=${id}`;

    return this.http.get<LeaveStatus>(`${apiUrl}`);
  }
}
