import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { RadService } from '../../../../../services/rad/rad.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CommonServiceService } from '../../../../../services/common-service.service';

@Component({
  selector: 'app-rad-configuration-2',
  standalone: true,
  imports: [MatExpansionModule, NgxPaginationModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './rad-configuration2-browse.component.html',
  styleUrl: './rad-configuration2-browse.component.scss'
})
export class RadConfiguration2Component {
  isActive = false;
  browseList: any = [];
  totalRecords: any;
  filterForm:any;
  availableItemsPerPage: number[] = [5, 10, 20, 50]; // Options for items per page
  data:any;
  p: number = 1;
  itemsPerPage:number = 10;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  CustomerCategoryDropDown: any = [];
  CustomerTypeDropDown: any = [];
  AllowedLoanTypeDropDown: any = [];

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document, private rad:RadService, private fb:FormBuilder, private _snackBar: MatSnackBar, private _cs:CommonServiceService){
    
  }

  ngOnInit(){
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      customerCategory: [''],
      customerType: [''],
      loanType: [''],
      productId: [''],
      industryType: [''],
    })
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType"};
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      this.CustomerCategoryDropDown=res.data.CustomerCategory;
      this.CustomerTypeDropDown=res.data.CustomerCategory;
      this.AllowedLoanTypeDropDown=res.data.CustomerCategory;
    }else{
      this.CustomerCategoryDropDown= [];
      this.CustomerTypeDropDown= [];
      this.AllowedLoanTypeDropDown= [];
    }

  }

  onChangeItemsPerPage(event: any): void {
    this.itemsPerPage = event.target.value;
    this.p = 1; // Reset to the first page
  }

  getNextPageData(e:any){
    this.getData(e)
  }

  async getData(p:any) {
    const payload = {
      cid: 1,
      pageNo: p,
      perPage: this.itemsPerPage
    }
    let res:any = await this.rad.radRatioAnalysisWeightageBrowse(payload);
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

  async filter(){
    var payload = {
      cid: 1,
      customerCategory: parseInt(this.filterForm.value.customerCategory),
      customerType: parseInt(this.filterForm.value.customerType),
      loanType: parseInt(this.filterForm.value.loanType),
      productId: parseInt(this.filterForm.value.productId),
      industryType: parseInt(this.filterForm.value.industryType),
      pageNo: this.p,
      perPage: this.itemsPerPage
    }
    let res:any = await this.rad.ratioAnalysisWeightageFilter(payload);
    if(res.statusCode == 200){
      this.browseList = res.dataTable;
      this.totalRecords = res.totalRecords
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

  async exportTableData(){
    const payload = {
      cid: 1,
      pageNo: this.p,
      perPage: this.totalRecords
    }
    let res:any = await this.rad.radRatioAnalysisWeightageBrowse(payload);
    if(res.statusCode == 200){
      const csvData = this.convertToCSV(res.dataTable);
      this.downloadFile(csvData, 'ratio-analysis-data.csv');
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

  convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array.map(row => {
      return Object.values(row).map(value => `"${value}"`).join(',');
    }).join('\r\n');
  }

  downloadFile(csvData: string, fileName: string): void {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

}
