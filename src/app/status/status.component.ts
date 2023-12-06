import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';
import { Status } from './status.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  constructor(private statusService: StatusService, public router: Router) {}

  public status: Status[] = [];
  public currentTime: string = '';
  public total = 0;
  public active = 0;
  public noTask = 0;
  public deActivated = 0;
  public id = false;

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
          task_name: data.task_name,
          team: data.team,
        }));
        // Update counts after receiving new data
        this.updateStatusCount();
        this.total = this.status.length; // Update total count here if needed
        console.log(this.status);
      },
      error: () => {},
    });
  }
  updateStatusCount() {
    // Reset counts
    this.total = 0;
    this.active = 0;
    this.noTask = 0;
    this.deActivated = 0;

    // Iterate through the status array
    this.status.forEach((item) => {
      if (
        item.status === 'Programming' ||
        (item.status === 'Testing' && !(item.task_id === '10891')) ||
        item.status === 'Designing (UI/UX)' ||
        item.status === 'Meeting' ||
        item.status === 'Debugging' ||
        item.status === 'Management' ||
        item.status === 'Documentation' ||
        (item.status === 'Analysis' && !(item.task_id === '10891'))
      ) {
        console.log(this.active);

        this.active++;
        console.log(this.active);
      } else if (item.task_id === '10891') {
        this.noTask++;
      } else if (item.status === 'No Task') {
        this.deActivated++;
      }
    });
    console.log(this.active);
  }
}
