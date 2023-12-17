import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserActivity } from '../models/userActivity.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  data: UserActivity[] | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}

}
