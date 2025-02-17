import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'app/core/models';
import {
  AuthResponse,
  SignInDto,
  SignUpDto,
} from 'app/shared/utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  public signIn(dto: SignInDto) {
    return this.http.post<AuthResponse>('http://localhost:5001/auth/sign-in', dto);
  }

  public signUp(dto: SignUpDto) {
    return this.http.post<AuthResponse>('http://localhost:5001/auth/sign-up', dto);
  }

  public fetchMe() {
    return this.http.get<User>('http://localhost:5001/auth/me');
  }
}
