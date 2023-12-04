import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamStatusRoutingModule } from './team-status-routing.module';
import { TeamStatusComponent } from './team-status.component';
import { CustomPipeModule } from 'src/app/custom-pipes/custom.pipe.module';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [TeamStatusComponent, ModalComponent],
  imports: [
    RouterModule,
    TeamStatusRoutingModule,
    CustomPipeModule,
    CommonModule,
  ],
  providers: [MdbModalService],
})
export class TeamStatusModule {}
