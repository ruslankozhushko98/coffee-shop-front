import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { Gender } from 'app/shared/utils/enums';
import { AuthStore } from 'app/store/auth.store';

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
  authStore = inject(AuthStore);

  isSigningUp = this.authStore.isSigningUp;
  isError = this.authStore.isSignUpError;
  errorMessage = this.authStore.signUpErrorMessage;

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
      this.authStore.signUp({
        email: String(this.signUpForm.value.email),
        password: String(this.signUpForm.value.password),
        firstName: String(this.signUpForm.value.firstName),
        lastName: String(this.signUpForm.value.lastName),
        dob: String(this.signUpForm.value.dob),
        gender: this.signUpForm.value.gender as Gender,
      });
    }
  }
}
