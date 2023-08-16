import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from './status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  fetchStatus(): Observable<Status> {
    const apiUrl = `${environment.apiUrl}/task_time_data_service.php?service=get_all_user_status`;

    return this.http.get<Status>(`${apiUrl}`);
  }
}
