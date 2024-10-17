import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { CommonServiceService } from '../../../../../services/common-service.service';

@Component({
  selector: 'app-rad-configuration2-submit-form',
  standalone: true,
  imports: [MatTabsModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './rad-configuration2-submit-form.component.html',
  styleUrl: './rad-configuration2-submit-form.component.scss'
})
export class RadConfiguration2SubmitFormComponent {

  parentForm:any;
  ratioTypeWeightage:any;
  ratioSubTypeWeightageTemp:any;
  tempGridSubmitted:boolean = false;
  tempData:any = []
  finalSubmitted:boolean = false;
  warningMessage:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  tempFormEdit:boolean = false;
  editing_index:any;
  CustomerCategoryDropDown: any = [];
  CustomerTypeDropDown: any = [];
  AllowedLoanTypeDropDown: any = [];

  constructor(private fb:FormBuilder, private _snackBar: MatSnackBar, private _cs:CommonServiceService){}

  ngOnInit(){
    this.parentForm = this.fb.group({
      customerCategory:['', [Validators.required, Validators.minLength(3)]],
      customerType:['', [Validators.required, Validators.minLength(3)]],
      productId:['', [Validators.required, Validators.minLength(3)]],
      industryType:['', [Validators.required, Validators.minLength(3)]],
      loanType:['', [Validators.required, Validators.minLength(3)]],
    });
    this.ratioTypeWeightage = this.fb.group({
      probabilityRatio1:['', [Validators.required, Validators.minLength(3)]],
      ratioTypeWeightage1:['', [Validators.required, Validators.minLength(3)]],
      probabilityRatio2:['', [Validators.required, Validators.minLength(3)]],
      ratioTypeWeightage2:['', [Validators.required, Validators.minLength(3)]],
    });
    this.ratioSubTypeWeightageTemp = this.fb.group({
      ratioType:['', Validators.required],
      ratioTypeWeightage:['', Validators.required],
      ratioSubType:['', Validators.required],
      ratioSubTypeWeightage:['', Validators.required],
      sourceOfData:['', Validators.required]
    });
    this.getMiscellaneous();
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType"};
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategoryDropDown=res.data.CustomerCategory;
      this.CustomerTypeDropDown=res.data.CustomerCategory;
      this.AllowedLoanTypeDropDown=res.data.CustomerCategory;
    }else{
      this.CustomerCategoryDropDown= [];
      this.CustomerTypeDropDown= [];
      this.AllowedLoanTypeDropDown= [];
    }

  }

  private convertValuesToInteger(formValue: any) {
    return {
      ratioSubType: parseInt(formValue.ratioSubType, 10),
      ratioType: parseInt(formValue.ratioType, 10),
      ratioTypeWeightage: parseInt(formValue.ratioTypeWeightage, 10),
      sourceOfData: parseInt(formValue.sourceOfData, 10),
      ratioSubTypeWeightage: parseInt(formValue.ratioSubTypeWeightage, 10),
    };
  }

  tempGridSubmit(){
    this.tempGridSubmitted = true;
    if(this.tempGridSubmitted && this.ratioSubTypeWeightageTemp.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1};
      const formValue:any = this.convertValuesToInteger(this.ratioSubTypeWeightageTemp.value);
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      console.log(this.tempData.length);
      console.log(this.tempData);
      this.tempGridSubmitted = false;
      this.ratioSubTypeWeightageTemp.reset();
    }
  }

  editTempGrid(index:any){
    this.tempFormEdit = true;
    this.editing_index = index;
    this.ratioSubTypeWeightageTemp = this.fb.group({
      ratioType:[this.tempData[index].ratioType, Validators.required],
      ratioTypeWeightage:[this.tempData[index].ratioTypeWeightage, Validators.required],
      ratioSubType:[this.tempData[index].ratioSubType, Validators.required],
      ratioSubTypeWeightage:[this.tempData[index].ratioSubTypeWeightage, Validators.required],
      sourceOfData:[this.tempData[index].sourceOfData, Validators.required]
    })
  }

  tempGridUpdate(){
    if(this.tempGridSubmitted && this.ratioSubTypeWeightageTemp.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1};
      const formValue:any = this.convertValuesToInteger(this.ratioSubTypeWeightageTemp.value);
      const data:any =  {...staticData,...formValue};
      this.tempData[this.editing_index] = data;
      this.tempGridSubmitted = false;
      this.tempFormEdit = false;
      this.editing_index = '';
      this.ratioSubTypeWeightageTemp.reset();
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
  }

  finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid && this.ratioTypeWeightage.invalid && (this.ratioSubTypeWeightageTemp.invalid || this.tempData.length == 0)){
      if(this.ratioSubTypeWeightageTemp.invalid || this.tempData.length == 0){
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
      const paylod = {
        
      }
    }
  }

}
