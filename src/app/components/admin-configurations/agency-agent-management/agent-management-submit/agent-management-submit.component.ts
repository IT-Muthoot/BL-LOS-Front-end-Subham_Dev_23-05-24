import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { ActivatedRoute, RouterLink, RouterModule, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agent-management-submit',
  standalone: true,
  imports: [MatTabsModule, MatTooltipModule, MatDatepickerModule,ReactiveFormsModule],
  templateUrl: './agent-management-submit.component.html',
  styleUrl: './agent-management-submit.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AgentManagementSubmitComponent {
  selected: Date | null = null;
  formattedDate: string = '';
  agentDetailsForm:any;
  titleDropDown: any;
  genderDropDown: any;
  identityDropDown: any;
  accountTypeDropDown: any;
  preferredLanguageDropDown: any;
  activityTypeDropDown: any;
  finalSubmitted:boolean = false;
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _fb:FormBuilder, private _cs:CommonServiceService, private route:ActivatedRoute, private _snackBar:MatSnackBar, private _router:Router){

  }

  ngOnInit(){
      this.agentDetailsForm = this._fb.group({
        agencyId:[{value:'', disabled:1}],
        agentId:[''],
        agentName:[{value:'', disabled:1}],
        agencyName:[{value:'', disabled:1}],
        title:['', Validators.required],
        firstName:['', Validators.required],
        middleName:['', Validators.required],
        lastName:['', Validators.required],
        gender:['', Validators.required],
        dob:['', Validators.required],
        emailId:['', Validators.required],
        mobileNumber:['', Validators.required],
        landlineNumber:['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country:['', Validators.required],
        pincode: ['', Validators.required],
        identityType1: ['', Validators.required],
        documentId1: ['', Validators.required],
        identityType2: ['', Validators.required],
        documentId2: ['', Validators.required],
        identityType3: ['', Validators.required],
        documentId3: ['', Validators.required],
        accountType: ['', Validators.required], 
        ifscCode: ['', Validators.required],
        bankName: ['', Validators.required],
        branchName: ['', Validators.required],
        accountNumber: ['', Validators.required],
        confirmAccountNumber: ['', Validators.required],
        accountName: ['', Validators.required],
        prefferedLanguage: ['', Validators.required],
        branchId: ['', Validators.required],
        userRole: ['', Validators.required],
        supervisorId: ['', Validators.required],
        supervisorRoleId: ['', Validators.required],
        activityType: ['', Validators.required],
        remarks: ['', Validators.required]
      });
      this.getMiscellaneous();

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
      this.accountTypeDropDown=res.data.AccountType;
      this.preferredLanguageDropDown=res.data.PreferredLanguage;
      this.activityTypeDropDown=res.data.ActivityType;
    }else{
      this.titleDropDown=[];
      this.genderDropDown=[];
      this.identityDropDown=[];
      this.accountTypeDropDown=[];
      this.preferredLanguageDropDown=[];
      this.activityTypeDropDown=[];
    }
  }

  convertDateToYYYYMMDD(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
    
  }
  ngDoCheck() {
    if (this.selected) {
      console.log(this.agentDetailsForm.value.dob)
      // this.formattedDate = this.convertDateToYYYYMMDD();
      console.log(this.formattedDate)
    }
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
      this.agentDetailsForm = this._fb.group({
        agencyId:[{value:res.data[0].agencyId,disabled:this.isDisabled}],
        agentId:[''],
        agentName:[{value:res.data[0].agentName,disabled:this.isDisabled}],
        agencyName:[{value:res.data[0].agencyName,disabled:this.isDisabled}],
        title:[{value:res.data[0].title,disabled:this.isDisabled}, Validators.required],
        firstName:[{value:res.data[0].firstName,disabled:this.isDisabled}, Validators.required],
        middleName:[{value:res.data[0].middleName,disabled:this.isDisabled}, Validators.required],
        lastName:[{value:res.data[0].lastName,disabled:this.isDisabled}, Validators.required],
        gender:[{value:res.data[0].gender,disabled:this.isDisabled}, Validators.required],
        dob:[{value:res.data[0].dob,disabled:this.isDisabled}, Validators.required],
        emailId:[{value:res.data[0].emailId,disabled:this.isDisabled}, Validators.required],
        mobileNumber:[{value:res.data[0].mobileNumber,disabled:this.isDisabled}, Validators.required],
        landlineNumber:[{value:res.data[0].landlineNumber,disabled:this.isDisabled}, Validators.required],
        address: [{value:res.data[0].address,disabled:this.isDisabled}, Validators.required],
        city: [{value:res.data[0].city,disabled:this.isDisabled}, Validators.required],
        state: [{value:res.data[0].state,disabled:this.isDisabled}, Validators.required],
        country:[{value:res.data[0].country,disabled:this.isDisabled}, Validators.required],
        pincode: [{value:res.data[0].pincode,disabled:this.isDisabled}, Validators.required],
        identityType1: [{value:res.data[0].identityType1,disabled:this.isDisabled}, Validators.required],
        documentId1: [{value:res.data[0].documentId1,disabled:this.isDisabled}, Validators.required],
        identityType2: [{value:res.data[0].identityType2,disabled:this.isDisabled}, Validators.required],
        documentId2: [{value:res.data[0].documentId2,disabled:this.isDisabled}, Validators.required],
        identityType3: [{value:res.data[0].identityType3,disabled:this.isDisabled}, Validators.required],
        documentId3: [{value:res.data[0].documentId3,disabled:this.isDisabled}, Validators.required],
        accountType: [{value:res.data[0].accountType,disabled:this.isDisabled}, Validators.required], 
        ifscCode: [{value:res.data[0].ifscCode,disabled:this.isDisabled}, Validators.required],
        bankName: [{value:res.data[0].bankName,disabled:this.isDisabled}, Validators.required],
        branchName: [{value:res.data[0].branchName,disabled:this.isDisabled}, Validators.required],
        accountNumber: [{value:res.data[0].accountNumber,disabled:this.isDisabled}, Validators.required],
        confirmAccountNumber: [{value:res.data[0].confirmAccountNumber,disabled:this.isDisabled}, Validators.required],
        accountName: [{value:res.data[0].accountName,disabled:this.isDisabled}, Validators.required],
        prefferedLanguage: [{value:res.data[0].prefferedLanguage,disabled:this.isDisabled}, Validators.required],
        branchId: [{value:res.data[0].branchId,disabled:this.isDisabled}, Validators.required],
        userRole: [{value:res.data[0].userRole,disabled:this.isDisabled}, Validators.required],
        supervisorId: [{value:res.data[0].supervisorId,disabled:this.isDisabled}, Validators.required],
        supervisorRoleId: [{value:res.data[0].supervisorRoleId,disabled:this.isDisabled}, Validators.required],
        activityType: [{value:res.data[0].activityType,disabled:this.isDisabled}, Validators.required],
        remarks: [{value:res.data[0].remarks,disabled:this.isDisabled}, Validators.required]
      });
    }
  }
  
  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.agentDetailsForm.invalid){
      return;
    } else {
      var payload:any;
      payload = {
        cid: 1,
        lusr: "john_doe",
        status: 266,
        ...this.agentDetailsForm.value,
        agencyId:1,
        agentId:1,
        agentName:"testData",
        agencyName:"testData",
        title:parseInt(this.agentDetailsForm.value.title, 10),
        gender:parseInt(this.agentDetailsForm.value.gender, 10),
        city:parseInt(this.agentDetailsForm.value.city, 10),
        state:parseInt(this.agentDetailsForm.value.state, 10),
        country:parseInt(this.agentDetailsForm.value.country, 10),
        identityType1:parseInt(this.agentDetailsForm.value.identityType1, 10),
        identityType2:parseInt(this.agentDetailsForm.value.identityType2, 10),
        identityType3:parseInt(this.agentDetailsForm.value.identityType3, 10),
        accountType:parseInt(this.agentDetailsForm.value.accountType, 10),
        prefferedLanguage:parseInt(this.agentDetailsForm.value.prefferedLanguage, 10),
        userRole:parseInt(this.agentDetailsForm.value.userRole, 10),
        supervisorRoleId:parseInt(this.agentDetailsForm.value.supervisorRoleId, 10),
        activityType:parseInt(this.agentDetailsForm.value.activityType, 10),
        documentId1:123,
        documentId2:123,
        documentId3:123, 
        dob:this.convertDateToYYYYMMDD(this.agentDetailsForm.value.dob),
        companyId: 4321,
        companyName: "Doe Enterprises",
      }
      console.log(payload)
      var res:any;
      if(this.isEditMode){
        payload['id'] = this.masterId;
        res = await this._cs.getCommonFunction('UpdateAgentMaster', payload);
      } else {
        res = await this._cs.getCommonFunction('InsertAgentMaster', payload);
      }
      // let res:any = await this._cs.getCommonFunction('InsertDigitalKycCheckConfigurationMaster', payload);
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/sla-defination-list'])
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
