import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserActivity } from '../models/userActivity.model';
import { Status } from '../models/status.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  data: Status[] | null = null;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
  ngOnInit(): void {
    console.log(this.data);
  }
}
