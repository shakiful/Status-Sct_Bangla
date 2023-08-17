import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status_deactivate',
})
export class StatusDeactivatePipe implements PipeTransform {
  transform(value: any) {
    if (value == "No Task") {
      return value = "Deactivate";
    }
    return value;
  }
}
