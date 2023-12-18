import { map } from 'rxjs';
import { Status } from '../../models/status.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { HelperFunction } from 'src/app/shared/classes/helperFunction';
import { UserActivity } from 'src/app/models/userActivity.model';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.scss'],
})
export class TeamStatusComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  id: string | null = null;
  validIDs: number[] | null = null;
  public leaveStatus = [];
  public status: Status[];
  public userActivityData: UserActivity[];
  public total = 0;
  public count = { active: 0, noTask: 0, deActivated: 0 };
  public date: string = new Date().toISOString().split('T')[0];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService,
    private helperFunction: HelperFunction,
    private modalService: MdbModalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.handleMultipleIDs(this.id); //for handling multiple ids
    });

    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchLeaveStatus(this.date);
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchLeaveStatus(this.date);
    this.fetchStatusAndUpdate();
  }

  /**
   * Handles multiple ids or single id
   *
   * @param ids id or ids value given in the url
   */
  handleMultipleIDs(ids: string) {
    if (ids) {
      this.validIDs = ids.split(',').map(Number); // splitting ids and converting into number
      // Filters invalidIds
      const invalidIDs = this.validIDs.filter(
        (id) => id <= 0 || id >= 5 || Number.isNaN(id)
      );
      // Handling if invalid Id is given
      if (invalidIDs.length > 0) {
        this.router.navigate(['user_status/details', 1]); // Navigate with the default ID
      }
    }
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

  /**
   * Gets the allocated team number
   * @param teamName team name value
   * @returns team names allocated number
   */
  getTeamNumber(teamName: string): number {
    switch (teamName) {
      case 'ShopFloor':
        return 1;
      case 'SAP':
        return 2;
      case 'UI/UX Design':
        return 3;
      case 'SQA':
        return 4;
      default:
        return 0;
    }
  }

  /**
   * Fetches status from status Service and also updates it,
   */
  private fetchStatusAndUpdate() {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        this.status = response
          .filter((data) => {
            const teamId = this.getTeamNumber(data.area);
            return this.validIDs.includes(teamId);
          })
          .map((data) => {
            const statusObj = new Status().deserialize(data);
            if (!data.task_id) {
              if (this.leaveStatus.includes(data.user_id)) {
                statusObj.status = 'On Leave';
              }
            }
            return statusObj;
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

  /**
   * For opening the modal
   * @param data data contains the array of Status Object
   */
  openModal(item: Status) {
    let config = {
      animation: true,
      backdrop: true,
      data: {},
      ignoreBackdropClick: false,
      keyboard: true,
    };
    this.statusService.fetchModalData(item.user_id).subscribe({
      next: (response: any) => {
        this.userActivityData = [];
        this.userActivityData = response.map((value: UserActivity) =>
          //Deserializes the response data
          new UserActivity().deserialize(value)
        );
        let data = this.userActivityData;
        config.data = { data };
        this.modalRef = this.modalService.open(ModalComponent, config);
      },
    });
  }
}
