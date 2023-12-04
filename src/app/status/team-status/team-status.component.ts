import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../status.model';
import { StatusService } from '../status.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.scss'],
})
export class TeamStatusComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;

  id: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.navigateToDetails(this.id);
      console.log(this.id);
    });

    // Initial call to fetchStatus
    setInterval(() => {
      this.fetchStatusAndUpdate();
    }, 200000);
    this.fetchStatusAndUpdate();
  }

  navigateToDetails(id: number | null): void {
    if (id && id >= 1 && id <= 4) {
      this.router.navigate(['user_status/details', id]);
    } else {
      this.router.navigate(['user_status/details', 1]); // Redirect to default value if id is null or outside the range
    }
  }

  public status: Status[] = [];
  public currentTime: string = '';
  public total = 0;
  public active = 0;
  public noTask = 0;
  public deActivated = 0;

  darkBackgroundColors(item: Status) {
    return {
      'dark-green-background':
        item.status === 'Programming' ||
        item.status === 'Testing' ||
        item.status === 'Designing (UI/UX)' ||
        item.status === 'Analysis' ||
        item.status === 'Management' ||
        item.status === 'Debugging' ||
        item.status === 'Documentation',
      'dark-grey-background': item.status === 'No Task',
      'dark-red-background': item.task_id === '10891',
      'dark-blue-background': item.status === 'Meeting',
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
          return teamId === this.id; // Filter data based on the provided ID
        });

        this.status = filteredResponse.map((data: any) => ({
          user_name: data.user_name,
          status: data.status,
          total_time: data.total_time,
          task_id: data.task_id,
          task_name: data.task_name,
          team: this.getTeamNumber(data.area),
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
        item.status === 'Analysis'
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
