import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import Swal from 'sweetalert2';
import { MiscellaneousDropDownPipe } from "../../../../pipes/miscellaneousDropDown";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sla-defination-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MiscellaneousDropDownPipe],
  templateUrl: './sla-defination-form.component.html',
  styleUrl: './sla-defination-form.component.scss'
})
export class SlaDefinationFormComponent {
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
  StageName: any = [];
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;
  totalTiming:any;
  Product:any;

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
      stage: ['', Validators.required],
      isActualSLAtrackingRequired: [''],
      slAtiming: ['']
    });

    this.tempForm.get('isActualSLAtrackingRequired')?.valueChanges.subscribe((isChecked: boolean) => {
      const slAtimingControl = this.tempForm.get('slAtiming');
      if (isChecked) {
        // If checked, add the required validator to slAtiming
        slAtimingControl?.setValidators([Validators.required]);
      } else {
        // If not checked, remove the required validator from slAtiming
        slAtimingControl?.clearValidators();
      }
      // Update the validity of the control
      slAtimingControl?.updateValueAndValidity();
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
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,productId,StageName,Product"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.CustomerType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.StageName=res.data.StageName;
      this.Product=res.data.Product;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.CustomerType=[];
      this.StageName=[];
      this.Product=[];
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
    let res:any = await this._cs.getCommonFunction('GetByIdSLAdefinationConfigurationMaster' ,payload);
    if(res.statusCode == 200){
      this.parentForm = this._fb.group({
        customerCategory : [{value:res.dataTable.customerCategory,disabled:this.isDisabled}, Validators.required],
        customerType : [{value:res.dataTable.customerType,disabled:this.isDisabled}, Validators.required],
        loanType : [{value:res.dataTable.loanType,disabled:this.isDisabled}, Validators.required],
        productId : [{value:res.dataTable.productId,disabled:this.isDisabled}, Validators.required]
        
      });
      this.tempData = res.dataTable.tempGrid;
      this.addTimes();
    } else {

    }
  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      stage: parseInt(formValue.stage, 10),
      isActualSLAtrackingRequired: parseInt(formValue.isActualSLAtrackingRequired, 10),
      slAtiming: parseInt(formValue.slAtiming, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
      var requiredData:any;
      if(this.tempForm.value.isActualSLAtrackingRequired == 'true'){
        requiredData = 1;
      } else {
        requiredData = 0;
      }
      const formValue: any = {
        ...this.tempForm.value,
        stage: parseInt(this.tempForm.value.stage, 10),
        isActualSLAtrackingRequired: requiredData
      };
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      this.totalTiming = this.addTimes();
      this.tempSubmitButton = false;
      this.tempForm.reset();
      console.log(this.totalTiming)
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
    this.totalTiming = this.addTimes();
  }

  editTempGrid(index:any){
    this.tempFormEdit = true;
    this.editing_index = index;
    this.tempForm = this._fb.group({
      stage: [this.tempData[index].stage, Validators.required],
      isActualSLAtrackingRequired: [this.tempData[index].isActualSLAtrackingRequired],
      slAtiming: [this.tempData[index].slAtiming, Validators.required]
    });
    
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
      const formValue: any = {
        ...this.tempForm.value,
        stage: parseInt(this.tempForm.value.stage, 10)
      };
      const data:any =  {...staticData,...formValue};
      this.tempData[this.editing_index] = data;
      this.totalTiming = this.addTimes();
      this.tempSubmitButton = false;
      this.tempFormEdit = false;
      this.editing_index = '';
      this.tempForm.reset();
    }
  }

  addTimes(): string {
    let totalMinutes = 0;
    this.tempData.forEach((item: any) => {
      const slAtiming = item.slAtiming;
      if (slAtiming) {
        const [hours, minutes] = slAtiming.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
      }
    });
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return `${totalHours}:${remainingMinutes.toString().padStart(2, '0')} Hr`;
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
          const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
          const formValue: any = {
            ...this.tempForm.value,
            stage: parseInt(this.tempForm.value.stage, 10)
          };
          const data:any =  {...staticData,...formValue};
          this.tempData.push(data);
          this.totalTiming = this.addTimes();
          this.tempSubmitButton = false;
          this.tempForm.reset();
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
          lusr:'MF59678',
          tempGrid: this.tempData
        }
        console.log(payload)
        var res:any;
        if(this.isEditMode){
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction('UpdateSLAdefinationConfigurationMaster', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertSLAdefinationConfigurationMaster', payload);
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
}
