import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';
import { CustomPipeModule } from '../custom-pipes/custom.pipe.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [StatusComponent],
  imports: [
    RouterModule,
    StatusRoutingModule,
    CustomPipeModule,
    CommonModule,
  ],
})
export class StatusModule {}
