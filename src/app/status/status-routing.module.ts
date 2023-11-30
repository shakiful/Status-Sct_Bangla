import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StatusComponent } from "./status.component";

const route: Routes = [
  { path: '', component: StatusComponent},
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class StatusRoutingModule {}
