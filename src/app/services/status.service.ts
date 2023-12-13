import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.model';
import { StatusEnum } from '../shared/statusEnum';

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

    // Iterate through the status array
    status.forEach((item: Status) => {
      const task_id = item.task_id;
      const status = item.status;
      const isActive =
        Object.values(StatusEnum).includes(status as StatusEnum) &&
        task_id != '10891';

      if (isActive) {
        active++;
        console.log(active);
      } else if (task_id === '10891') {
        noTask++;
      } else {
        deActivated++;
      }
    });
    return {
      active,
      noTask,
      deActivated,
    };
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item for the body of that component.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns An object containing CSS class names corresponding to different background colors given if they meet the  condition.
   *
   *
   */
  darkBackgroundColors(item: Status) {
    const status = item.status;
    const task_id = item.task_id;

    return {
      'dark-green-background': Object.values(StatusEnum).includes(
        status as StatusEnum
      ),
      'dark-grey-background': status === 'No Task',
      'dark-red-background': task_id === '10891',
      'dark-blue-background': status === 'Meeting',
    };
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */

  backgroundColors(item: Status) {
    return {
      'grey-background': item.status === 'No Task',
      'red-background': item.task_id === '10891',
      'blue-background': item.status === 'Meeting',
    };
  }

  /**
   *Determines the background color classes based on the status and task ID of a given item for Task Name.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */

  taskNameStyleCondition(item: Status) {
    return {
      'red-background': item.task_id === '10891',
      'blue-background': item.status === 'Meeting',
      'green-background':
        item.status === 'Programming' || 'Testing' || 'Designing (UI/UX)',
    };
  }
}
