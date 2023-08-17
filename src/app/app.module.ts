import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ShortenPipe } from './custom-pipes/shorten.pipe';
import { StatusDeactivatePipe } from './custom-pipes/status-deactivate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ShortenPipe,
    StatusDeactivatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
