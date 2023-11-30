import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { TeamStatusComponent } from './status/team-status/team-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/user_status', pathMatch: 'full' },
  {
    path: 'user_status',
    loadChildren: () =>
      import('./status/status.module').then((m) => m.StatusModule),
  },
  {
    path: 'user_status/details/:id',
    loadChildren: () =>
      import('./status/team-status/team-status.module').then(
        (m) => m.TeamStatusModule
      ),
  },
  { path: '**', redirectTo: '/user_status' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
