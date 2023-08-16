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
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        this.status = response.map((data: any) => ({
          user_id: data.user_id,
          status: data.status,
          updated_at: data.updated_at,
          task_id: data.task_id,
        }));
        console.log(this.status);
      },
      error: () => {},
    });
  }
}
