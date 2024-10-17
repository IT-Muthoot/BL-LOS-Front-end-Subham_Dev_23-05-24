import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RadService } from '../../../../../services/rad/rad.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonServiceService } from '../../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../../pipes/miscellaneousDropDown';

@Component({
  selector: 'app-rad-view-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MiscellaneousDropDownPipe],
  templateUrl: './rad-view-form.component.html',
  styleUrl: './rad-view-form.component.scss'
})
export class RadViewFormComponent {

  radSubmitForm:any;
  tempForm:any;
  finalSubmit:boolean = false;
  tempSubmitButton: boolean = false;
  tempData:any = [];
  ratioTypeDropDown:any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  retrivedData:any;
  masterId:any;
  ratioType:any;
  ratioSubType:any;
  isDisabled:boolean = false;
  tempGridDataEditing:boolean = false;
  temp_grid_editing_index:any;
  warningMessage: boolean = false;
  IndustryDropDown:any = []

  constructor(private fb:FormBuilder, private rad:RadService, private _snackBar: MatSnackBar, private _route:Router, private _activatedRouter:ActivatedRoute, private _cs:CommonServiceService){}

  ngOnInit(){

    this.retrivedData = this._activatedRouter.params.subscribe(params => {
      this.masterId = params['id'];
    });
    this.getViewData()
    this.isDisabled=true
    this.radSubmitForm = this.fb.group({
      ratioType: ['', Validators.required],
      ratioSubtype: ['', Validators.required],
    });

    this.tempForm = this.fb.group({
      lowRisk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      highRisk: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      industryType: ['', [Validators.required]],
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "Ratio Type,InteranlCreaditScoreIndustryCategory"};
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.ratioTypeDropDown=res.data.CustomerCategory;
      this.IndustryDropDown=res.data.InteranlCreaditScoreIndustryCategory;
    }else{
      this.ratioTypeDropDown=[];
      this.IndustryDropDown=[];
    }

  }

  async getViewData(){
    const payload = {
      id: parseInt(this.masterId),
      cid: 1
    }
    let res:any = await this.rad.ratioAnalysisScoreGetById(payload);
    if(res.statusCode == 200){
      this.ratioType = res.data.ratioType;
      this.ratioSubType = res.data.ratioSubType;
      this.radSubmitForm = this.fb.group({
        ratioType: [{value:this.ratioType, disabled: this.isDisabled}, Validators.required],
        ratioSubtype: [{value:this.ratioSubType, disabled: this.isDisabled}, Validators.required],
      });
      this.tempForm = this.fb.group({
        lowRisk: [{value:'', disabled: this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
        highRisk: [{value:'', disabled: this.isDisabled}, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
        industryType: [{value:'', disabled: this.isDisabled}, [Validators.required]],
      });

      this.tempData = this.transformData(res.data.tempGrid);
      console.log("data", this.tempData)
    } else {
      const message = res.message;
      this._snackBar.open(message, '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
  }

  transformData(data: any[]): any[] {
    const flattenedData = data.flat();
    return flattenedData.map(item => {
      return {
        id: item.id,
        cid: item.cid,
        ratioAnalysisScoreId: item.ratioAnalysisScoreId,
        lowRisk: item.lowRisk,
        highRisk: item.highRisk,
        industryType: item.industryType
      };
    });
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
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
      console.log("Child table inserted", this.tempData);
      this.tempSubmitButton = false;
      this.tempForm.reset();
    }
  }

  
  editTempGridData(index:number){
    this.tempGridDataEditing = true;
    this.temp_grid_editing_index = index;
    this.tempForm = this.fb.group({
      lowRisk: [this.tempData[index].lowRisk, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      highRisk: [this.tempData[index].highRisk, [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      industryType: [this.tempData[index].industryType, [Validators.required]],
    });
  }

  tempEditSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      if(this.tempData[this.temp_grid_editing_index].id){
        var staticData:any = { "cid": 1,"detailStatus":1, "id":this.tempData[this.temp_grid_editing_index].id};
      } else {
        var staticData:any = { "cid": 1,"detailStatus":1};
      }
      
      const formValue:any = this.convertValuesToInteger(this.tempForm.value);
      const data:any =  {...staticData,...formValue};
      this.tempData[this.temp_grid_editing_index] = data;
      this.tempSubmitButton = false;
      this.tempGridDataEditing = false;
      this.temp_grid_editing_index = '';
      this.tempForm.reset();
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
  }


  async finalSubmitForm(){
    this.finalSubmit = true;
    if(this.finalSubmit && this.radSubmitForm.invalid  && (this.tempForm.invalid || this.tempData.length == 0)){
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
          id: parseInt(this.masterId),
          ratioType: parseInt(this.radSubmitForm.value.ratioType),
          ratioSubType: parseInt(this.radSubmitForm.value.ratioSubtype),
          status: 1,
          tempGrid: this.tempData
        }
        let res:any = await this.rad.ratioAnalysisScoreUpdate(payload);
        if(res.statusCode == 200){
          this._snackBar.open('Data updated successfully!', '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._route.navigate(['/rad-configuration-1-list'])
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
