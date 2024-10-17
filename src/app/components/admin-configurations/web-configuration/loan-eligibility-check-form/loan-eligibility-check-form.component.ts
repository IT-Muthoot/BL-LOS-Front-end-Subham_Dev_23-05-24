import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonServiceService } from '../../../../services/common-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router } from '@angular/router';
import { CreditCommitteeService } from '../../../../services/credit-committee/credit-committee.service';

@Component({
  selector: 'app-loan-eligibility-check-form',
  standalone: true,
  imports: [MatTabsModule, ReactiveFormsModule],
  templateUrl: './loan-eligibility-check-form.component.html',
  styleUrl: './loan-eligibility-check-form.component.scss'
})
export class LoanEligibilityCheckFormComponent {
  CustomerCategory: any;
  businessType: any;
  loanType: any;
  parentForm:any
  basicDetailCheckForm: any;
  creditBureauCheckForm: any;
  taxFilingCheckForm: any;
  creditBureauCheckReportForm: any;
  negativePincodeForm: any;
  tempSubmitButton: boolean = false;
  tempData: any = [];
  Product: any = [];
  editing_index: any;
  tempFormEdit: boolean = false;
  finalSubmitted: boolean = false;
  warningMessage: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private _cc:CreditCommitteeService){}

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      businessType : ['', Validators.required],
      loanType : ['', Validators.required],
      productId : ['', Validators.required],
    });

    this.basicDetailCheckForm = this._fb.group({
      isAgeRequired: ['', Validators.required],
      isBusinessVintageCheck: ['', Validators.required],
      isMSMEregistrationCheck: ['', Validators.required],
      minClientAge: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      maxClientAge: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      minBusinessVintage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      maxBusinessVintage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    });

    this.taxFilingCheckForm = this._fb.group({
      isITRfilingBusinessCompliance: ['', Validators.required],
      isITRfilingApplicantCompliance: ['', Validators.required],
      isGSTcheck: ['', Validators.required],
      minLoanAmountAllowed: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      maxLoanAmountAllowed: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      minGSTReturn: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });

    this.creditBureauCheckForm = this._fb.group({
      isCibilRequired: ['', Validators.required],
      isEquifaxRequired: ['', Validators.required],
      isHighMarkRequired: ['', Validators.required],
      isExperianRequired: ['', Validators.required],
      cibilApplicantMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      cibilDirectorMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      cibilMaxCMRRankAllowed: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      equifaxApplicantMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      equifaxDirectorMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      equifaxMinBusinessCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      highMarkApplicantMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      highMarkDirectorMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      highMarkMinBusinessCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      experianApplicantMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      experianDirectorMinCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      experianMinBusinessCreditScore: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]]
    });

    this.creditBureauCheckReportForm = this._fb.group({
      isOverdueAccountCheck: ['', Validators.required],
      isCreditInquiryCheck: ['', Validators.required],
      isLoanStatusCheck: ['', Validators.required],
      isOtherLoanStatusCheck: ['', Validators.required],
      maxOverdueAllowedAllow: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      statMaxAllowedCreditInquiryus: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      loanStatusCheck: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      otherStatusCheck: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    });

    this.negativePincodeForm = this._fb.group({
      negativePincode:['', Validators.required]
    })

    this.subscribeToRadioChange(this.creditBureauCheckForm, 'isCibilRequired', ['cibilApplicantMinCreditScore', 'cibilDirectorMinCreditScore', 'cibilMaxCMRRankAllowed']);
    this.subscribeToRadioChange(this.creditBureauCheckForm, 'isEquifaxRequired', ['equifaxApplicantMinCreditScore', 'equifaxDirectorMinCreditScore', 'equifaxMinBusinessCreditScore']);
    this.subscribeToRadioChange(this.creditBureauCheckForm, 'isHighMarkRequired', ['highMarkApplicantMinCreditScore', 'highMarkDirectorMinCreditScore', 'highMarkMinBusinessCreditScore']);
    this.subscribeToRadioChange(this.creditBureauCheckForm, 'isExperianRequired', ['experianApplicantMinCreditScore', 'experianDirectorMinCreditScore', 'experianMinBusinessCreditScore']);
    this.subscribeToRadioChange(this.basicDetailCheckForm,'isAgeRequired', ['minClientAge', 'maxClientAge']);
    this.subscribeToRadioChange(this.basicDetailCheckForm,'isBusinessVintageCheck', ['minBusinessVintage', 'maxBusinessVintage']);
    this.subscribeToRadioChange(this.taxFilingCheckForm,'isGSTcheck', ['minGSTReturn']);
    this.subscribeToRadioChange(this.creditBureauCheckReportForm,'isOverdueAccountCheck', ['maxOverdueAllowedAllow']);
    this.subscribeToRadioChange(this.creditBureauCheckReportForm,'isCreditInquiryCheck', ['statMaxAllowedCreditInquiryus']);
    this.subscribeToRadioChange(this.creditBureauCheckReportForm,'isLoanStatusCheck', ['loanStatusCheck']);
    this.subscribeToRadioChange(this.creditBureauCheckReportForm,'isOtherLoanStatusCheck', ['otherStatusCheck']);
  }

  subscribeToRadioChange(formName:FormGroup, controlName: string, dependentFields: string[]) {
    formName.get(controlName)?.valueChanges.subscribe((value: string) => {
      if (value === '0') {
        dependentFields.forEach(field => formName.get(field)?.disable());
      } else if (value === '1') {
        dependentFields.forEach(field => formName.get(field)?.enable());
      }
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,BusinessType,AllowedLoanType,Product"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.businessType=res.data.BusinessType;
      this.loanType=res.data.AllowedLoanType;
      this.Product=res.data.Product;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.businessType=[];
      this.Product=[];
    }
  }

  convertToNumber(value: any): any {
    if (typeof value === 'string') {
      // Check if the string is a valid number
      const parsedValue = parseFloat(value.replace(/,/g, '')); // Remove commas and parse as float
      return isNaN(parsedValue) ? value : parsedValue;
    } else if (Array.isArray(value)) {
      // If the value is an array, recursively convert each item
      return value.map(item => this.convertToNumber(item));
    } else if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively convert each property
      return Object.keys(value).reduce((acc:any, key) => {
        acc[key] = this.convertToNumber(value[key]);
        return acc;
      }, {});
    }
    // Return the value as is if it's neither a string, array, nor object
    return value;
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid && this.basicDetailCheckForm.invalid && this.creditBureauCheckForm.invalid && this.creditBureauCheckReportForm.invalid && this.negativePincodeForm.invalid && this.taxFilingCheckForm.invalid){
      if(this.basicDetailCheckForm.invalid && this.creditBureauCheckForm.invalid && this.creditBureauCheckReportForm.invalid && this.negativePincodeForm.invalid && this.taxFilingCheckForm.invalid){
        this._snackBar.open('One tab data donnot have valid data, Please check', '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
      return;
    } else {
      this.basicDetailCheckForm.patchValue({
        cid: 1,
        status: 1,
        lusr: 'MF58957'
      });
      this.creditBureauCheckForm.patchValue({
        cid: 1,
        status: 1,
        lusr: 'MF58957'
      });
      this.creditBureauCheckReportForm.patchValue({
        cid: 1,
        status: 1,
        lusr: 'MF58957'
      });
      this.taxFilingCheckForm.patchValue({
        cid: 1,
        status: 1,
        lusr: 'MF58957'
      });
      var payload = {
        cid: 1,
        customerCategory: parseInt(this.parentForm.value.customer_Category),
        customerType: parseInt(this.parentForm.value.businessType),
        loanType: parseInt(this.parentForm.value.loanType),
        productId: parseInt(this.parentForm.value.productId),
        status: 1,
        lusr:'MF58957',
        objLEbasicdetails: this.basicDetailCheckForm.value,
        objLETaxFilling:this.taxFilingCheckForm.value,
        objLECheckScore:this.creditBureauCheckForm.value,
        objLECheckReports:this.creditBureauCheckReportForm.value,
        objLEPincode:this.negativePincodeForm.value,
      }
      // payload = this.convertToNumber(payload)
      console.log(payload)
      // let res:any = await this._cc.commonAPICall(payload, 'InsertLoanEligibiltyCheckConfigurationMaster');
      // if(res.statusCode == 200){
      //   this._snackBar.open(res.message, '', {
      //     duration: 3000,
      //     panelClass: ['blue-snackbar'],
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition
      //   });
      //   this._router.navigate(['/loan-eligibility-check-list'])
      // } else {
      //   this._snackBar.open(res.message, '', {
      //     duration: 3000,
      //     panelClass: ['blue-snackbar'],
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition
      //   });
      // }
    }
  }
}

