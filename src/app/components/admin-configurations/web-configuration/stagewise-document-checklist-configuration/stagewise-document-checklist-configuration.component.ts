import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import Swal from 'sweetalert2';
import { MiscellaneousDropDownPipe } from "../../../../pipes/miscellaneousDropDown";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stagewise-document-checklist-configuration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MiscellaneousDropDownPipe],
  templateUrl: './stagewise-document-checklist-configuration.component.html',
  styleUrl: './stagewise-document-checklist-configuration.component.scss'
})
export class StagewiseDocumentChecklistConfigurationComponent {
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
  DocumentCheckList:any;
  DocumentFormatAccepted:any;
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
      maxSizeAccepted: ['', Validators.required],
      compressionPercentage: ['', Validators.required],
      isSizeCompressionReqForImage: ['', Validators.required],
      wfStage: ['', Validators.required],
      document: ['', Validators.required],
      isDocumentMandatory: ['', Validators.required],
      documentFormatAccepted: ['', Validators.required],
    });

    this.tempForm.get('isSizeCompressionReqForImage').valueChanges.subscribe((value:any) => {
      if (value === 'false') {
        this.tempForm.get('compressionPercentage').disable();
      } else {
        this.tempForm.get('compressionPercentage').enable();
      }
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
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,productId,ApiSource,StageName,DocumentCheckList,Product,DocumentFormatAccepted"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.CustomerType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.DigitalKycCheckCriteria=res.data.DigitalKycCheckCriteria;
      this.StageName=res.data.StageName;
      this.DocumentCheckList=res.data.DocumentCheckList;
      this.DocumentFormatAccepted=res.data.DocumentFormatAccepted;
      this.Product=res.data.Product;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.CustomerType=[];
      this.DigitalKycCheckCriteria=[];
      this.StageName=[];
      this.DocumentCheckList=[];
      this.DocumentFormatAccepted=[];
      this.Product=[];
    }
  }

  editClicked(){
    this.isDisabled = false;
    this.getViewData();
  }

  async getViewData(){
    let payload:any = {
      id: this.masterId,
      cid:1
    };
    let res:any = await this._cs.getCommonFunction('StatusUpdateDocumentChecklist' ,payload);
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
  
  private convertValuesToInteger(formValue: any) {
    return {
      digitalKycCheckCriteria: parseInt(formValue.digitalKycCheckCriteria, 10),
      apiSource: parseInt(formValue.apiSource, 10)
    };
  }

  tempSubmit(){
    this.tempSubmitButton = true;
    if(this.tempSubmitButton && this.tempForm.invalid ){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
      const formValue: any = {
        ...this.tempForm.value,
        wfStage: parseInt(this.tempForm.value.wfStage, 10),
        document: parseInt(this.tempForm.value.document, 10),
        documentFormatAccepted: parseInt(this.tempForm.value.documentFormatAccepted, 10),
      };
      const data:any =  {...staticData,...formValue};
      this.tempData.push(data);
      console.log(this.tempData)
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
        maxSizeAccepted: [this.tempData[index].maxSizeAccepted, Validators.required],
        compressionPercentage: [this.tempData[index].compressionPercentage, Validators.required],
        isSizeCompressionReqForImage: [this.tempData[index].isSizeCompressionReqForImage, Validators.required],
        wfStage: [this.tempData[index].wfStage, Validators.required],
        document: [this.tempData[index].document, Validators.required],
        isDocumentMandatory: [this.tempData[index].isDocumentMandatory, Validators.required],
        documentFormatAccepted: [this.tempData[index].documentFormatAccepted, Validators.required],
    });
  }

  tempGridUpdate(){
    if(this.tempSubmitButton && this.tempForm.invalid){
      return;
    } else {
      const staticData:any = { cid: 1,status:1,lusr:'MF59678'};
      const formValue: any = {
        ...this.tempForm.value,
        wfStage: parseInt(this.tempForm.value.wfStage, 10),
        document: parseInt(this.tempForm.value.document, 10),
        documentFormatAccepted: parseInt(this.tempForm.value.documentFormatAccepted, 10),
      };
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
          this.tempSubmitButton = true;
          this.tempSubmit()
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
          DocumentChecklistDetails: this.tempData
        }
        var res:any;
        if(this.isEditMode){
          payload['id'] = this.masterId;
          res = await this._cs.getCommonFunction('UpdateDocumentChecklist', payload);
        } else {
          res = await this._cs.getCommonFunction('InsertDocumentChecklist', payload);
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
