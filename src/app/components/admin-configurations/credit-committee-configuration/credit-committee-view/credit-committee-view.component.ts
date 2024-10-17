import { Component } from '@angular/core';
import { CommonServiceService } from '../../../../services/common-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CreditCommitteeService } from '../../../../services/credit-committee/credit-committee.service';

@Component({
  selector: 'app-credit-committee-view',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './credit-committee-view.component.html',
  styleUrl: './credit-committee-view.component.scss'
})
export class CreditCommitteeViewComponent {
  CustomerCategory: any;
  CustomerType: any;
  loanType: any;
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
  isDisabled:boolean = false;
  retrivedData: any;
  masterId:any;
  Product:any;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private _cc:CreditCommitteeService, private _activatedRouter:ActivatedRoute){}

  ngOnInit(){
    this.retrivedData = this._activatedRouter.params.subscribe(params => {
      this.masterId = params['id'];
    });
    this.isDisabled = true;
    this.getViewData()
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      customerType : ['', Validators.required],
      loanType : ['', Validators.required],
      productId : ['', Validators.required],
    });

    this.tempForm = this._fb.group({
      loanFrom: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      loanTo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      credit_committee_user_group: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
    });
  }

  async getViewData(){
    const payload = {
      id: parseInt(this.masterId),
      cid: 1
    }
    let res:any = await this._cc.commonAPICall(payload, 'GetByIdCreditCommittee');
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        customer_Category:[{value:res.customerCategory, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        customerType:[{value:res.customerType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        productId:[{value:res.productId, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        loanType:[{value:res.loanType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
      });
      this.tempForm = this._fb.group({
        loanFrom: [{value:'', disabled:this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        loanTo: [{value:'', disabled:this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        credit_committee_user_group: [{value:'', disabled:this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      });

      this.tempData = res.getByIdLoanAmount;

      console.log("data", this.tempData)
    }
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,Product"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.CustomerType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.Product=res.data.Product;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.CustomerType=[];
      this.Product=[];
    }

  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      fromLoanAmount: parseInt(formValue.loanFrom, 10),
      toLoanAmount: parseInt(formValue.loanTo, 10),
      assignCreditCommitteeUserGroup: parseInt(formValue.credit_committee_user_group, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { "cid": 1,"status":1};
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      console.log(this.tempData)
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
      loanFrom: [this.tempData[index].fromLoanAmount, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      loanTo: [this.tempData[index].toLoanAmount, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      credit_committee_user_group: [this.tempData[index].assignCreditCommitteeUserGroup, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1};
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData[this.editing_index] = data;
      this.tempSubmitButton = false;
      this.tempFormEdit = false;
      this.editing_index = '';
      this.tempForm.reset();
    }
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  async finalSubmitForm(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid  && (this.tempForm.invalid || this.tempData.length == 0)){
      if(this.tempForm.invalid && this.tempData.length == 0){
        this.warningMessage = true;
        this._snackBar.open('Please add data to ratio subtype weightage!', '', {
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
          console.log(this.tempForm.value)
        }
      } else {
        var payload = {
          cid: 1,
          Id:this.masterId,
          customerCategory: parseInt(this.parentForm.value.customer_Category),
          customerType: parseInt(this.parentForm.value.customerType),
          loanType: parseInt(this.parentForm.value.loanType),
          productId: parseInt(this.parentForm.value.productId),
          status: 1,
          LoanAmountModel: this.tempData
        }
        let res:any = await this._cc.commonAPICall(payload, 'UpdateCreditCommittee');
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/credit-committee-configuration-browse'])
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

