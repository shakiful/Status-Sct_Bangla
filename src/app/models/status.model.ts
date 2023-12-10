export class Status {
  public user_name?: string;
  public status?: string = '';
  public total_time?: Date | null;
  public status_id?: number;
  public task_id?: string;
  public task_name?: string;
  public team?: number;

  deserialize(input: Status): Status {
    Object.assign(this, input);
    return this;
  }
}
