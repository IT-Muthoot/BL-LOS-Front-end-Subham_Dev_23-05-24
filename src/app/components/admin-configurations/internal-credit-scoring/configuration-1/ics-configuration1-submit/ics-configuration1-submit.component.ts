import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router } from '@angular/router';
import { CommonServiceService } from '../../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../../pipes/miscellaneousDropDown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ics-configuration1-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MiscellaneousDropDownPipe],
  templateUrl: './ics-configuration1-submit.component.html',
  styleUrl: './ics-configuration1-submit.component.scss'
})
export class IcsConfiguration1SubmitComponent {
  CustomerCategory: any;
  criteria: any;
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

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router){}

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      criteria : ['', Validators.required],
      min_score : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      max_score : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]],
      description : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });

    this.tempForm = this._fb.group({
      score: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]],
      industry_type: ['', Validators.required]
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,InteranlCreaditScoreCriteria,InteranlCreaditScoreIndustryCategory"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.criteria=res.data.InteranlCreaditScoreCriteria;
      this.industryCategory=res.data.InteranlCreaditScoreIndustryCategory;
    }else{
      this.CustomerCategory=[];
      this.criteria=[];
      this.industryCategory=[];
    }

  }
  
  private convertValuesToInteger(formValue: any) {
    return {
      Score: parseInt(formValue.score, 10),
      IndustryCategory: parseInt(formValue.industry_type, 10)
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
      
      this.totalScore += parseInt(this.tempData[this.tempData.length - 1].Score);
      console.log(this.tempData[this.tempData.length - 1].Score)
      console.log(this.totalScore)
      if(this.totalScore >= 300){
        this.warningMessage = true;
        this.totalScore -= parseInt(this.tempData[this.tempData.length - 1].Score);
        this.tempData.splice(this.tempData.length - 1, 1);
        console.log("Data", this.tempData, this.totalScore)
        return;
      }
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
      score: [this.tempData[index].score, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      industry_type: [this.tempData[index].industry_Type, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
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

  async finalSubmit(){
    this.finalSubmitted = true;
    console.log(this.parentForm);
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
          CustomerCategory: parseInt(this.parentForm.value.customer_Category),
          Criteria: parseInt(this.parentForm.value.criteria),
          MinScore: parseInt(this.parentForm.value.min_score),
          MaxScore: parseInt(this.parentForm.value.max_score),
          Description: this.parentForm.value.description,
          status: 1,
          CreditScoreMasterCategory: this.tempData
        }
        let res:any = await this._cs.getCommonFunction('InsertInternalCreditScoringOne', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/ics-configurtion-1-browse'])
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

