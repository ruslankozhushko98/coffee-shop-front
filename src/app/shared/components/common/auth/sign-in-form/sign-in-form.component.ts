import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { catchError } from 'rxjs';

import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'sign-in-form',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.scss',
})
export class SignInForm {
  router = inject(Router);
  authService = inject(AuthService);

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  submitForm = () => {
    if (this.signInForm.valid) {
      this.authService.signIn({
        email: String(this.signInForm.value.email),
        password: String(this.signInForm.value.password),
      })
        .pipe(
          catchError(err => {
            console.log('err: ', err);
            throw err;
          }),
        )
        .subscribe(data => {
          localStorage.setItem('accessToken', data.accessToken);
        });
    } else {
      alert(this.signInForm.errors);
    }
  };
}
