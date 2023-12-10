import { Status } from '../../models/status.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../../services/status.service';
import { ModalComponent } from 'src/app/modal/modal.component';
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
  public status: Status[];
  public total;
  public count;

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

  handleMultipleIDs(ids: string): void {
    if (ids) {
      this.validIDs = ids.split(',').map(Number);
      const ifValidId = this.validIDs.map((id) => {
        if (id <= 0 || id >= 5 || Number.isNaN(id)) {
          this.router.navigate(['user_status/details', 1]);
        }
      });
      if (ifValidId) {
      }
    } else {
      this.router.navigate(['user_status/details', 1]); // Redirect to default value if no IDs are provided
    }
  }

  darkBackgroundColors(item: Status) {
    const status = item.status;
    const task_id = item.task_id;

    return {
      'dark-green-background': [
        'Programming',
        'Testing',
        'Designing (UI/UX)',
        'Analysis',
        'Management',
        'Debugging',
        'Documentation',
      ].includes(status),
      'dark-grey-background': status === 'No Task',
      'dark-red-background': task_id === '10891',
      'dark-blue-background': status === 'Meeting',
    };
  }

  backgroundColors(item: Status) {
    return {
      'grey-background': item.status === 'No Task',
      'red-background': item.task_id === '10891',
      'blue-background': item.status === 'Meeting',
    };
  }

  taskNameStyleCondition(item: Status) {
    return {
      'red-background': item.task_id === '10891',
      'blue-background': item.status === 'Meeting',
      'green-background':
        item.status === 'Programming' || 'Testing' || 'Designing (UI/UX)',
    };
  }

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

  private fetchStatusAndUpdate(): void {
    this.statusService.fetchStatus().subscribe({
      next: (response: any) => {
        const filteredResponse = response.filter((data: any) => {
          const teamId = this.getTeamNumber(data.area);
          return this.validIDs.includes(teamId); // Filter data based on the provided ID
        });

        this.status = filteredResponse.map((value: any) =>
          new Status().deserialize(value)
        );
        // Update counts after receiving new data
        this.count = this.statusService.updateStatusCount(this.status);
        this.total = this.status.length;
      },
    });
  }

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
