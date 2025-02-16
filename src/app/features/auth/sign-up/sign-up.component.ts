import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';

import { Gender } from 'app/shared/utils/enums';
import { signUp } from 'app/store/auth/auth.actions';
import { selectSignUpError } from 'app/store/auth/auth.selector';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  store = inject(Store);

  isSigningUp = signal(false);

  errorMessage$ = this.store.select(selectSignUpError);

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gender: new FormControl(''),
  });

  handleSignUp(e: SubmitEvent) {
    e.preventDefault();

    if (!this.signUpForm.invalid) {
      this.isSigningUp.set(true);

      this.store.dispatch(signUp({
        email: String(this.signUpForm.value.email),
        password: String(this.signUpForm.value.password),
        firstName: String(this.signUpForm.value.firstName),
        lastName: String(this.signUpForm.value.lastName),
        dob: String(this.signUpForm.value.dob),
        gender: this.signUpForm.value.gender as Gender,
      }));

      this.isSigningUp.set(false);
    }
  }
}
