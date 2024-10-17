import { Component , OnInit, Inject, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { CommonServiceService } from '../../../../services/common-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../core/widgets/status-active-inactive/status-active-inactive.component';

@Component({
  selector: 'app-company-blacklist-browse',
  standalone: true,
  imports: [ReactiveFormsModule,MatExpansionModule, NgxPaginationModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, MiscellaneousDropDownPipe, MatSlideToggleModule],
  templateUrl: './company-blacklist-browse.component.html',
  styleUrl: './company-blacklist-browse.component.scss'
})
export class CompanyBlacklistBrowseComponent {
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
  criteria: any;
  filterForm: any;
  currentPage: any =1;
  externalInternalToBankDropDown: any = [];
  keyFieldsDropDown: any = [];
  searchCriteriaDropDown: any = [];
  blacklist_source: any = [];

  constructor( private dialog: MatDialog, private _snackBar: MatSnackBar, private _cs:CommonServiceService, private fb:FormBuilder, private cs:CommonServiceService){}

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      internalExternalToBank: [''],
      keyFields: [''],
      searchCriteria: [''],
      source: ['']
    })
  }

  toggleClass() {
    this.isActive = !this.isActive;
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
      this.blacklist_source=res.data.blacklist_source;
    }else{
      this.externalInternalToBankDropDown=[];
      this.keyFieldsDropDown=[];
      this.searchCriteriaDropDown=[];
      this.blacklist_source=[];
    }

  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      perPage: this.itemsPerPage
    }
    let res:any = await this._cs.getCommonFunction('GetAllCompanyBlacklist', payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
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
    console.log(this.filterForm.value)
    var payload = {
      cid: 1,
      internalOrExternalToBank: this.filterForm.value.internalExternalToBank?parseInt(this.filterForm.value.internalExternalToBank):0,
      searchCriteria: this.filterForm.value.searchCriteria?parseInt(this.filterForm.value.searchCriteria):0,
      keyField: this.filterForm.value.keyFields?parseInt(this.filterForm.value.keyFields):0,
      source: this.filterForm.value.source?this.filterForm.value.source:0,
      lusr:'MF58957',
      pageNo: 1,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('FilterCompanyBlacklist',payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
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
        let res:any = await this._cs.getCommonFunction('StatusUpdateCompanyBlacklist', payLoad);
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
      record: this.totalRecords
    }
    let res:any = await this._cs.getCommonFunction('GetAllInternalCreditScoringOne' ,payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
      let csv = '';
    const table: any = document.getElementById('ics_config_1');
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

