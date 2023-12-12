import { StatusService } from './../services/status.service';
import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status.model';
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
  public count = { active: 0, noTask: 0, deActivated: 0 };
  public id = false;

  ngOnInit(): void {
    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchStatusAndUpdate();
  }

  /**
   * fetches status from status Service and also updates it,
   *
   */
  private fetchStatusAndUpdate(): void {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        this.status = response.map((value: Status) =>
          //deserializes the response data
          new Status().deserialize(value)
        );
        // Update counts after receiving new data
        this.count = this.statusService.updateStatusCount(this.status);
        this.total = this.status.length;
      },
    });
  }
}
