import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  public active: number;
  public noTask: number;
  public deActivated: number;

  fetchStatus(): Observable<Status> {
    const apiUrl = `${environment.apiUrl}/task_time_data_service.php?service=get_all_user_status_angular`;

    return this.http.get<Status>(`${apiUrl}`);
  }

  updateStatusCount(status: Status[]) {
    // Reset counts
    this.active = 0;
    this.noTask = 0;
    this.deActivated = 0;

    // Iterate through the status array
    status.forEach((item: Status) => {
      const task_id = item.task_id;
      const Status = item.status;
      const isActive =
        Status === 'Programming' ||
        (Status === 'Testing' && !(task_id === '10891')) ||
        Status === 'Designing (UI/UX)' ||
        Status === 'Meeting' ||
        Status === 'Debugging' ||
        Status === 'Management' ||
        Status === 'Documentation' ||
        (Status === 'Analysis' && !(task_id === '10891'));

      if (isActive) {
        this.active++;
      } else if (task_id === '10891') {
        this.noTask++;
      } else if (Status === 'No Task') {
        this.deActivated++;
      }
    });
    return {
      active: this.active,
      noTask: this.noTask,
      deActivated: this.deActivated,
    };
  }
}
