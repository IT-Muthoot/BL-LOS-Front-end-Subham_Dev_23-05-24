import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaModule,
} from 'ng-recaptcha';
import { LoginService } from '../../services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { encryptData, decryptData } from '../../services/aes/aes.services';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaFormsModule,
    RouterLink
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfR_gcqAAAAADubcl-yFCLO8p0Xbr_OPa7EKtBh',
    },
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  captchaResolved = false;
  submitted = false;
  captchaResponse!: string;
  encryptedData: any;
  worngLoginDetails: boolean = false;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ls: LoginService,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  resolved(captchaResponse: any) {
    if (captchaResponse == null || captchaResponse == undefined) {
      this.expired();
      return;
    }
    this.captchaResponse = captchaResponse;
    this.captchaResolved = true;
  }

  expired() {
    this.captchaResolved = false;
    this.captchaResponse = '';
    console.log('Captcha expired');
  }

  async onSubmit() {
    this.submitted = true;
    if (this.submitted && this.loginForm.valid && this.captchaResolved) {
      const payload = {
        employeeId: this.loginForm.value.name,
        password: this.loginForm.value.password,
      };
      try {
        const res: any = await this.ls.login(payload);
        if (res.statusCode == 500) {
          this._snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'red-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        if (res.statusCode == 400) {
          this._snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'red-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        if (res.statusCode == 208) {
          this._snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'red-snackbar',
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          Swal.fire({
            icon: 'info',
            text: res.message,
          });
          return;
        }
        if (res.statusCode == 200) {         
          var userData = res.data;
          var token = res.accessToken;
          const accessToken: any = encryptData(token);
          localStorage.setItem('accessToken', accessToken);
          const userDetails: any = encryptData(JSON.stringify(userData));
          localStorage.setItem('userDetails', userDetails);
          localStorage.setItem('rToken', res.newRefreshToken);
          if(userData.isDefault == 1){
             this.router.navigate(['/set-password'])
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      return;
    }
  }
}
