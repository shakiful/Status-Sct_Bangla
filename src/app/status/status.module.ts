import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';
import { CustomPipeModule } from '../custom-pipes/custom.pipe.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StatusComponent],
  imports: [
    RouterModule,
    StatusRoutingModule,
    CustomPipeModule,
    CommonModule,
    FormsModule,
  ],
})
export class StatusModule {}
