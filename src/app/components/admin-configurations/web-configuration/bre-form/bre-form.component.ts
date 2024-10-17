import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bre-form',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MiscellaneousDropDownPipe,
  ],
  templateUrl: './bre-form.component.html',
  styleUrl: './bre-form.component.scss',
})
export class BreFormComponent {
  ChecksTypeDropDown: any;
  CheckParameterDropDown: any;
  AcceptanceCriteriaDropDown: any;
  parentForm: any;
  tempForm: any;
  tempSubmitButton: boolean = false;
  loanApplicationDedupetButton: boolean = false;
  tempData: any = [];
  editing_index: any;
  tempFormEdit: boolean = false;
  finalSubmitted: boolean = false;
  warningMessage: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  DigitalKycCheckCriteria: any = [];
  ApiSource: any = [];
  isEditMode: boolean = false;
  isDisabled: boolean = false;
  masterId: any;
  id: any;
  miscellaneousValue: any = [];
  productSelected: boolean = false;
  productIdSelected: boolean = false;
  loanApplicationDedupe!: FormGroup;
  blacklistForm: FormGroup;
  productId: any = '';
  product: any = '';
  loanapplicationdedupe: any = [];

  constructor(
    private _cs: CommonServiceService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      this.id = data.id;
    });
    this.blacklistForm = this._fb.group({
      checks: this._fb.array([]), // Initialize checks as a FormArray
    });
  }

  ngOnInit() {
    this.getMiscellaneous();
    this.parentForm = this._fb.group({
      product: ['', Validators.required],
      productId: ['', Validators.required],
    });

    this.tempForm = this._fb.group({
      checksType: ['', Validators.required],
      checkParameter: ['', Validators.required],
      acceptanceCriteria: ['', Validators.required],
      maxToleranceAllowed: ['', Validators.required],
    });

    this.loanApplicationDedupe = this._fb.group({
      checksType: ['', Validators.required],
      checkParameter: ['', Validators.required],
      acceptanceCriteria: ['', Validators.required],
      maxToleranceAllowed: ['', Validators.required],
    });

    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        this.masterId = params['id'];
        this.isEditMode = true;
        this.isDisabled = true;
        this.getViewData();
      }
    });
    this.addCheck('Company Blacklist', 665);
    this.addCheck('Wilful Defaulter', 666);
  }

  get checks() {
    return this.blacklistForm.get('checks') as FormArray;
  }

  addCheck(name: string, type: number) {
    this.checks.push(
      this._fb.group({
        cid: [1],
        breType: [665],
        checksType: [type, Validators.required],
        acceptanceCriteria: [0],
        maxToleranceAllowed: [0],
        status: [265],
      })
    );
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: 'ChecksType,AcceptanceCriteria,Product,ProductType',
    };
    let res: any = await this._cs.getCommonFunction('DropDown', obj);
    if (res.statusCode == 200) {
      this.miscellaneousValue = res.data;
      this.ChecksTypeDropDown = res.data.ChecksType;
      this.AcceptanceCriteriaDropDown = res.data.AcceptanceCriteria;
    } else {
      this.ChecksTypeDropDown = [];
      this.AcceptanceCriteriaDropDown = [];
    }
  }

  editClicked() {
    this.isDisabled = false;
    this.getViewData();
  }

  async getViewData() {
    let payload: any = {
      id: this.masterId,
      cid: 1,
    };
    let res: any = await this._cs.getCommonFunction(
      'GetByIdDigitalKycCheckConfigurationMaster',
      payload
    );
    if (res.statusCode == 200) {
      this.parentForm = this._fb.group({
        customerCategory: [
          { value: res.data.customerCategory, disabled: this.isDisabled },
          Validators.required,
        ],
        customerType: [
          { value: res.data.customerType, disabled: this.isDisabled },
          Validators.required,
        ],
        loanType: [
          { value: res.data.loanType, disabled: this.isDisabled },
          Validators.required,
        ],
        productId: [
          { value: res.data.productId, disabled: this.isDisabled },
          Validators.required,
        ],
      });
      this.tempData = res.data.tempGrid;
    } else {
    }
  }

  async checkTypeChanged(events: any) {
    let data = events.target.value;
    if (data) {
      var obj = {
        DDVal: data.toString(),
      };
      let res: any = await this._cs.getCommonFunction('SubDropDown', obj);
      // if(res.statusCode==200){
      this.CheckParameterDropDown = res;
      // }else{
      //   this.CheckParameterDropDown=[];
      // }
    }
  }

  private convertValuesToInteger(formValue: any) {
    return {
      checksType: parseInt(formValue.checksType, 10),
      checkParameter: parseInt(formValue.checkParameter, 10),
      acceptanceCriteria: parseInt(formValue.acceptanceCriteria, 10),
    };
  }

  tempSubmit() {
    this.tempSubmitButton = true;
    if (
      this.tempSubmitButton &&
      this.tempForm.invalid &&
      this.parentForm.invalid
    ) {
      return;
    } else {
      const staticData: any = {
        cid: 1,
        status: 265,
        breType: 686,
        maxToleranceAllowed: this.tempForm.value.maxToleranceAllowed,
      };
      const formValue: any = this.convertValuesToInteger(this.tempForm.value);
      const data: any = { ...staticData, ...formValue };
      this.tempData.push(data);
      this.tempSubmitButton = false;
    }
  }

  tempSubmitLoanApplicationDedupe() {
    this.loanApplicationDedupetButton = true;
    if (
      this.loanApplicationDedupetButton &&
      this.loanApplicationDedupe.invalid &&
      this.loanApplicationDedupe.invalid
    ) {
      return;
    } else {
      const staticData: any = {
        cid: 1,
        status: 265,
        breType: 687,
        maxToleranceAllowed:
          this.loanApplicationDedupe.value.maxToleranceAllowed,
      };
      const formValue: any = this.convertValuesToInteger(
        this.loanApplicationDedupe.value
      );
      const data: any = { ...staticData, ...formValue };
      this.loanapplicationdedupe.push(data);
      this.tempSubmitButton = false;
    }
  }

  deleteItem(index: number) {
    this.tempData.splice(index, 1);
  }

  editTempGrid(index: any) {
    this.tempFormEdit = true;
    this.editing_index = index;
    this.tempForm = this._fb.group({
      digitalKycCheckCriteria: [
        this.tempData[index].digitalKycCheckCriteria,
        Validators.required,
      ],
      apiSource: [this.tempData[index].apiSource, Validators.required],
    });
  }

  tempGridUpdate() {
    if (this.tempSubmitButton && this.tempForm.invalid) {
      return;
    } else {
      const staticData: any = { cid: 1, status: 1, lusr: 'MF59678' };
      const formValue: any = this.convertValuesToInteger(this.tempForm.value);
      const data: any = { ...staticData, ...formValue };
      this.tempData[this.editing_index] = data;
      this.tempSubmitButton = false;
      this.tempFormEdit = false;
      this.editing_index = '';
      this.tempForm.reset();
    }
  }

  async finalSubmit() {
    this.finalSubmitted = true;
    if (
      this.finalSubmitted &&
      this.parentForm.invalid &&
      (this.tempForm.invalid || this.tempData.length == 0)
    ) {
      if (this.tempForm.invalid && this.tempData.length == 0) {
        this.warningMessage = true;
        this._snackBar.open('Please add data to loan amount form', '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        return;
      }
      return;
    } else {
      if (this.tempData.length == 0) {
        if (this.tempForm.valid) {
          const formValue: any = this.convertValuesToInteger(
            this.tempForm.value
          );
          const staticData: any = { cid: 1, status: 1, lusr: 'MF59678' };
          const data: any = { ...staticData, ...formValue };
          this.tempData.push(data);
        } else {
          this._snackBar.open('Please add data to temp form', '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          return;
        }
      } else {
        var payload: any;
        payload = {
          cid: 1,
          customerCategory: parseInt(this.parentForm.value.customerCategory),
          customerType: parseInt(this.parentForm.value.customerType),
          loanType: parseInt(this.parentForm.value.loanType),
          productId: parseInt(this.parentForm.value.productId),
          status: 266,
          tempGrid: this.tempData,
        };
        var res: any;
        if (this.isEditMode) {
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction(
            'UpdateDigitalKycCheckConfigurationMaster',
            payload
          );
        } else {
          res = await this._cs.getCommonFunction(
            'InsertDigitalKycCheckConfigurationMaster',
            payload
          );
        }
        // let res:any = await this._cs.getCommonFunction('InsertDigitalKycCheckConfigurationMaster', payload);
        if (res.statusCode == 200) {
          this._snackBar.open(res.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this._router.navigate(['/digital-kyc-list']);
        } else {
          console.log(res);
          console.log(res.error.message);
          this._snackBar.open(res.error.message, '', {
            duration: 3000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    }
  }

  async submitForm() {
    try {
      const combinedArray = [
        ...this.tempData.map((item: any) => ({ ...item, lusr: 'subham' })),
        ...this.loanapplicationdedupe.map((item: any) => ({ ...item, lusr: 'subham' })),
        ...this.blacklistForm.value.checks.map((item: any) => ({ ...item, lusr: 'subham' })),
      ];
      
      this.finalSubmitted = true;
      if (
        this.finalSubmitted &&
        this.parentForm.invalid &&
        (this.tempForm.invalid || this.tempData.length == 0)
      ) {
        this.tempSubmitButton = true;
        return;
      }
      var payload: any = {
        cid: 1,
        productId: this.parentForm.value.productId,
        productName: this.parentForm.value.product,
        status: 265,
        brEconfigurationDetails: combinedArray,
        lusr:'subham'
      };
      var res: any = await this._cs.getCommonFunction(
        'BREConfigInsert',
        payload
      );
      if (res.statusCode == 200) {
        alert('sucess');
        this._router.navigate(['/bre-list']);
      } else {
        alert(res.message);
      }
    } catch (error) {}
  }
}
