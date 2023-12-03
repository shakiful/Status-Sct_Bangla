import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StatusModule } from './status/status.module';
import { TeamStatusModule } from './status/team-status/team-status.module';
import { CustomPipeModule } from './custom-pipes/custom.pipe.module';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [AppComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StatusModule,
    TeamStatusModule,
    CustomPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
