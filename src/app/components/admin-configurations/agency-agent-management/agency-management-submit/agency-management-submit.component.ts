import { Component, ViewChild, ElementRef } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DmsService } from '../../../../services/dms/dms.service';

@Component({
  selector: 'app-agency-management-submit',
  standalone: true,
  imports: [MatTabsModule, MatDatepickerModule,ReactiveFormsModule, RouterLink],
  templateUrl: './agency-management-submit.component.html',
  styleUrl: './agency-management-submit.component.scss'
})
export class AgencyManagementSubmitComponent {

  agencyDetailsForm:any;
  supportingDocumentForm:any;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  uploadedFiles: any[] = [];
  finalSubmitted:boolean = false;
  natureOfBusinessDropDown:any = [];
  AccountTypeDropDown:any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;

  constructor(private _fb:FormBuilder, private _cs:CommonServiceService,private _snackBar:MatSnackBar, private _router:Router, private dms:DmsService, private route:ActivatedRoute){

  }

  ngOnInit(){
    this.getMiscellaneous();
    this.agencyDetailsForm = this._fb.group({
      agencyName:['', Validators.required],
      agencyId:['', Validators.required],
      address:['', Validators.required],
      pincode:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      country:['', Validators.required],
      contactPerson:['', Validators.required],
      mobileNumber:['', Validators.required],
      emailId:['', Validators.required],
      natureOfBusiness:['', Validators.required],
      website:['', Validators.required],
      accountType:['', Validators.required],
      ifscCode:['', Validators.required],
      bankName:['', Validators.required],
      branchName:['', Validators.required],
      accountNumber:['', Validators.required],
      confirmAccountNumber:['', Validators.required],
      accountName:['', Validators.required]
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
      Cdval: "NatureOfBusiness,AccountType"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.natureOfBusinessDropDown=res.data.NatureOfBusiness;
      this.AccountTypeDropDown=res.data.AccountType;
    }else{
      this.natureOfBusinessDropDown=[];
      this.AccountTypeDropDown=[];
    }

  }

  openFileSelector() {
    this.fileInput.nativeElement.click();
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     console.log('File Name:', file);
  //     console.log('File Size:', file.size);
  //     console.log('File Type:', file.type);
      
  //     // To read the file content
  //     const reader = new FileReader();
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       console.log('File Content:', (e.target as FileReader).result);
  //     };
  //     reader.readAsText(file); // or reader.readAsDataURL(file) for base64 content
  //   }
  // }
  async onFileSelected(event: Event) {
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
          formData.append('LUSR', 'Soudhankhi');
          let token:any = await this.dms.getDmsAuthToke();
          var res:any = await this.dms.uploadFile(formData, token.access_token);
         this.uploadedFiles.push({
          File:file,
          Title: file.name,
          Description: file.type,
          size: file.size,
          Tags: 'test',
          IsPasswordProtected: '0',
          Password: '0',
          documentId:345
        });
      // });
    }
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  deleteTemp(){
    this.uploadedFiles = [];
  }

  async getViewData(){
    let payload:any = {
      id: parseInt(this.masterId),
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('GetByIdAgencyMaster' ,payload);
    if(res.statusCode == 200){
      this.agencyDetailsForm = this._fb.group({
        agencyName:[{value:res.data.agencyName,disabled:this.isDisabled}, Validators.required],
        agencyId:[{value:res.data.agencyId,disabled:this.isDisabled}, Validators.required],
        address:[{value:res.data.address,disabled:this.isDisabled}, Validators.required],
        pincode:[{value:res.data.pincode,disabled:this.isDisabled}, Validators.required],
        city:[{value:res.data.city,disabled:this.isDisabled}, Validators.required],
        state:[{value:res.data.state,disabled:this.isDisabled}, Validators.required],
        country:[{value:res.data.country,disabled:this.isDisabled}, Validators.required],
        contactPerson:[{value:res.data.contactPerson,disabled:this.isDisabled}, Validators.required],
        mobileNumber:[{value:res.data.mobileNumber,disabled:this.isDisabled}, Validators.required],
        emailId:[{value:res.data.emailId,disabled:this.isDisabled}, Validators.required],
        natureOfBusiness:[{value:res.data.natureOfBusiness,disabled:this.isDisabled}, Validators.required],
        website:[{value:res.data.website,disabled:this.isDisabled}, Validators.required],
        accountType:[{value:res.data.accountType,disabled:this.isDisabled}, Validators.required],
        ifscCode:[{value:res.data.ifscCode,disabled:this.isDisabled}, Validators.required],
        bankName:[{value:res.data.bankName,disabled:this.isDisabled}, Validators.required],
        branchName:[{value:res.data.branchName,disabled:this.isDisabled}, Validators.required],
        accountNumber:[{value:res.data.accountNumber,disabled:this.isDisabled}, Validators.required],
        confirmAccountNumber:[{value:res.data.confirmAccountNumber,disabled:this.isDisabled}, Validators.required],
        accountName:[{value:res.data.accountName,disabled:this.isDisabled}, Validators.required]
      })
    } else {

    }
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.agencyDetailsForm.invalid){
      return;
    } else {
      var payload = {
        cid: 1,
        lusr: "john_doe",
        status: 266,
        ...this.agencyDetailsForm.value,
        city:parseInt(this.agencyDetailsForm.value.city, 10),
        state:parseInt(this.agencyDetailsForm.value.state, 10),
        country:parseInt(this.agencyDetailsForm.value.country, 10),
        natureOfBusiness:parseInt(this.agencyDetailsForm.value.natureOfBusiness, 10),
        accountType:parseInt(this.agencyDetailsForm.value.accountType, 10),
        agencyDetails:[
          {
            cId: 1,
            agencyId: 9876,
            documentId: 4321,
            documentType: 1,
            documentName: "Business License",
            status: 266,
            lusr: "admin_user"
          }
        ]
      }
      console.log(payload)
      var res:any;
        if(this.isEditMode){
          payload['id'] = parseInt(this.masterId);
          res = await this._cs.getCommonFunction('UpdateAgencyMaster', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertAgencyMaster', payload);
       }
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/agency-management-browse'])
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
