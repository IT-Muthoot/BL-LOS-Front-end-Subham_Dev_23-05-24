import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink, RouterModule, Router } from '@angular/router';
import { CommonServiceService } from '../../../../services/common-service.service';
import { DmsService } from '../../../../services/dms/dms.service';

@Component({
  selector: 'app-user-management-submit-form',
  standalone: true,
  imports: [MatTabsModule, MatTooltipModule, MatDatepickerModule, ReactiveFormsModule],
  templateUrl: './user-management-submit-form.component.html',
  styleUrl: './user-management-submit-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class UserManagementSubmitFormComponent {

  userForm:any;
  finalSubmitted:boolean = false;
  isEditMode:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDisabled:boolean = false;
  masterId:any;
  activityTypeDropDown:any = [];
  preferredLanguageDropDown:any = [];
  identityDropDown:any = [];
  genderDropDown:any = [];
  titleDropDown:any = [];
  roleData:any = [];
  identitydocumentId1: any;
  identitydocumentId2: any;
  identitydocumentId3: any;

  constructor(private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private _cs:CommonServiceService, private route:ActivatedRoute, private dms:DmsService){

  }

  ngOnInit(){
    this.getMiscellaneous();
    this.getListData();
    this.userForm = this._fb.group({
      employeeId: ['', Validators.required],
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      landlineNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      identityType1: ['', Validators.required],
      documentId1: ['', Validators.required],
      identityType2: [''],
      documentId2: [''],
      identityType3: [''],
      documentId3: [''],
      preferredLanguage: ['', Validators.required],
      // allowedLoanType: ['', Validators.required],
      // productAllowed: ['', Validators.required],
      branchId: ['', Validators.required],
      userRole: ['', Validators.required],
      supervisorId: ['', Validators.required],
      supervisorRoleId: ['', Validators.required],
      activityType: ['', Validators.required],
      remarks: ['', Validators.required],
      // password: ['', Validators.required],
      // isDefault: ['', Validators.required],
    })

    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.masterId = params['id'];
        this.isEditMode = true;
        this.isDisabled = true;
        this.getViewData();
      }
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "Title,Gender,IdentityType,AccountType,PreferredLanguage,ActivityType"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.titleDropDown=res.data.Title;
      this.genderDropDown=res.data.Gender;
      this.identityDropDown=res.data.IdentityType;
      this.preferredLanguageDropDown=res.data.PreferredLanguage;
      this.activityTypeDropDown=res.data.ActivityType;
    }else{
      this.titleDropDown=[];
      this.genderDropDown=[];
      this.identityDropDown=[];
      this.preferredLanguageDropDown=[];
      this.activityTypeDropDown=[];
    }
  }

  async getListData(){
    const payload = {
      cid: 1,
      pageNo: 1,
      pageSize: 500
    }
    let res:any = await this._cs.getCommonFunction('GetAllRole', payload);
    if(res.statusCode == 200){
      this.roleData = res.dataTable;
    } else {
    }
  }

  convertDateToYYYYMMDD(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  async getViewData(){
    let payload:any = {
      id: parseInt(this.masterId),
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('GetByIdAgentMaster' ,payload);
    if(res.statusCode == 200){
      this.userForm = this._fb.group({
        employeeId: [{value:res.dataTable.employeeId,disabled:this.isDisabled}, Validators.required],
        title: [{value:res.dataTable.title,disabled:this.isDisabled}, Validators.required],
        firstName: [{value:res.dataTable.firstName,disabled:this.isDisabled}, Validators.required],
        middleName: [{value:res.dataTable.middleName,disabled:this.isDisabled}],
        lastName: [{value:res.dataTable.lastName,disabled:this.isDisabled}, Validators.required],
        companyId: [{value:res.dataTable.companyId,disabled:this.isDisabled}, Validators.required],
        companyName: [{value:res.dataTable.companyName,disabled:this.isDisabled}, Validators.required],
        gender: [{value:res.dataTable.gender,disabled:this.isDisabled}, Validators.required],
        dob: [{value:res.dataTable.dob,disabled:this.isDisabled}, Validators.required],
        emailId: [{value:res.dataTable.emailId,disabled:this.isDisabled}, Validators.required],
        mobileNumber: [{value:res.dataTable.mobileNumber,disabled:this.isDisabled}, Validators.required],
        landlineNumber: [{value:res.dataTable.landlineNumber,disabled:this.isDisabled}, Validators.required],
        address: [{value:res.dataTable.address,disabled:this.isDisabled}, Validators.required],
        city: [{value:res.dataTable.city,disabled:this.isDisabled}, Validators.required],
        state: [{value:res.dataTable.state,disabled:this.isDisabled}, Validators.required],
        country: [{value:res.dataTable.country,disabled:this.isDisabled}, Validators.required],
        pincode: [{value:res.dataTable.pincode,disabled:this.isDisabled}, Validators.required],
        identityType1: [{value:res.dataTable.identityType1,disabled:this.isDisabled}, Validators.required],
        documentId1: [{value:res.dataTable.documentId1,disabled:this.isDisabled}, Validators.required],
        identityType2: [{value:res.dataTable.identityType2,disabled:this.isDisabled}, Validators.required],
        documentId2: [{value:res.dataTable.documentId2,disabled:this.isDisabled}, Validators.required],
        identityType3: [{value:res.dataTable.identityType3,disabled:this.isDisabled}, Validators.required],
        documentId3: [{value:res.dataTable.documentId3,disabled:this.isDisabled}, Validators.required],
        preferredLanguage: [{value:res.dataTable.preferredLanguage,disabled:this.isDisabled}, Validators.required],
        allowedLoanType: [{value:res.dataTable.allowedLoanType,disabled:this.isDisabled}, Validators.required],
        productAllowed: [{value:res.dataTable.productAllowed,disabled:this.isDisabled}, Validators.required],
        branchId: [{value:res.dataTable.branchId,disabled:this.isDisabled}, Validators.required],
        userRole: [{value:res.dataTable.userRole,disabled:this.isDisabled}, Validators.required],
        supervisorId: [{value:res.dataTable.supervisorId,disabled:this.isDisabled}, Validators.required],
        supervisorRoleId: [{value:res.dataTable.supervisorRoleId,disabled:this.isDisabled}, Validators.required],
        activityType: [{value:res.dataTable.activityType,disabled:this.isDisabled}, Validators.required],
        remarks: [{value:res.dataTable.remarks,disabled:this.isDisabled}, Validators.required],
        // password: [{value:res.dataTable.customerCategory,disabled:this.isDisabled}, Validators.required],
        // isDefault: [{value:res.dataTable.customerCategory,disabled:this.isDisabled}, Validators.required],
      })
    }
  }

  async onFileSelected(event: Event, fieldName:any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      var file = input.files[0];
      if (input.files && input.files.length > 0) {
        file = input.files[0];
        console.log('Selected file:', file);
      } else {
        console.error('No file selected.');
      }
          const formData = new FormData();
          formData.append('File', file);
          formData.append('Title', file.name);
          formData.append('Description', file.type);
          formData.append('Tags', 'test');
          formData.append('IsPasswordProtected', '0');
          formData.append('Password', '0');
          formData.append('LUSR', 'MZ00608');
          let token:any = await this.dms.getDmsAuthToke();
          var res:any = await this.dms.uploadFile(formData, token.access_token);
          if(fieldName == "documentId1"){
            this.identitydocumentId1= res.docId;
          }
          if(fieldName == "documentId2"){
            this.identitydocumentId2- res.docId;
          }
          if(fieldName == "documentId3"){
            this.identitydocumentId3= res.docId;
          }
    }
  }
  
  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.userForm.invalid){
      return;
    } else {
      var payload:any;
      payload = {
        cid: 1,
        lusr: "john_doe",
        status: 266,
        ...this.userForm.value,
        title:parseInt(this.userForm.value.title, 10),
        gender:parseInt(this.userForm.value.gender, 10),
        city:parseInt(this.userForm.value.city, 10),
        state:parseInt(this.userForm.value.state, 10),
        country:parseInt(this.userForm.value.country, 10),
        identityType1:parseInt(this.userForm.value.identityType1, 10),
        identityType2:parseInt(this.userForm.value.identityType2, 10),
        identityType3:parseInt(this.userForm.value.identityType3, 10),
        accountType:parseInt(this.userForm.value.accountType, 10),
        prefferedLanguage:parseInt(this.userForm.value.prefferedLanguage, 10),
        userRole:parseInt(this.userForm.value.userRole, 10),
        supervisorRoleId:parseInt(this.userForm.value.supervisorRoleId, 10),
        activityType:parseInt(this.userForm.value.activityType, 10),
        documentId1:this.identitydocumentId1,
        documentId2:this.identitydocumentId2,
        documentId3:this.identitydocumentId3, 
        dob:this.convertDateToYYYYMMDD(this.userForm.value.dob),
        companyId: 4321,
        companyName: "Doe Enterprises",
      }
      let userName= this.userForm.value.firstName +' '+this.userForm.value.middleName+ ' '+this.userForm.value.lastName;
      let payloadInsertCredential = 
        {
          cid: 1,
          userId: this.userForm.value.employeeId,
          userName: userName,
          mobileNumber: this.userForm.value.mobileNumber,
          isDefault: 1,
          isDefaultPassword: 1,
          setPasswordLUSR: "john_doe",
          lusr: "john_doe"
        
        }
    
      var res:any;
      if(this.isEditMode){
        payload['id'] = this.masterId;
        res = await this._cs.getCommonFunction('UpdateUser', payload);
      } else {
        res = await this._cs.getCommonFunction('InsertUser', payload);
        let resInsertLoginCredential = await this._cs.getCommonFunction('InsertLoginCredential', payloadInsertCredential);
      }
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/user-management-list'])
      } else {
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    }
  }
}
