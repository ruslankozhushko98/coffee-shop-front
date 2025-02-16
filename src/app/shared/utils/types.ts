import { User } from 'app/core/models';

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = Omit<User, 'id'>;

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type UserResponse = {
  user: User;
};
