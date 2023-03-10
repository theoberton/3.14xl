import { IsDefined } from 'class-validator';

export class Info {
  @IsDefined()
  country: string;
  @IsDefined()
  city: string;
}