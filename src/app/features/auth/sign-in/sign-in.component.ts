import { Component } from '@angular/core';

import { SignInForm } from 'app/shared/components/common/auth/sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-in',
  imports: [SignInForm],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
}
