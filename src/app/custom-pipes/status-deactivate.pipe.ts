import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status_deactivate',
})
export class StatusDeactivatePipe implements PipeTransform {
  transform(status: string, task_id: string) {
    console.log(status);
    if (task_id == null && status == 'No Task') {
      console.log(status);

      return (status = 'Deactivate');
    }
    return status;
  }
}
