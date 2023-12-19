import { StatusService } from './../services/status.service';
import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status.model';
import { Router } from '@angular/router';
import { HelperFunction } from '../shared/classes/helperFunction';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  constructor(
    private statusService: StatusService,
    public router: Router,
    private helperFunction: HelperFunction
  ) {}

  public status: Status[];
  public leaveStatus: number[] = [];
  public total = 0;
  public count = { active: 0, noTask: 0, onLeave: 0, deActivated: 0 };
  public id = false;
  public date: string = new Date().toISOString().split('T')[0];

  ngOnInit() {
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
  getDarkBackgroundColors(item: Status) {
    return this.helperFunction.getDarkBackgroundColors(item);
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item.
   *
   * @param item - The item is the properties of Status Object.
   * @returns CSS Class names if the condition is met from status Service
   */
  getBackgroundColors(item: Status) {
    return this.helperFunction.getBackgroundColors(item);
  }

  /**
   *Determines the background color classes based on the status and task ID of a given item for Task Name.
   *
   * @param item - The item is the properties of Status Object.
   * @returns CSS Class names if the condition is met from status Service
   */
  getTaskNameStyleCondition(item: Status) {
    return this.helperFunction.getTaskNameStyleCondition(item);
  }

  getClassOnCondition(item: Status, type) {
    // return type ? dar
  }

  /**
   * Fetches status from status Service and also updates it,
   */
  private fetchStatusAndUpdate() {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        this.status = response.map((machine) => {
          if (!machine.task_id) {
            if (this.leaveStatus.includes(machine.user_id))
              machine.status = 'On Leave';
          }
          return new Status().deserialize(machine);
        });
        // Update counts after receiving new data
        this.count = this.helperFunction.updateStatusCount(this.status);
        this.total = this.status.length;
      },
    });
  }
  private fetchLeaveStatus(date: string) {
    this.statusService.fetchLeaveStatusData(date).subscribe({
      next: (response: any) => {
        this.leaveStatus = response.leaves.map((value) => value.emp_id);
      },
    });
  }
}
