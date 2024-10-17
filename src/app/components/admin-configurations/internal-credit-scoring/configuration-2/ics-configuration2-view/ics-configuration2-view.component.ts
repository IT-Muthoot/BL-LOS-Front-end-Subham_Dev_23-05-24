import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../../pipes/miscellaneousDropDown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ics-configuration2-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MiscellaneousDropDownPipe],
  templateUrl: './ics-configuration2-view.component.html',
  styleUrl: './ics-configuration2-view.component.scss'
})
export class IcsConfiguration2ViewComponent {

  CustomerCategoryDropDown: any = [];
  criteriaDropDown: any = [];
  parentForm:any
  tempForm: any;
  tempSubmitButton: boolean = false;
  tempData: any = [];
  editing_index: any;
  tempFormEdit: boolean = false;
  finalSubmitted: boolean = false;
  warningMessage: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  industryCategory: any;
  totalScore = 0;
  AllowedLoanTypeDropDown: any = [];
  CustomerTypeDropDown: any = [];
  SourceOfDataDropDown: any = [];
  retrivedData: any;
  masterId:any;
  isDisabled:boolean = false;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private _activatedRouter:ActivatedRoute){}

  ngOnInit(){
    this.retrivedData = this._activatedRouter.params.subscribe(params => {
      this.masterId = params['id'];
    });
    this.isDisabled = true;
    this.getViewData()
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      customer_type : ['', Validators.required],
      loan_type : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      productId : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
    });

    this.tempForm = this._fb.group({
      criteria: ['', [Validators.required]],
      weightage: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
      sourceOfData: ['', Validators.required]
    });
  }

  async getViewData(){
    const payload = {
      id: parseInt(this.masterId),
      cid: 1
    }
    let res:any = await this._cs.getCommonFunction('GetByIdInternalCreditScoringTwo', payload);
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        customer_Category : [{value:res.data[0].customerCategory, disabled:this.isDisabled}, Validators.required],
        customer_type : [{value:res.data[0].customerType, disabled:this.isDisabled}, Validators.required],
        loan_type : [{value:res.data[0].loanType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
        productId : [{value:res.data[0].productId, disabled:this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]]
      });
      this.tempData = res.data[0].internalCreditScoreWeightageMasterCategory;
    }
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,InteranlCreaditScoreCriteria,InteranlCreaditScoreIndustryCategory,CustomerType,AllowedLoanType,SourceOfData"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategoryDropDown=res.data.CustomerCategory;
      this.criteriaDropDown=res.data.InteranlCreaditScoreCriteria;
      this.industryCategory=res.data.InteranlCreaditScoreIndustryCategory;
      this.AllowedLoanTypeDropDown=res.data.AllowedLoanType;
      this.CustomerTypeDropDown=res.data.CustomerType;
      this.SourceOfDataDropDown=res.data.SourceOfData;
    }else{
      this.CustomerCategoryDropDown=[];
      this.criteriaDropDown=[];
      this.industryCategory=[];
      this.AllowedLoanTypeDropDown=[];
      this.CustomerTypeDropDown=[];
      this.SourceOfDataDropDown=[];
    }

  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      criteria: parseInt(formValue.criteria, 10),
      weightageInPercentage: parseInt(formValue.weightage, 10),
      sourceOfData: parseInt(formValue.sourceOfData, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { "cid": 1,"status":1, lusr: "MF58957"};
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      
      // this.totalScore += parseInt(this.tempData[this.tempData.length - 1].Score);
      // if(this.totalScore >= 300){
      //   this.warningMessage = true;
      //   this.totalScore -= parseInt(this.tempData[this.tempData.length - 1].Score);
      //   this.tempData.splice(this.tempData.length - 1, 1);
      //   return;
      // }
      this.tempSubmitButton = false;
      this.tempForm.reset();
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
  }

  editTempGrid(index:any){
    this.tempFormEdit = true;
    this.editing_index = index;
    this.tempForm = this._fb.group({
      criteria: [this.tempData[index].criteria, [Validators.required]],
      weightage: [this.tempData[index].weightageInPercentage, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      sourceOfData: [this.tempData[index].sourceOfData, [Validators.required]]
    });
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1, lusr: "MF58957"};
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData[this.editing_index] = data;
      this.tempSubmitButton = false;
      this.tempFormEdit = false;
      this.editing_index = '';
      this.tempForm.reset();
    }
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid  && (this.tempForm.invalid || this.tempData.length == 0)){
      if(this.tempForm.invalid && this.tempData.length == 0){
        this.warningMessage = true;
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
        if(this.tempForm.valid){
          const formValue:any = this.convertValuesToInteger(this.tempForm.value);
          const staticData:any = { "cid": 1,"status":1};
          const data:any =  {...staticData,...formValue};
          this.tempData.push(data);
        } else {
          this.warningMessage = true;
          this._snackBar.open('Please add data to temporary form', '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          return;
        }
      } else {
        var payload = {
          cid: 1,
          customerCategory: parseInt(this.parentForm.value.customer_Category),
          customerType: parseInt(this.parentForm.value.customer_type),
          loanType: parseInt(this.parentForm.value.loan_type),
          productId: parseInt(this.parentForm.value.productId),
          status: 1,
          lusr: "MF58957",
          id:this.masterId,
          internalCreditScoreWeightageMasterCategory: this.tempData
        }
        let res:any = await this._cs.getCommonFunction('UpdateInternalCreditScoringTwo', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/ics-configuration-2-browse'])
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



