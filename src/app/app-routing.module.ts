import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { TeamStatusComponent } from './status/team-status/team-status.component';

const routes: Routes = [
  {
    path: 'user_status',
    component: StatusComponent,
    children: [
      {
        path: 'details/:id',
        component: TeamStatusComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/user_status',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/user_status' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
