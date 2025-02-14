import { Gender } from 'app/shared/utils/enums';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  dob: string;
  gender: Gender;
}
