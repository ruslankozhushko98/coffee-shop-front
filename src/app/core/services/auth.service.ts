import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  TokenResponse,
  SignInDto,
  SignUpDto,
  UserResponse,
} from 'app/shared/utils/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  public signIn(dto: SignInDto) {
    return this.http.post<TokenResponse>('http://localhost:8000/api/auth/sign-in', dto);
  }

  public signUp(dto: SignUpDto) {
    return this.http.post<TokenResponse>('http://localhost:8000/api/auth/sign-up', dto);
  }

  public fetchMe() {
    return this.http.get<UserResponse>('http://localhost:8000/api/auth/me');
  }

  public signOut() {
    return this.http.post<{ message: string }>('http://localhost:8000/api/auth/sign-out', null);
  }
}
