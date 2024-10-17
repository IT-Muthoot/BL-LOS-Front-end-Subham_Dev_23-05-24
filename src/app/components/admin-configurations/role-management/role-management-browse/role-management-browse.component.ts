import { Component , Inject, HostListener  } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { UserRoleManagementService } from '../../../../services/user-role-management/user-role-management.service';
import { FormsModule } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusActiveInactiveComponent } from '../../../../core/widgets/status-active-inactive/status-active-inactive.component';

@Component({
  selector: 'app-role-management-browse',
  standalone: true,
  imports: [ReactiveFormsModule, MatExpansionModule, NgxPaginationModule, CommonModule,FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './role-management-browse.component.html',
  styleUrl: './role-management-browse.component.scss'
})
export class RoleManagementBrowseComponent {
  filterForm: any;

  constructor(private userRole:UserRoleManagementService, private cs:CommonServiceService, private fb:FormBuilder, private dialog: MatDialog){
 
  }

  ngOnInit(){
    this.getListData(this.pageNo);
    this.filterForm = this.fb.group({
      role_name: [''],
      role_id: ['']
    })
  }

  availableItemsPerPage: number[] = [3, 10, 20, 50]; // Options for items per page
  data:any;
  pageNo: number = 1;
  isActive = false;
  itemsPerPage:number = 5;
  browseList:any = [];
  totalRecords:any;
  filterRoleName:any;
  filterRoleId:any;
  currentPage: any =1;
  p: number = 1;

  toggleClass() {
    this.isActive = !this.isActive;
  }
  onChangeItemsPerPage(event: any): void {
    this.itemsPerPage = event.target.value;
    this.pageNo = 1;
    this.getListData(this.pageNo)
  }

  async getListData(pageNo:any){
    const payload = {
      cid: 1,
      pageNo: pageNo,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.cs.getCommonFunction('GetAllRole', payload);
    if(res.statusCode == 200){
      this.browseList = res.dataTable;
      this.totalRecords = res.totalRecords; 
    } else {
    }
  }

  getNextPageData(e:any){
    this.getListData(e);
    this.currentPage = e;
  }

  async filter(){
    var payload = {
      cid: 1,
      roleId: this.filterRoleId?Number(this.filterRoleId):0,
      roleName: this.filterRoleName?this.filterRoleName:'',
      pageNo: 1,
      pageSize: this.itemsPerPage
    }
    let res:any = await this.userRole.roleListFilter(payload);
    if(res.statusCode == 200){
      this.browseList = res.dataTable;
      this.totalRecords = res.totalRecords;
    } else {
    }
  }
  // onPageChange(page: number): void {
  //   this.getListData(page);
  // }

  async onStatusChange(selectedId:any, status:any) {
    const dialogRef = this.dialog.open(StatusActiveInactiveComponent);
    dialogRef.afterClosed().subscribe(async result => {
      if (result === 'confirm') {
        var updatingStatus = status == 266?265:266;
        const payLoad = {
          roleId: selectedId,
          status: updatingStatus
        }
        let res:any = await this.cs.getCommonFunction('StatusUpdateRole',payLoad);
        if(res.statusCode == 200){
          this.getListData(this.currentPage);
        }
      }
    });
  }
}
