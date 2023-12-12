import { Status } from '../../models/status.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { StatusEnum } from 'src/app/shared/statusEnum';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.scss'],
})
export class TeamStatusComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  id: string | null = null;
  validIDs: number[] | null = null;
  public status: Status[];
  public total = 0;
  public count = { active: 0, noTask: 0, deActivated: 0 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.handleMultipleIDs(this.id); //for handling multiple ids
    });

    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchStatusAndUpdate();
  }

  /**
   * handles multiple ids or single id
   *
   * @param ids id or ids value given in the url
   *
   */
  handleMultipleIDs(ids: string): void {
    if (ids) {
      this.validIDs = ids.split(',').map(Number); // splitting ids and converting into number
      // filters invalidIds
      const invalidIDs = this.validIDs.filter(
        (id) => id <= 0 || id >= 5 || Number.isNaN(id)
      );
      // handling if invalid Id is given
      if (invalidIDs.length > 0) {
        this.router.navigate(['user_status/details', 1]); // Navigate with the default ID
      }
    }
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

  /**
   * gets the allocated team number
   *
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
   * fetches status from status Service and also updates it,
   *
   *
   */

  private fetchStatusAndUpdate(): void {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        //filters the response data from api
        //returns Filter data based on the provided ID
        const filteredResponse = response.filter((data: any) => {
          const teamId = this.getTeamNumber(data.area);
          return this.validIDs.includes(teamId); // Filter data based on the provided ID
        });
        //deserializes the filteredResponse data
        this.status = filteredResponse.map((value: Status) =>
          new Status().deserialize(value)
        );
        // Update counts after receiving new data
        this.count = this.statusService.updateStatusCount(this.status);
        this.total = this.status.length;
      },
    });
  }

  /**
   * for opening the modal
   *
   * @param data data contains the array of Status Object
   */
  openModal(data: Status[]) {
    let config = {
      animation: true,
      backdrop: true,
      data: {
        data,
      },
      ignoreBackdropClick: false,
      keyboard: true,
    };

    this.modalRef = this.modalService.open(ModalComponent, config);
  }
}
