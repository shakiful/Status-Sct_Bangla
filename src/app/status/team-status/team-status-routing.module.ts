import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamStatusComponent } from './team-status.component';

const route: Routes = [{ path: '', component: TeamStatusComponent }];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class TeamStatusRoutingModule {}
