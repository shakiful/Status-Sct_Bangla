import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { Status } from './status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  constructor(private statusService: StatusService) {}

  public status: Status[] = [];
  public currentTime: string = '';

  ngOnInit(): void {
    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchStatusAndUpdate();
  }

  private fetchStatusAndUpdate(): void {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        this.status = response.map((data: any) => ({
          user_name: data.user_name,
          status: data.status,
          total_time: data.total_time,
          task_id: data.task_id,
          team: data.team,
        }));
        console.log(this.status);
      },
      error: () => {},
    });
  }
}
