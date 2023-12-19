import { Status } from '../../models/status.model';
import { StatusEnum } from '../enums/statusEnum';

export class HelperFunction {
  updateStatusCount(status: Status[]) {
    return status.reduce(
      (count, item) => {
        const task_id = item.task_id;
        const statusValue = item.status;

        if (
          Object.values(StatusEnum).includes(statusValue as StatusEnum) &&
          task_id !== '10891'
        ) {
          count.active++;
        } else if (task_id === '10891') {
          count.noTask++;
        } else if (statusValue === 'On Leave') {
          count.onLeave++;
        } else {
          count.deActivated++;
        }
        return count;
      },
      { active: 0, noTask: 0, onLeave: 0, deActivated: 0 }
    );
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item for the body of that component.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns An object containing CSS class names corresponding to different background colors given if they meet the  condition.
   */
  getDarkBackgroundColors(item: Status) {
    const status = item.status;
    const task_id = item.task_id;
    return {
      'dark-green-background': Object.values(StatusEnum).includes(
        status as StatusEnum
      ),
      'dark-grey-background': status === 'No Task',
      'dark-yellow-background': status === 'On Leave',
      'dark-red-background': task_id === '10891',
      'dark-blue-background': status === 'Meeting',
    };
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */
  getBackgroundColors(item: Status) {
    return {
      'grey-background': item.status === 'No Task' && item.task_id === null,
      'yellow-background': item.status === 'On Leave',
      'red-background': item.task_id && item.status === 'No Task',
      'blue-background': item.status === 'Meeting',
    };
  }

  /**
   *Determines the background color classes based on the status and task ID of a given item for Task Name.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */
  getTaskNameStyleCondition(item: Status) {
    return {
      'red-background': item.task_id && item.status === 'No Task',
      'blue-background': item.status === 'Meeting',
      'green-background':
        item.status === 'Programming' || 'Testing' || 'Designing (UI/UX)',
    };
  }
}
