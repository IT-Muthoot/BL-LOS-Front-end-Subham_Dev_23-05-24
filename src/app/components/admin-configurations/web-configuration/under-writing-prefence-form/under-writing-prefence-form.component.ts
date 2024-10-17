import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-under-writing-prefence-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MiscellaneousDropDownPipe, RouterLink],
  templateUrl: './under-writing-prefence-form.component.html',
  styleUrl: './under-writing-prefence-form.component.scss'
})
export class UnderWritingPrefenceFormComponent {
  CustomerCategoryDropDown: any = [];
  criteriaDropDown: any = [];
  parentForm:any
  finalSubmitted: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  AllowedLoanTypeDropDown: any = [];
  CustomerTypeDropDown: any = [];
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      customer_type : ['', Validators.required],
      loan_type : ['', Validators.required],
      productId : ['', Validators.required],
      isInternalCreditScore : ['', Validators.required],
      isExternalCreditScoreAndReports : ['', Validators.required],
      isCovenantSelection : ['', Validators.required],
      isLegalAndRiskAnalysis : ['', Validators.required],
      isBusinessAndFinancialAnalysis : ['', Validators.required],
    });

    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.masterId = params['id'];
        this.isEditMode = true;
        this.isDisabled = true;
        this.getViewData();
        
      }
    });
  }

  async getViewData(){
    let payload:any = {
      id: this.masterId,
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('UnderWritingPreferenceGetById' ,payload);
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        customer_Category : [{value:res.data[0].customerCategory, disabled:this.isDisabled}, Validators.required],
        customer_type : [{value:res.data[0].customerType, disabled:this.isDisabled}, Validators.required],
        loan_type : [{value:res.data[0].loanType, disabled:this.isDisabled}, Validators.required],
        productId : [{value:res.data[0].productId, disabled:this.isDisabled}, Validators.required],
        isInternalCreditScore : [{value:res.data[0].isInternalCreditScore.toString(), disabled:this.isDisabled}, Validators.required],
        isExternalCreditScoreAndReports : [{value:res.data[0].isExternalCreditScoreAndReports.toString(), disabled:this.isDisabled}, Validators.required],
        isCovenantSelection : [{value:res.data[0].isCovenantSelection.toString(), disabled:this.isDisabled}, Validators.required],
        isLegalAndRiskAnalysis : [{value:res.data[0].isLegalAndRiskAnalysis.toString(), disabled:this.isDisabled}, Validators.required],
        isBusinessAndFinancialAnalysis : [{value:res.data[0].isBusinessAndFinancialAnalysis.toString(), disabled:this.isDisabled}, Validators.required],
      });
  
    } else {
    }
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategoryDropDown=res.data.CustomerCategory;
      this.AllowedLoanTypeDropDown=res.data.AllowedLoanType;
      this.CustomerTypeDropDown=res.data.CustomerType;
    }else{
      this.CustomerCategoryDropDown=[];
      this.AllowedLoanTypeDropDown=[];
      this.CustomerTypeDropDown=[];
    }

  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid){
      return;
    } else {
      var payload:any;
      payload = {
        cid: 1,
        customerCategory: parseInt(this.parentForm.value.customer_Category),
        customerType: parseInt(this.parentForm.value.customer_type),
        loanType: parseInt(this.parentForm.value.loan_type),
        productId: parseInt(this.parentForm.value.productId),
        isInternalCreditScore: parseInt(this.parentForm.value.isInternalCreditScore),
        isExternalCreditScoreAndReports: parseInt(this.parentForm.value.isExternalCreditScoreAndReports),
        isCovenantSelection: parseInt(this.parentForm.value.isCovenantSelection),
        isLegalAndRiskAnalysis: parseInt(this.parentForm.value.isLegalAndRiskAnalysis),
        isBusinessAndFinancialAnalysis: parseInt(this.parentForm.value.isBusinessAndFinancialAnalysis),
        status: 266,
        lusr: "MF58957",
      }
      var res:any;
      if(this.isEditMode){
        payload['id'] = this.masterId;
        res = await this._cs.getCommonFunction('UnderWritingPreferenceUpdate', payload);
      } else {
        res = await this._cs.getCommonFunction('UnderWritingPreferenceInsert', payload);
      }
      
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/underWriting-Preference'])
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



