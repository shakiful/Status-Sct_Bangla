import { LeaveStatus } from '../../models/leaveStatus.model';
import { Status } from '../../models/status.model';
import { StatusEnum } from '../enums/statusEnum';

export class HelperFunction {
  updateStatusCount(status: Status[]) {
    // Reset counts
    let active: number = 0;
    let noTask: number = 0;
    let deActivated: number = 0;

    // Iterate through the status array
    status.forEach((item: Status) => {
      const task_id = item.task_id;
      const status = item.status;
      const isActive =
        Object.values(StatusEnum).includes(status as StatusEnum) &&
        task_id != '10891';

      if (isActive) {
        active++;
      } else if (task_id === '10891') {
        noTask++;
      } else {
        deActivated++;
      }
    });
    return {
      active,
      noTask,
      deActivated,
    };
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
      'dark-grey-background': status === 'No Task' || status === 'On Leave',
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
      'grey-background':
        (item.status === 'No Task' && item.task_id === null) ||
        item.status === 'On Leave',
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

  /**
   *Checks if The user is on leave or not
   * @param status - status contains the array of Status Object
   * @param leaveStatus - leaveStatus contains the array of LeaveStatus Object
   * @returns the status of the employee
   */
  onLeaveCheck(status: Status[], leaveStatus: LeaveStatus[]): Status[] {
    if (status && leaveStatus) {
      status.forEach((value: Status) => {
        leaveStatus.find((data: LeaveStatus) => {
          if (!value.task_id) {
            if (value.user_id === data.emp_id) {
              value.status = 'On Leave';
            }
          }
        });
      });
    }
    return status;
  }
}
