import { Component, OnInit, Inject, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { FormsModule } from '@angular/forms';
import { RadService } from '../../../../../services/rad/rad.service';
import { MatDialog } from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { StatusActiveInactiveComponent } from '../../../../../core/widgets/status-active-inactive/status-active-inactive.component';
import { CommonServiceService } from '../../../../../services/common-service.service';
import { MiscellaneousDropDownPipe } from '../../../../../pipes/miscellaneousDropDown';

@Component({
  selector: 'app-rad-configuration1',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, NgxPaginationModule, RouterLink, RouterOutlet, RouterLinkActive,FormsModule, MatSlideToggleModule, MiscellaneousDropDownPipe],
  templateUrl: './rad-configuration1.component.html',
  styleUrl: './rad-configuration1.component.scss'
})
export class RadConfiguration1Component {

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
  ratioType: any = [];
  currentPage: any =1;

  constructor(private rad:RadService, private dialog: MatDialog, private _snackBar: MatSnackBar, private _cs:CommonServiceService){}

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "Ratio Type"};
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.ratioType=res.data.CustomerCategory;
    }else{
      this.ratioType=[];
    }

  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      perPage: this.itemsPerPage
    }
    let res:any = await this.rad.radRatioAnalysisScoreBrowse(payload);
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
    this.p = 1; // Reset to the first page
    this.getData(this.p)
  }

  getNextPageData(e:any){
    this.getData(e);
    this.currentPage = e;
  }

  async filter(){
    var payload = {
      cid: 1,
      ratioType: parseInt(this.filterRatioType?this.filterRatioType:0),
      ratioSubType: parseInt(this.filterRatioSubType?this.filterRatioSubType:0),
      pageNo: this.p,
      perPage: this.itemsPerPage
    }
    let res:any = await this.rad.ratioAnalysisScoreFilter(payload);
    if(res.statusCode == 200){
      this.browseList = res.dataTable;
      this.totalRecords = res.totalRecords;
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

  openStatusModal(selectedId:any){
    const dialogRef = this.dialog.open(StatusActiveInactiveComponent, {
      data: { selectedId }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      
    });
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
        let res:any = await this._cs.getCommonFunction('StatusUpdateRatioAnalysis', payLoad);
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
    let res:any = await this.rad.radRatioAnalysisScoreBrowse(payload);
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
    hiddenElement.download = 'ratio-analysis.csv';
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
