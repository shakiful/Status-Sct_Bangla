import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UserActivity } from '../models/userActivity.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  data: any;
  constructor(public modalRef: MdbModalRef<ModalComponent>) {}
  ngOnInit(): void {
    console.log(this.modalRef);

    this.data = this.modalRef.component;
    console.log(this.data);
  }
}
