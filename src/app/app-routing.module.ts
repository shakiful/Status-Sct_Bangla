import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: StatusComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./status/team-status/team-status.module').then(
        (m) => m.TeamStatusModule
      ),
  },
  { path: '**', redirectTo: '' },
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
