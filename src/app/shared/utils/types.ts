import { User } from 'app/shared/models';

export type SignInDto = Pick<User, 'email' | 'password'>;
export type SignUpDto = Omit<User, 'id'>;

export type TokenResponse = {
  accessToken: string;
};

export type UserResponse = {
  user: User;
};
