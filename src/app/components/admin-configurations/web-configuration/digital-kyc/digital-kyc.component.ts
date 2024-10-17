import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import Swal from 'sweetalert2';
import { MiscellaneousDropDownPipe } from "../../../../pipes/miscellaneousDropDown";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-digital-kyc',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MiscellaneousDropDownPipe],
  templateUrl: './digital-kyc.component.html',
  styleUrls: ['./digital-kyc.component.scss'],
})
export class DigitalKycComponent implements OnInit {
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
  DigitalKycCheckCriteria: any = [];
  ApiSource: any = [];
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customerCategory : ['', Validators.required],
      customerType : ['', Validators.required],
      loanType : ['', Validators.required],
      productId : ['', Validators.required],
    });

    this.tempForm = this._fb.group({
      digitalKycCheckCriteria: ['', Validators.required],
      apiSource: ['', Validators.required]
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

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,productId,DigitalKycCheckCriteria,ApiSource"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.CustomerType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.DigitalKycCheckCriteria=res.data.DigitalKycCheckCriteria;
      this.ApiSource=res.data.ApiSource;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.CustomerType=[];
      this.DigitalKycCheckCriteria=[];
      this.ApiSource=[];
    }
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  async getViewData(){
    let payload:any = {
      id: this.masterId,
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('GetByIdDigitalKycCheckConfigurationMaster' ,payload);
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        customerCategory : [{value:res.data.customerCategory,disabled:this.isDisabled}, Validators.required],
        customerType : [{value:res.data.customerType,disabled:this.isDisabled}, Validators.required],
        loanType : [{value:res.data.loanType,disabled:this.isDisabled}, Validators.required],
        productId : [{value:res.data.productId,disabled:this.isDisabled}, Validators.required],
      });
      this.tempData = res.data.tempGrid;
    } else {

    }
  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      digitalKycCheckCriteria: parseInt(formValue.digitalKycCheckCriteria, 10),
      apiSource: parseInt(formValue.apiSource, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
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
      digitalKycCheckCriteria: [this.tempData[index].digitalKycCheckCriteria, Validators.required],
      apiSource: [this.tempData[index].apiSource, Validators.required]
    });
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
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
        this._snackBar.open('Please add data to loan amount form', '', {
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
          const staticData:any = { "cid": 1,"status":1,lusr:'MF59678'};
          const data:any =  {...staticData,...formValue};
          this.tempData.push(data);
        } else {
          this._snackBar.open('Please add data to temp form', '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          return;
        }
      } else {
        var payload:any;
        payload = {
          cid: 1,
          customerCategory: parseInt(this.parentForm.value.customerCategory),
          customerType: parseInt(this.parentForm.value.customerType),
          loanType: parseInt(this.parentForm.value.loanType),
          productId: parseInt(this.parentForm.value.productId),
          status: 266,
          tempGrid: this.tempData
        }
        var res:any;
        if(this.isEditMode){
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction('UpdateDigitalKycCheckConfigurationMaster', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertDigitalKycCheckConfigurationMaster', payload);
        }
        // let res:any = await this._cs.getCommonFunction('InsertDigitalKycCheckConfigurationMaster', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/digital-kyc-list'])
        } else {
          console.log(res);
          console.log(res.error.message);
          this._snackBar.open(res.error.message, '', {
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
