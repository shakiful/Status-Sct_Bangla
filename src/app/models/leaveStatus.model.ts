export class LeaveStatus {
  public emp_id?: number;
  public emp_name?: string = '';
  public day?: number;
  public slot?: string;
  public leave_date?: Date;

  deserialize(input: LeaveStatus): LeaveStatus {
    Object.assign(this, input);
    return this;
  }
}
