import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RadService } from '../../../../../services/rad/rad.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../../../../services/common-service.service';

@Component({
  selector: 'app-rad-configuration-submit-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rad-configuration-submit-form.component.html',
  styleUrl: './rad-configuration-submit-form.component.scss'
})
export class RadConfigurationSubmitFormComponent {
  radSubmitForm:any;
  tempForm:any;
  finalSubmit:boolean = false;
  tempSubmitButton: boolean = false;
  tempData:any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  IndustryDropDown:any = []

  constructor(private fb:FormBuilder, private rad:RadService, private _snackBar: MatSnackBar, private _route:Router, private _cs:CommonServiceService){}

  ngOnInit(){
    this.getMiscellaneous();
    this.radSubmitForm = this.fb.group({
      ratioType: ['', Validators.required],
      ratioSubtype: ['', Validators.required],
    });

    this.tempForm = this.fb.group({
      lowRisk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      highRisk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      industryType: ['', [Validators.required]],
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "InteranlCreaditScoreIndustryCategory"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.IndustryDropDown=res.data.InteranlCreaditScoreIndustryCategory;
    }else{
      this.IndustryDropDown=[];
    }

  }

  private convertValuesToInteger(formValue: any) {
    return {
      lowRisk: parseInt(formValue.lowRisk, 10),
      highRisk: parseInt(formValue.highRisk, 10),
      industryType: parseInt(formValue.industryType, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { "cid": 1,"detailStatus":1};
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      this.tempSubmitButton = false;
      this.tempForm.reset();
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
  }

  async finalSubmitForm(){
    this.finalSubmit = true;
    if(this.finalSubmit && this.radSubmitForm.invalid  ){
      return;
    } else {
      var payload = {
        cid: 1,
        ratioType: parseInt(this.radSubmitForm.value.ratioType),
        ratioSubType: parseInt(this.radSubmitForm.value.ratioSubtype),
        status: 1,
        tempGrid: this.tempData
      }
      let res:any = await this.rad.ratioAnalysisScoreSubmit(payload);
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._route.navigate(['/rad-configuration-1-list'])
      } else {
      }
    }
  }
}
