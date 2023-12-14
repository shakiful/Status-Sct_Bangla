export class UserActivity {
  user_id: number;
  start_time: Date;
  end_time: Date;
  status: string;
  problem: string;
  id: number;
  elapsed_mins: number;

  deserialize(input: any) {
    Object.assign(this, input);

    return this;
  }
}
