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
  selector: 'app-security-questing',
  standalone: true,
  imports: [RecaptchaModule, ReactiveFormsModule, FormsModule, RecaptchaFormsModule,CommonModule],
  templateUrl: './security-questing.component.html',
  styleUrl: './security-questing.component.scss'
})
export class SecurityQuestingComponent {
  setForm: any;
  captchaResolved = false;
  submitted = false;
  captchaResponse!: string;
  encryptedData: any;
  worngLoginDetails: boolean = false;
  errorMessage: any;
  showNewPassword = false;
  showConfirmPassword = false;
  getQuestions:any = []

  questions:any =[
    {id:1, question:"What is your nick name?"},
    {id:2, question:"What is your pet name?"},
    {id:3, question:"What is your dob?"},
    {id:4, question:"What is your mother's maiden name?"},
    {id:5, question:"What is your birth place name?"},
    {id:6, question:"What was the make of your first car?"},
    {id:7, question:"What was your favorite food as a child?"},
    {id:8, question:"What year was your father or mother born?"},
    {id:9, question:"What is your favorite sport?"},
    {id:10, question:"What was the name of your elementary or primary school?"}
  ] 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _cs:CommonServiceService
  ) {
    this.getData();
  }

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

  async getData() {
    const payload = {
    }
    let res:any = await this._cs.getCommonFunction('GetAllSecurityQuestions', payload);
    if(res.statusCode == 200){
      this.getQuestions = res.dataTable;
    } else {
    }
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


