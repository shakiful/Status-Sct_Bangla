import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamStatusRoutingModule } from './team-status-routing.module';
import { TeamStatusComponent } from './team-status.component';
import { CustomPipeModule } from 'src/app/custom-pipes/custom.pipe.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TeamStatusComponent],
  imports: [
    RouterModule,
    TeamStatusRoutingModule,
    CustomPipeModule,
    CommonModule,
  ],
})
export class TeamStatusModule {}
