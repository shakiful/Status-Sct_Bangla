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

  fetchStatus(): Observable<Status> {
    const apiUrl = `${environment.apiUrl}/task_time_data_service.php?service=get_all_user_status_angular`;

    return this.http.get<Status>(`${apiUrl}`);
  }

  updateStatusCount(status: Status[]) {
    // Reset counts
    let active: number = 0;
    let noTask: number = 0;
    let deActivated: number = 0;

    console.log(active, noTask, deActivated);

    // Iterate through the status array
    status.forEach((item: Status) => {
      console.log(active, noTask, deActivated);
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

      console.log(active, noTask, deActivated);
      if (isActive) {
        active++;
        console.log(active);
      } else if (task_id === '10891') {
        noTask++;
      } else {
        deActivated++;
      }

      console.log(active, noTask, deActivated);
    });
    return {
      active,
      noTask,
      deActivated,
    };
  }
}
