import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { decryptData } from '../../../services/aes/aes.services';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [ RecaptchaModule, ReactiveFormsModule, FormsModule, RecaptchaFormsModule,CommonModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  setForm: any;
  captchaResolved = false;
  submitted = false;
  captchaResponse!: string;
  encryptedData: any;
  worngLoginDetails: boolean = false;
  errorMessage: any;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _cs:CommonServiceService
  ) {}

  async ngOnInit() {
    this.setForm = this.fb.group({
      defaultPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    },
      {
        validator: this.passwordMatchValidator,
      }
  );
  }

  passwordMatchValidator(formGroup: AbstractControl) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.submitted && this.setForm.valid) {
      let userDetails:any = localStorage.getItem('userDetails');
      let accessTokenDAta:any = localStorage.getItem('accessToken');
      console.log(accessTokenDAta);
      let userData:any = JSON.parse(decryptData(userDetails));
      let accessToken:any = decryptData(accessTokenDAta);
      console.log(accessToken, userData);
      
      const payload = {
        cid: 1,
        userId: userData.employeeId,
        userName: userData.userName,
        mobileNumber: userData.mobileNumber,
        isDefault: 0,
        isDefaultPassword: 0,
        password: this.setForm.value.newPassword,
        setPasswordLUSR: userData.userName,
      };
      try {
        const res: any = await this._cs.getCommonFunction('UpdateLoginCredentialPassword', payload);
        if (res.statusCode == 200) {
          this.router.navigate(['/security-question-set'])
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      return;
    }
  }
}

