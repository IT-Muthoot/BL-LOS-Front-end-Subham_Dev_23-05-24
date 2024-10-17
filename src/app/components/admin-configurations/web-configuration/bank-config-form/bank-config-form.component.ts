import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-config-form',
  standalone: true,
  imports: [MatTabsModule, ReactiveFormsModule],
  templateUrl: './bank-config-form.component.html',
  styleUrl: './bank-config-form.component.scss'
})
export class BankConfigFormComponent {
  bankDetailsForm:any
  idConfigurationForm:any
  finalSubmitted:boolean = false;
  tempSubmitButton: any;
  tempData: any = [];
  editing_index: any;
  tempFormEdit: boolean = false;
  currencyDropDown: any = [];
  serialNumberDropDown: any = [];
  PreferredLanguage: any = [];
  tempSubmittedData:any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb:FormBuilder, private _cs:CommonServiceService, private _snackBar:MatSnackBar, private _router:Router){}

  ngOnInit(){
    this.getMiscellaneous();
    this.bankDetailsForm = this.fb.group({
      bankId:['', Validators.required],
      bankName:['', Validators.required],
      hoBranchId:['', Validators.required],
      address:['', Validators.required],
      pincode:['', Validators.required],
      countryCode:['', Validators.required],
      countryName:['', Validators.required],
      city:['', Validators.required],
      website:['', Validators.required],
      mobileNumber:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      emailId:['', Validators.required],
      faxNumber:['', Validators.required],
      bankRegistrationNumber:['', Validators.required],
      defaultLanguage:['', Validators.required],
      isAgentMobileGpsAccess:['', Validators.required],
      localCurrency:['', Validators.required],
    })

    this.idConfigurationForm = this.fb.group({
      fieldName:['', Validators.required],
      format1:['', Validators.required],
      format2:['', Validators.required],
      format3:['', Validators.required],
      length1:['', Validators.required],
      length2:['', Validators.required],
      length3:['', Validators.required]
    })
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "Currency,SerialNumber,PreferredLanguage"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.currencyDropDown=res.data.Currency;
      this.serialNumberDropDown=res.data.SerialNumber;
      this.PreferredLanguage=res.data.PreferredLanguage;
    }else{
      this.currencyDropDown=[];
      this.serialNumberDropDown=[];
      this.PreferredLanguage=[];
    }

  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.idConfigurationForm.invalid ){
      return;
    } else {
      const formValue = this.idConfigurationForm.value;
      const generatedString = `${formValue.format1}(${formValue.length1})` +
                              `+${formValue.format2}(${formValue.length2})` +
                              `+${formValue.format3}(${formValue.length3})`;

      this.tempData.push({
        fieldName: formValue.fieldName,
        generatedString: generatedString
      });
      var data:any = {
        bankId : this.bankDetailsForm.value.bankId,
        fieldName:formValue.fieldName,
        formatBranchName:formValue.format1,
        formatProductId:formValue.format2,
        formatSerialNumber:formValue.format3,
        lengthBranchName:parseInt(formValue.length1),
        lengthProductId:parseInt(formValue.length2),
        lengthSerialNumber:parseInt(formValue.length3),
        status:266,
        lusr:"ff63809"
      }
      this.tempSubmittedData.push(data); 
      this.tempSubmitButton = false;
      this.idConfigurationForm.reset();
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
    this.tempSubmittedData.splice(index, 1);
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.bankDetailsForm.invalid  && (this.idConfigurationForm.invalid || this.tempData.length == 0)){
      if(this.idConfigurationForm.invalid && this.tempData.length == 0){
        this._snackBar.open('Please add data to temporary form', '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        return;
      }
      return;
    } else {
      if(this.tempData.length == 0){
        if(this.idConfigurationForm.valid){
          this.tempSubmit();
        } else {
          this._snackBar.open('Please add data to temporary form', '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          return;
        }
      } else {
        const new_data = {lusr:"ff63809",status:266}
        var payload = {
          ...this.bankDetailsForm.value,...new_data,
          identityModel: this.tempSubmittedData
        }
        console.log(payload)
        let res:any = await this._cs.getCommonFunction('InsertBankConfig', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/wilful-defaulter-blacklist-browse'])
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

}
