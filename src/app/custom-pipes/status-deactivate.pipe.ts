import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status_deactivate',
})
export class StatusDeactivatePipe implements PipeTransform {
  transform(status: string, task_id: string) {
    if (task_id == null && status == 'No Task') {
      return (status = 'Deactivate');
    }
    return status;
  }
}
