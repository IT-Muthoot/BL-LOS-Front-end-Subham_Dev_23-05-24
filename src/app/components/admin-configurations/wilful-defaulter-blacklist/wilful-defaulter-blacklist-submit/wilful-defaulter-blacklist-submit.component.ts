import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wilful-defaulter-blacklist-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MiscellaneousDropDownPipe,RouterLink],
  templateUrl: './wilful-defaulter-blacklist-submit.component.html',
  styleUrl: './wilful-defaulter-blacklist-submit.component.scss'
})
export class WilfulDefaulterBlacklistSubmitComponent {

  parentForm:any
  tempForm: any;
  externalInternalToBankDropDown: any = [];
  keyFieldsDropDown: any = [];
  searchCriteriaDropDown: any = [];
  blacklistSourceDropDown: any = [];
  tempSubmitButton: boolean = false;
  tempData: any = [];
  editing_index: any;
  tempFormEdit: boolean = false;
  finalSubmitted: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isEditMode:boolean = true;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private route:ActivatedRoute){}

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      internalExternalToBank: ['', Validators.required],
      keyFields: ['', Validators.required],
      searchCriteria: ['', Validators.required],
      source: ['', Validators.required],
    });

    this.tempForm = this._fb.group({
      bankNumber: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      branchName: ['', [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      quater: ['', [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      borrower: ['', [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      directorName: ['', [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      registeredAddress: ['', [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]]
    });

    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.isEditMode = true;
        let payload:any = {
          roleId: Number(params['id'])
        };
        let res:any = await this._cs.getCommonFunction('GetByIdWilfulDefaulter', payload);
        if(res.statusCode == 200){
          
        } else {
        }
      }
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "BlackListSearchCriteria,BlackListInternalOrExternalToBank,BlackListKeyField,blacklist_source"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.externalInternalToBankDropDown=res.data.BlackListInternalOrExternalToBank;
      this.keyFieldsDropDown=res.data.BlackListKeyField;
      this.searchCriteriaDropDown=res.data.BlackListSearchCriteria;
      this.blacklistSourceDropDown=res.data.blacklist_source;
    }else{
      this.externalInternalToBankDropDown=[];
      this.keyFieldsDropDown=[];
      this.searchCriteriaDropDown=[];
      this.blacklistSourceDropDown=[];
    }

  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { cid: 1,status:1, lusr:"john_doe"};
      const formValue:any = this.tempForm.value;
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
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
      bankNumber: [this.tempData[index].bankNumber, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      branchName: [this.tempData[index].branchName, [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      quater: [this.tempData[index].quater, [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      borrower: [this.tempData[index].borrower, [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      directorName: [this.tempData[index].directorName, [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]],
      registeredAddress: [this.tempData[index].registeredAddress, [Validators.required, , Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      console.log(this.editing_index)
      const staticData:any = { cid: 1,status:1, lusr:"john_doe"};
      const formValue:any = this.tempForm.value;
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
          const formValue:any = this.tempForm.value;
          const staticData:any = { cid: 1,status:1, lusr:"john_doe"};
          const data:any =  {...staticData,...formValue};
          this.tempData.push(data);
        } else {
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
          internalOrExternalToBank: parseInt(this.parentForm.value.internalExternalToBank),
          source: parseInt(this.parentForm.value.source),
          searchCriteria: parseInt(this.parentForm.value.searchCriteria),
          keyField: parseInt(this.parentForm.value.keyFields),
          lusr: "john_doe",
          status: 1,
          wilfulDetails: this.tempData
        }
        let res:any = await this._cs.getCommonFunction('InsertWilfulDefaulter', payload);
        if(res.statusCode == 200){
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
          this._router.navigate(['/wilful-defaulter-blacklist-browse'])
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
