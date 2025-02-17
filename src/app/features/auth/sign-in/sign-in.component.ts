import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { signIn } from 'app/store/auth/auth.actions';
import { selectSignInError } from 'app/store/auth/auth.selector';

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
  store = inject(Store);

  isSigningIn = signal(false);

  errorMessage$ = this.store.select(selectSignInError);

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSignIn(e: SubmitEvent) {
    e.preventDefault();

    if (!this.signInForm.invalid) {
      this.isSigningIn.update(() => true);

      this.store.dispatch(signIn({
        email: String(this.signInForm.value.email),
        password: String(this.signInForm.value.password),
      }));

      this.isSigningIn.update(() => false);
    }
  }
}
