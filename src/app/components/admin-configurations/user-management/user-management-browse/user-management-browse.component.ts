import { Component , OnInit, Inject, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MiscellaneousDropDownPipe } from '../../../../pipes/miscellaneousDropDown';
import { CommonServiceService } from '../../../../services/common-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../core/widgets/status-active-inactive/status-active-inactive.component';

@Component({
  selector: 'app-user-management-browse',
  standalone: true,
  imports: [ReactiveFormsModule,MatExpansionModule, NgxPaginationModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive, MiscellaneousDropDownPipe, MatSlideToggleModule],
  templateUrl: './user-management-browse.component.html',
  styleUrl: './user-management-browse.component.scss'
})
export class UserManagementBrowseComponent {
  totalRecords: any;
  browseList:any = [];
  availableItemsPerPage: number[] = [5, 10, 20, 50]; // Options for items per page
  data:any;
  p: number = 1;
  isActive = false;
  itemsPerPage:number = 2;
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
  sourceDropDown: any = [];
  roleData: any = [];

  constructor( private dialog: MatDialog, private _snackBar: MatSnackBar, private _cs:CommonServiceService, private fb:FormBuilder, private cs:CommonServiceService){}

  ngOnInit(){
    console.log(2);
    this.getData(this.p);
    this.getMiscellaneous();
    this.filterForm = this.fb.group({
      employeeId: ['']
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
      this.sourceDropDown=res.data.blacklist_source;
    }else{
      this.externalInternalToBankDropDown=[];
      this.keyFieldsDropDown=[];
      this.searchCriteriaDropDown=[];
      this.sourceDropDown=[];
    }

  }

  async getData(p:any) {
    // this.getListData();
    const payload = {
      cid: 1,
      pageNo: p,
      pageSize: this.itemsPerPage
    }
    let res:any = await this._cs.getCommonFunction('GetAllUsers', payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
      this.totalRecords = res.totalRecords;
    } else {
      
    }
  }

  async getListData(){
    const payload = {
      cid: 1,
      pageNo: 1,
      pageSize: 500
    }
    let res:any = await this.cs.getCommonFunction('GetAllRole', payload);
    if(res.statusCode == 200){
      this.roleData = res.dataTable;
    } else {
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
      employeeId: this.filterForm.value.employeeId,
      // lusr:'MF58957',
      pageNo: 1,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('FilterUser',payload);
    if(res.statusCode == 200){
      this.browseList = res.data;
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
        let res:any = await this._cs.getCommonFunction('StatusUpdateUser', payLoad);
        if(res.statusCode == 200){
          this.getData(this.currentPage);
        }
      }
    });
  }
}

