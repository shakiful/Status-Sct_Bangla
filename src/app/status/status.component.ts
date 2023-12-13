import { LeaveStatus } from './../models/leaveStatus.model';
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

  public status: Status[];
  public leaveStatus: LeaveStatus[];
  public currentTime: string = '';
  public total = 0;
  public count = { active: 0, noTask: 0, deActivated: 0 };
  public id = false;
  public date: string = new Date().toISOString().split('T')[0];

  ngOnInit(): void {
    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchLeaveStatus(this.date);
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchLeaveStatus(this.date);
    this.fetchStatusAndUpdate();
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item for the body of that component.
   *
   * @param item - The item is the properties of Status Object.
   * @returns An object containing CSS class names corresponding to different background colors given if they meet the condition from status Service.
   */
  darkBackgroundColors(item: Status) {
    return this.statusService.darkBackgroundColors(item);
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item.
   *
   * @param item - The item is the properties of Status Object.
   * @returns CSS Class names if the condition is met from status Service
   */

  backgroundColors(item: Status) {
    return this.statusService.backgroundColors(item);
  }

  /**
   *Determines the background color classes based on the status and task ID of a given item for Task Name.
   *
   * @param item - The item is the properties of Status Object.
   * @returns CSS Class names if the condition is met from status Service
   */

  taskNameStyleCondition(item: Status) {
    return this.statusService.taskNameStyleCondition(item);
  }

  /**
   * fetches status from status Service and also updates it,
   *
   */
  private fetchStatusAndUpdate(): void {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        const checkedData = this.statusService.onLeaveCheck(
          response,
          this.leaveStatus
        );

        this.status = checkedData.map((value: Status) =>
          //deserializes the response data
          new Status().deserialize(value)
        );

        // Update counts after receiving new data
        this.count = this.statusService.updateStatusCount(this.status);
        this.total = this.status.length;
      },
    });
  }
  private fetchLeaveStatus(date: string): void {
    this.statusService.fetchLeaveStatusData(date).subscribe({
      next: (response: any) => {
        this.leaveStatus = response.leaves.map((value: LeaveStatus) =>
          //deserializes the response data
          new LeaveStatus().deserialize(value)
        );
      },
    });
  }
}
