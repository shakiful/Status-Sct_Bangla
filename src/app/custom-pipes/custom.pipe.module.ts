// shared.module.ts
import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import { StatusDeactivatePipe } from './status-deactivate.pipe';

@NgModule({
  declarations: [ShortenPipe, StatusDeactivatePipe,],
  exports: [ShortenPipe, StatusDeactivatePipe],
})
export class CustomPipeModule {}
