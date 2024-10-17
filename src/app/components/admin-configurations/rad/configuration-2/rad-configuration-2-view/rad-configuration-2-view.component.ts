import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, ActivatedRoute, RouterLinkActive } from '@angular/router';
import { RadService } from '../../../../../services/rad/rad.service';

@Component({
  selector: 'app-rad-configuration-2-view',
  standalone: true,
  imports: [MatTabsModule, FormsModule, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './rad-configuration-2-view.component.html',
  styleUrl: './rad-configuration-2-view.component.scss'
})
export class RadConfiguration2ViewComponent {

  parentForm:any;
  ratioTypeWeightage:any;
  ratioSubTypeWeightageTemp:any;
  tempGridSubmitted:boolean = false;
  tempData:any = []
  finalSubmitted:boolean = false;
  warningMessage:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDisabled:boolean = false;
  retrivedData: any;
  masterId:any;

  constructor(private fb:FormBuilder, private _snackBar: MatSnackBar, private _activatedRouter:ActivatedRoute, private rad:RadService){}

  ngOnInit(){
    this.retrivedData = this._activatedRouter.params.subscribe(params => {
      this.masterId = params['id'];
    });
    this.getViewData()
    this.isDisabled=true
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
    })
  }

  async getViewData(){
    const payload = {
      id: parseInt(this.masterId),
      cid: 1
    }
    let res:any = await this.rad.ratioAnalysisWeightageGetById(payload);
    if(res.statusCode == 200){
      this.parentForm = this.fb.group({
        customerCategory:[{value:res.data.customerCategory, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        customerType:[{value:res.data.customerType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        productId:[{value:res.data.productId, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        industryType:[{value:res.data.industryType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
        loanType:[{value:res.data.loanType, disabled:this.isDisabled}, [Validators.required, Validators.minLength(3)]],
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
      })

      // this.tempData = this.transformData(res.data[0].tempGrid);
      console.log("data", this.tempData)
    }
  }

  editForm(){
    this.isDisabled = false;
    this.getViewData();
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
      }
      return;
    } else {

    }
  }
}
