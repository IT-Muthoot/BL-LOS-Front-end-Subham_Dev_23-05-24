import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import {FormControl} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-skip-stages-add',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatChipsModule, MatIconModule, MatSelectModule, MatListModule, MatAutocompleteModule],
  templateUrl: './skip-stages-add.component.html',
  styleUrl: './skip-stages-add.component.scss'
})
export class SkipStagesAddComponent {
  CustomerCategoryDropDown: any = [];
  CustomerTypeDropDown: any = [];
  AllowedLoanTypeDropDown: any = [];
  StageNameDropDown: any = [];
  ProductDropDown: any = [];
  toppingsControl:any = new FormControl([]);
  fromAmount:any = new FormControl([]);
  toAmount:any = new FormControl([]);
  displayedToppings:any = [];
  remainingToppingsCount:any;
  maxDisplayedChips = 2;
  parentForm:any;
  finalSubmitted:boolean = false;
  tempForm:any;
  tempGrid:any = [];
  tempData:any = [];
  tempSubmitButton: boolean = false;
  newData:any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isEditMode:boolean = false;
  isDisabled:boolean = false;
  masterId:any;

  constructor(private _cs:CommonServiceService, private _fb:FormBuilder, private _snackBar:MatSnackBar, private _router:Router, private route:ActivatedRoute){
  }

  ngOnInit(){
    this.getMiscellaneous();

    this.parentForm = this._fb.group({
      customer_Category : ['', Validators.required],
      customer_type : ['', Validators.required],
      loan_type : ['', [Validators.required]],
      productId : ['', [Validators.required]]
    });

    // this.tempForm = this._fb.group({
    //   fromAmount:['', Validators.required],
    //   toAmount:['', Validators.required],
    //   toppingsControl:['', Validators.required]
    // })
    this.tempForm  = new FormGroup({
      toppingsControl: this.toppingsControl,
      fromAmount: new FormControl(this.fromAmount, [Validators.required, Validators.min(1),  Validators.max(1)]),
  toAmount: new FormControl(this.toAmount, [Validators.required, Validators.min(1),  Validators.max(1)])
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
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,StageName,Product"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategoryDropDown=res.data.CustomerCategory;
      this.CustomerTypeDropDown=res.data.CustomerType;
      this.AllowedLoanTypeDropDown=res.data.AllowedLoanType;
      this.StageNameDropDown=res.data.StageName;
      this.ProductDropDown=res.data.Product;
    }else{
      this.CustomerCategoryDropDown=[];
      this.CustomerTypeDropDown=[];
      this.AllowedLoanTypeDropDown=[];
      this.ProductDropDown=[];
    }

  }

  async getViewData(){
    let payload:any = {
      id: this.masterId,
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('GetByIdSkipsStageConfigurationHeader' ,payload);
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

  onToppingRemoved(topping: string): void {
    const toppings = this.toppingsControl.value as string[];
    this.displayedToppings = this.displayedToppings.filter((t:any) => t !== topping);
    this.toppingsControl.setValue(this.displayedToppings);
    this.toppingsControl.markAsDirty();
    this.toppingsControl.updateValueAndValidity();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.displayedToppings = this.StageNameDropDown.filter((obj:any) => event.value.includes(obj.id));
    this.remainingToppingsCount = this.displayedToppings.length - this.maxDisplayedChips;
    this.displayedToppings = this.displayedToppings.slice(0, 2);
  }
  
  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const formValues = this.tempForm.value;
      this.tempData.push(formValues);
      var newCommaSeparatedDAta = this.mapToppingsToTitles(formValues, this.StageNameDropDown);
      this.newData.push(newCommaSeparatedDAta)
      var sampleData:any;
      for(const data of formValues.toppingsControl){
      var title = this.displayedToppings.filter((obj:any) => obj.id);
        sampleData = {
          fromAmount:parseInt(this.tempForm.value.fromAmount),
          toAmount:parseInt(this.tempForm.value.toAmount),
          stageId:data,
          stageName:title[0].title,
          stageStatus:1,
          status:1,
          lusr:'jane_smith',
          cid:1
        }
        this.tempGrid.push(sampleData);
        this.displayedToppings = [];
      }
      this.tempSubmitButton = false;
      this.tempForm.reset();
    }
  }
  mapToppingsToTitles = (data: any, masterToppings: any[]) => {
    const mappedToppings = data.toppingsControl
     .map((id: number) => masterToppings.find(topping => topping.id === id)?.title)
     .join(', ');
    const updatedData = {
     ...data,
     toppingsControl: mappedToppings
    };
    return updatedData
  };

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
    this.newData.splice(index, 1);
    this.tempGrid.splice(index, 1);
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.parentForm.invalid  && (this.tempForm.invalid || this.tempData.length == 0)){
      if(this.tempForm.invalid && this.tempData.length == 0){
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
        var payload:any;
        payload = {
          cid: 1,
          customerCategory: parseInt(this.parentForm.value.customer_Category),
          customerType: parseInt(this.parentForm.value.customer_type),
          loanType: parseInt(this.parentForm.value.loan_type),
          productId: parseInt(this.parentForm.value.productId),
          status: 266,
          tempGrid: this.tempGrid
        }
        console.log(payload);
        var res:any;
        if(this.isEditMode){
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction('UpdateDigitalKycCheckConfigurationMaster', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertSkipsStageConfigurationHeader', payload);
        }
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

