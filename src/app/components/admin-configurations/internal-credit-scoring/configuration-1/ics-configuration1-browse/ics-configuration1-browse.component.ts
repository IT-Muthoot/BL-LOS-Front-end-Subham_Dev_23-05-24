import { Component , OnInit, Inject, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MiscellaneousDropDownPipe } from '../../../../../pipes/miscellaneousDropDown';
import { CommonServiceService } from '../../../../../services/common-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../../core/widgets/status-active-inactive/status-active-inactive.component';


@Component({
  selector: 'app-ics-configuration1-browse',
  standalone: true,
  imports: [ReactiveFormsModule,MatExpansionModule, NgxPaginationModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, MiscellaneousDropDownPipe, MatSlideToggleModule],
  templateUrl: './ics-configuration1-browse.component.html',
  styleUrl: './ics-configuration1-browse.component.scss'
})
export class IcsConfiguration1BrowseComponent {
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

  constructor( private dialog: MatDialog, private _snackBar: MatSnackBar, private _cs:CommonServiceService, private fb:FormBuilder, private cs:CommonServiceService){}

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      customerCategory: [''],
      criteria: [''],
      min_score: [''],
      max_score: [''],
    })
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,InteranlCreaditScoreCriteria"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategory=res.data.CustomerCategory;
      this.criteria=res.data.InteranlCreaditScoreCriteria;
    }else{
      this.CustomerCategory=[];
      this.criteria=[];
    }

  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      record: this.itemsPerPage
    }
    let res:any = await this._cs.getCommonFunction('GetAllInternalCreditScoringOne', payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
      this.totalRecords = res.count;
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
      customerCategory: this.filterForm.value.customerCategory?parseInt(this.filterForm.value.customerCategory):0,
      criteria: 0,
      minScore: 0,
      maxScore: 0,
      pageNo: 1,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('GetByFilterInternalCreditScoringOne',payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
      this.totalRecords = res.count;
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
        let res:any = await this._cs.getCommonFunction('UpdateStatusInternalCreditScoringOne', payLoad);
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

