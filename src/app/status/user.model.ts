import { Deserializable } from './deserializable';

export class User implements Deserializable {
  public id?: number;
  public name?: string = '';
  public email?: string;
  public email_verified_at: Date | null;
  public created_at: Date | null;
  public updated_at: Date | null;
  public custom_id: string = '';
  public chip_number: null;
  public is_active: false;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

}
