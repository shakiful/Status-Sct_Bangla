import { Status } from '../../models/status.model';
import { StatusEnum } from '../enums/statusEnum';

export class HelperFunction {
  updateStatusCount(status: Status[]) {
    return status.reduce(
      (count, item) => {
        const task_id = item.task_id;
        const statusValue = item.status as StatusEnum;
        if (
          Object.values(StatusEnum).includes(statusValue) &&
          StatusEnum.onLeave !== statusValue &&
          StatusEnum.noTask !== statusValue
        ) {
          count.active++;
        } else if (task_id && StatusEnum.noTask == statusValue) {
          count.noTask++;
        } else if (StatusEnum.onLeave === statusValue) {
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
    const status = item.status as StatusEnum;
    const task_id = item.task_id;
    return {
      'dark-green-background':
        Object.values(StatusEnum).includes(status) &&
        StatusEnum.noTask !== status &&
        StatusEnum.onLeave !== status,
      'dark-grey-background': status === StatusEnum.noTask,
      'dark-yellow-background': status === StatusEnum.onLeave,
      'dark-red-background': task_id && StatusEnum.noTask == status,
      'dark-blue-background': status === StatusEnum.meeting,
    };
  }

  /**
   * Determines the background color classes based on the status and task ID of a given item.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */
  getBackgroundColors(item: Status) {
    const status = item.status as StatusEnum;
    const task_id = item.task_id;
    return {
      'grey-background': task_id === null && status === StatusEnum.noTask,
      'yellow-background': status === StatusEnum.onLeave,
      'red-background': task_id && StatusEnum.noTask == status,
      'blue-background': status === StatusEnum.meeting,
    };
  }

  /**
   *Determines the background color classes based on the status and task ID of a given item for Task Name.
   *
   * @param item - The item is using 'status' and 'task_id' properties of Status Object.
   * @returns CSS Class names if the condition is met
   */
  getTaskNameStyleCondition(item: Status) {
    const status = item.status as StatusEnum;
    const task_id = item.task_id;
    return {
      'red-background': task_id && status === StatusEnum.noTask,
      'blue-background': status === StatusEnum.meeting,
      'green-background':
        Object.values(StatusEnum).includes(status) &&
        StatusEnum.noTask !== status &&
        StatusEnum.onLeave !== status,
    };
  }
}
