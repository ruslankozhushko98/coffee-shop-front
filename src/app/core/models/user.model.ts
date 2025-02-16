import { Gender } from 'app/shared/utils/enums';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: Gender;
}
