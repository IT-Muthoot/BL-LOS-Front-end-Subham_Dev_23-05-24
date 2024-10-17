import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../core/widgets/status-active-inactive/status-active-inactive.component';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-stagewise-document-checklist',
  standalone: true,
  imports: [MatExpansionModule, NgxPaginationModule, CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, RouterLinkActive, MiscellaneousDropDownPipe, MatSlideToggleModule],
  templateUrl: './stagewise-document-checklist.component.html',
  styleUrl: './stagewise-document-checklist.component.scss'
})
export class StagewiseDocumentChecklistComponent {
  totalRecords: any;
  browseList:any = [];
  availableItemsPerPage: number[] = [5, 10, 20, 50]; // Options for items per page
  data:any;
  p: number = 1;
  isActive = false;
  itemsPerPage:number = 5;
  filterRatioType: any;
  filterRatioSubType: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  CustomerCategory: any;
  businessType: any;
  loanType: any;
  customerType: any;
  filterForm: any;
  currentPage: any =1;

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, private cs:CommonServiceService, private fb:FormBuilder){}

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      customerCategory: [''],
      businessType: [''],
      loanType: [''],
      productId: ['']
    })
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,productId,BusinessType"   
    };
    let res: any = await this.cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.businessType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.customerType=res.data.CustomerType;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.businessType=[];
      this.customerType=[];
    }

  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('GetAllDocumentChecklist', payload);
    if(res.statusCode == 200){
      this.browseList = res.dataTable;
      this.totalRecords = res.totalRecordCount.recordCount;
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

  onChangeItemsPerPage(event: any): void {
    this.itemsPerPage = event.target.value;
    this.p = 1;
    this.getData(this.p)
  }

  getNextPageData(e:any){
    this.getData(e);
    this.currentPage = e;
  }

  async filter(){
    var payload = {
      cid: 1,
      customerCategory: parseInt(this.filterForm.value.customerCategory),
      customerType: parseInt(this.filterForm.value.customerType),
      loanType: parseInt(this.filterForm.value.loanType),
      productId: parseInt(this.filterForm.value.productId),
      pageNo: 1,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('FilterDocumentChecklist',payload);
    if(res.statusCode == 200){
      this.browseList = res;
      this.totalRecords = res.totalRecords;
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

  async onStatusChange(selectedId:any, status:any) {
    const dialogRef = this.dialog.open(StatusActiveInactiveComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === 'confirm') {
        var updatingStatus = status == 266?265:266;
        const payLoad = {
          cid:1,
          id: selectedId,
          status: updatingStatus
        }
        let res:any = await this.cs.getCommonFunction( 'StatusUpdateDocumentChecklist', payLoad);
        if(res.statusCode == 200){
          this.getData(this.currentPage);
        }
      }
    });
  }
}
