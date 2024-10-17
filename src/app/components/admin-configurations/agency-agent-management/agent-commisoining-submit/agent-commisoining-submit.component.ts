import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import Swal from 'sweetalert2';
import { MiscellaneousDropDownPipe } from "../../../../pipes/miscellaneousDropDown";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-commisoining-submit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MiscellaneousDropDownPipe],
  templateUrl: './agent-commisoining-submit.component.html',
  styleUrl: './agent-commisoining-submit.component.scss'
})
export class AgentCommisoiningSubmitComponent {
  AgentCommissionActivityType:any;
  CommissionType:any;
  PayoutFrequency:any;
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
      agencyId : ['', Validators.required],
      agencyName : ['', Validators.required],
      payoutFrequency : ['', Validators.required]
    });

    this.tempForm = this._fb.group({
      activityType: ['', Validators.required],
      fromLoanAmount: ['', Validators.required],
      toLoanAmount: ['', Validators.required],
      commissionType: ['', Validators.required],
      value: ['', Validators.required]
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
      Cdval: "PayoutFrequency,CommissionType,AgentCommissionActivityType"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.PayoutFrequency=res.data.PayoutFrequency;
      this.CommissionType=res.data.CommissionType;
      this.AgentCommissionActivityType=res.data.AgentCommissionActivityType;
    }else{
      this.PayoutFrequency=[];
      this.CommissionType=[];
      this.AgentCommissionActivityType=[];
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
    let res:any = await this._cs.getCommonFunction('GetByIdAgentCommissionMaster' ,payload);
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        agencyId : [{value:res.data[0].agencyId,disabled:this.isDisabled}, Validators.required],
        agencyName : [{value:res.data[0].agencyName,disabled:this.isDisabled}, Validators.required],
        payoutFrequency : [{value:res.data[0].payoutFrequency,disabled:this.isDisabled}, Validators.required]
      });
      this.tempData = res.data.tempGrid;
    } else {
       this._router.navigate(['/agent-commision-management-browse'])
    }
  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      activityType: parseInt(formValue.activityType, 10),
      fromLoanAmount: parseInt(formValue.fromLoanAmount, 10),
      toLoanAmount: parseInt(formValue.toLoanAmount, 10),
      commissionType: parseInt(formValue.commissionType, 10),
      value: parseInt(formValue.value, 10)
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
      activityType: [this.tempData[index].activityType, Validators.required],
      fromLoanAmount: [this.tempData[index].fromLoanAmount, Validators.required],
      toLoanAmount: [this.tempData[index].toLoanAmount, Validators.required],
      commissionType: [this.tempData[index].commissionType, Validators.required],
      value: [this.tempData[index].value, Validators.required]
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
          this.tempSubmit();
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
          agencyId: parseInt(this.parentForm.value.agencyId),
          agencyName: parseInt(this.parentForm.value.agencyName),
          payoutFrequency: parseInt(this.parentForm.value.payoutFrequency),
          status: 266,
          tempGrid: this.tempData
        }
        var res:any;
        if(this.isEditMode){
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction('UpdateAgentCommissionMaster', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertAgentCommissionMaster', payload);
        }
        // let res:any = await this._cs.getCommonFunction('InsertDigitalKycCheckConfigurationMaster', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/agent-commision-management-browse'])
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
