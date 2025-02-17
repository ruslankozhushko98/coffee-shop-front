import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-sign-in',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  authStore = inject(AuthStore);

  isSigningIn = this.authStore.isSigningIn;
  isError = this.authStore.isSignInError;
  errorMessage = this.authStore.signInErrorMessage;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSignIn(e: SubmitEvent) {
    e.preventDefault();

    if (!this.signInForm.invalid) {
      this.authStore.signIn({
        email: String(this.signInForm.value.email),
        password: String(this.signInForm.value.password),
      });
    }
  }
}
