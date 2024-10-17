import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CreditCommitteeService } from '../../../../services/credit-committee/credit-committee.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../core/widgets/status-active-inactive/status-active-inactive.component';
import { CommonServiceService } from '../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-credit-committee-configuration-browse',
  standalone: true,
  imports: [ReactiveFormsModule,MatExpansionModule, NgxPaginationModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, MiscellaneousDropDownPipe, MatSlideToggleModule],
  templateUrl: './credit-committee-configuration-browse.component.html',
  styleUrl: './credit-committee-configuration-browse.component.scss'
})
export class CreditCommitteeConfigurationBrowseComponent {
  windowScrolled: boolean = false;
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
  CustomerType: any;
  Product: any;
  loanType: any;
  filterForm: any;
  currentPage: any =1;

  constructor(private cc:CreditCommitteeService, private dialog: MatDialog, private _snackBar: MatSnackBar, private cs:CommonServiceService, private fb:FormBuilder){}

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      customerCategory: [''],
      customerType: [''],
      loanType: [''],
      productId: ['']
    })
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,Product"   
    };
    let res: any = await this.cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.CustomerType=res.data.CustomerType;
      this.loanType=res.data.AllowedLoanType;
      this.Product=res.data.Product;
    }else{
      this.CustomerCategory=[];
      this.loanType=[];
      this.CustomerType=[];
      this.Product=[];
    }

  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cc.getAllCreditCommitteData(payload);
    if(res.statusCode == 200){
      this.browseList = res.creditCommitteDataTable;
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
    let res:any = await this.cc.filterCreditCommitteData(payload);
    if(res.statusCode == 200){
      this.browseList = res.creditCommitteDataTable;
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
          id: selectedId,
          status: updatingStatus
        }
        let res:any = await this.cc.commonAPICall(payLoad, 'StatusUpdateCreditCommittee');
        if(res.statusCode == 200){
          this.getData(this.currentPage);
        }
      }
    });
  }

  async exportData(){
    const payload = {
      cid: 1,
      pageNo: 1,
      perPage: this.totalRecords
    }
    let res:any = await this.cc.getAllCreditCommitteData(payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
      let csv = '';
    const table: any = document.getElementById('ratio-analysis-table');
    if (!table) {
      return;
    }
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) {
      return;
    }
    const headers = thead.querySelectorAll('th');
    headers.forEach((header: any, index: number) => {
      csv += header.innerText.trim();
      if (index < headers.length - 1) {
        csv += ',';
      }
    });
    csv += '\n';
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row: any) => {
      const cells = row.querySelectorAll('td');
      cells.forEach((cell: any, index: number) => {
        csv += cell.innerText.trim();
        if (index < cells.length - 1) {
          csv += ',';
        }
      });
      csv += '\n';
    });
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'credit-committee.csv';
    hiddenElement.click();
    } else {
      const message = res.message;
      this._snackBar.open(message, '', {
        duration: 100000,
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    }
  }
}

