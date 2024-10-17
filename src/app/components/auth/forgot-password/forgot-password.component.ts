import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';

import { RouterLink } from '@angular/router';
import { CommonServiceService } from '../../../services/common-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgOtpInputModule } from  'ng-otp-input';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RecaptchaModule, ReactiveFormsModule, FormsModule, RecaptchaFormsModule,CommonModule, RouterLink, NgOtpInputModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: any;
  captchaResolved = false;
  submitted = false;
  captchaResponse!: string;
  encryptedData: any;
  worngLoginDetails: boolean = false;
  errorMessage: any;
  showNewPassword = false;
  showConfirmPassword = false;
  otpSent:boolean = false;
  otpVerified:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  mobileFieldSubmitted:boolean = false;
  OTPFieldSubmitted: boolean = false;
  otp: any;
  requestId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _cs:CommonServiceService
  ) {}

  async ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
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

  async onSendOTP() {
    this.mobileFieldSubmitted = true;
    if (this.forgotPasswordForm.controls['mobileNumber'].valid) {
      let payload:any;
      let mobileNumber = this.forgotPasswordForm.controls['mobileNumber'].value;
      payload = {
        mobileNumber: mobileNumber
      }
      let res:any = await this._cs.getCommonFunction('OTPRequest', payload);
      if(res.statusCode == 200){
        this.otpSent = true;
        this.requestId = res.data.requestId;
      } else {
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    } else {
      return;
    }
  }

  onOtpChange(data:any){
     this.otp = data;
  }
  
  async verifyOtp() {
    this.OTPFieldSubmitted = true;
    if (this.otp.length == 5) {
      let payload:any;
      payload = {
        otp: this.otp,
        requestId:3726
      }
      console.log(payload)
      let res:any = await this._cs.getCommonFunction('OTPValidate', payload);
      if(res.statusCode == 200){
        this.otpVerified = true;
      } else {
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    } else {
      return;
    }
  }
}


