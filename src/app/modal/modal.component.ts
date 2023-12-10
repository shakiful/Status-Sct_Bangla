import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Status } from '../models/status.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  data: Status[] | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
}
