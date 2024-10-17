import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { CommonServiceService } from '../../../../services/common-service.service';
import { FormsModule } from '@angular/forms';
import { MiscellaneousDropDownPipe } from "../../../../pipes/miscellaneousDropDown";

@Component({
  selector: 'app-business-rule-list',
  standalone: true,
  imports: [MatExpansionModule, NgxPaginationModule, CommonModule, RouterModule, FormsModule, MiscellaneousDropDownPipe],
  templateUrl: './business-rule-list.component.html',
  styleUrl: './business-rule-list.component.scss'
})
export class BusinessRuleListComponent {
  isActive = false;
  availableItemsPerPage: number[] = [5, 10, 20, 50];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  data: any = [];
  miscellaneousValue: any = [];
  p: number = 1;
  itemsPerPage: number = 5;
  totalRecords: number = 0;
  productId: any = '';
  product: any = '';

  constructor(
    private commonService: CommonServiceService,
    private _snackBar: MatSnackBar,
    private routes: Router
  ) {}

  async ngOnInit() {
    await this.getMiscellaneous();
    await this.getBreListData();
  }
  async getMiscellaneous() {
    var obj = {
      Cdval: 'Product,ProductType',
    };
    let res: any = await this.commonService.getCommonFunction('DropDown', obj);
    if (res.statusCode == 200) {
      this.miscellaneousValue = res.data;
    } else {
      this.miscellaneousValue = [];
    }
  }
  toggleClass() {
    this.isActive = !this.isActive;
  }
  onChangeItemsPerPage(event: any): void {
    this.itemsPerPage = event.target.value;
    this.getBreListData();
  }

  async getBreListData() {
    var payload = {
      cid: 1,
      productId: this.productId,
      productName: this.product,
      pageNo: this.p,
      perPage: this.itemsPerPage,
      status: '',
    };
    let res: any = await this.commonService.getCommonFunction(
      'BRERiskConfigGetAll',
      payload
    );

    if (res.statusCode == 200) {
      this.data = res.data;
      this.totalRecords = res.totalRecords;
    } else {
      this.data = [];
      this.totalRecords = 0;
      this._snackBar.open(res.message, '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  async getBreListDataClear() {
    this.product = '';
    this.productId = '';
    (this.p = 1), (this.itemsPerPage = 5), this.getBreListData();
  }

  getNextPageData(e: any) {
    // this.getData(e);
    this.getBreListData();
    // this.currentPage = e;
  }

  async onStatusChange(selectedId: any, status: any) {
    Swal.fire({
      title: 'Do you want to update the status?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then(async (result: { isConfirmed: any; isDenied: any }) => {
      if (result.isConfirmed) {
        var updatingStatus = status == 266 ? 265 : 266;
        const payLoad = {
          id: selectedId,
          status: updatingStatus,
          cid: 1,
        };
        console.log(payLoad);
        
        let res: any = await this.commonService.getCommonFunction(
          'BRERiskConfigUpdateStatus',
          payLoad
        );
        if (res.statusCode == 200) {
          this.getBreListData();
          Swal.fire('Changes are  saved', res.message, 'success');
        } else {
          Swal.fire('Changes are not saved', res.message, 'info');
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  getBreConfigData(data: any) {
    this.routes.navigate(['business-risk-form'], {
      queryParams: {
        id: data?.id,
      },
    });
  }
}
