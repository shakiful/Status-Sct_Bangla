export class Status {
  public user_name?: string;
  public status?: string;
  public total_time?: Date | null;
  public status_id?: number;
  public task_id?: string;
  public task_name?: string;
  public team?: number;
  public user_id?: number;
  public updated_at?: Date;
  public isOnLeave?: Date;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
