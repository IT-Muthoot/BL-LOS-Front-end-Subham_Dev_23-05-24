import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-config-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branch-config-form.component.html',
  styleUrl: './branch-config-form.component.scss'
})
export class BranchConfigFormComponent {

  branchConfigForm:any;
  finalSubmitted:boolean = false;
  customerCategoryDropDown: any = [];
  loanAllowedDropDown: any = [];
  currencyDropDown: any = [];
  ProductDropDown: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _fb:FormBuilder, private _cs:CommonServiceService, private _snackBar:MatSnackBar, private _router:Router){}

  ngOnInit(){
    this.getMiscellaneous();
    this.branchConfigForm = this._fb.group({
      branchCode:['', Validators.required],
      branchName:['', Validators.required],
      isItSubBranch:['', Validators.required],
      parentBranchCode:['', Validators.required],
      parentBranchName:['', Validators.required],
      branchAddress:['', Validators.required],
      regionCode:['', Validators.required],
      countryCode:['', Validators.required],
      countryName:['', Validators.required],
      workingHoursStart:['', Validators.required],
      workingHoursEnd:['', Validators.required],
      loanType:['', Validators.required],
      productCode:['', Validators.required],
      customerCategory:['', Validators.required],
      currency:['', Validators.required]
    })

    this.branchConfigForm.get('isItSubBranch').valueChanges.subscribe((value:any) => {
      if (value === 'false') {
        // Disable fields
        this.branchConfigForm.get('parentBranchCode').disable();
        this.branchConfigForm.get('parentBranchName').disable();
      } else {
        // Enable fields
        this.branchConfigForm.get('parentBranchCode').enable();
        this.branchConfigForm.get('parentBranchName').enable();
      }
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "AllowedLoanType,CustomerCategory,Currency,Product"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.customerCategoryDropDown=res.data.AllowedLoanType;
      this.loanAllowedDropDown=res.data.CustomerCategory;
      this.currencyDropDown=res.data.Currency;
      this.ProductDropDown=res.data.Product;
    }else{
      this.customerCategoryDropDown=[];
      this.loanAllowedDropDown=[];
      this.currencyDropDown=[];
      this.ProductDropDown=[];
    }
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.branchConfigForm.invalid){
      return;
    } else {
      var payload = {
        ...this.branchConfigForm.value,
        lusr: "john_doe",
        status: 266
      }
      console.log(payload);
      let res:any = await this._cs.getCommonFunction('InsertBranchConfig', payload);
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/branch-config-list'])
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
