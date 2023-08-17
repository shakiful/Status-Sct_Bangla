import { Deserializable } from './deserializable';
// import { User } from './user.model';

export class Status implements Deserializable {
  deserialize(input: any): this {
    throw new Error('Method not implemented.');
  }

  public user_name: string;
  // public user: User;
  public status: string = '';
  public total_time?: Date | null;
  public status_id: number;

  // deserialize(input: any) {
  //   Object.assign(this, input);
  //   this.total_time = input.total_time ? new Date(input.total_time) : null;
  //   this.user = input.user ? new User().deserialize(input.user) : new User();
  //   return this;
  // }

  // toOdata(): Object {
  //   return { ...this, user_name: this.user?.name, user: undefined };
  // }
}
