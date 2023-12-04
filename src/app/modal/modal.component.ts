import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  user_name: string | null = null;
  status: string | null = null;
  total_time: string | null = null;
  task_id: string | null = null;
  task_name: string | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

}
