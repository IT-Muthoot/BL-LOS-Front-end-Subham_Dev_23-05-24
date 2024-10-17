import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialog } from '@angular/material/dialog';
import { caseAssignmnet } from '../../../core/widgets/case-assignment/case-assignment.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonServiceService } from '../../../services/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MiscellaneousDropDownPipe } from '../../../pipes/miscellaneousDropDown';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { decryptData } from '../../../services/aes/aes.services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-common-poll-bucket',
  standalone: true,
  imports: [
    MatBadgeModule,MatDatepickerModule,
    MatExpansionModule,
    NgxPaginationModule,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    MiscellaneousDropDownPipe,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './common-poll-bucket.component.html',
  styleUrl: './common-poll-bucket.component.scss',
})
export class CommonPollBucketComponent {
  isActive = false;
  data: any[] = [];
  pageSize: any = 5;
  pageIndex: any = 1;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;
  totalRecords: any;
  allSelected: boolean = false;
  miscellaneousValue: any = [];
  miscellaneousValueStages: any = [];
  searchFilters!: FormGroup;
  activeTab: any;
  userdetails: any;

  constructor(
    private dialog: MatDialog,
    private commonService: CommonServiceService,
    private _snackBar: MatSnackBar,
    private routes: Router
  ) {
    this.searchFilters = new FormGroup({
      cid: new FormControl('1'),
      id: new FormControl(''),
      loanApplicationId: new FormControl(''),
      customerType: new FormControl(''),
      customerCategory: new FormControl(''),
      customerName: new FormControl(''),
      mobileNumber: new FormControl(''),
      productId: new FormControl(''),
      productType: new FormControl(''),
      loanAmount: new FormControl(''),
      sourceLUDT: new FormControl(''),
      currentStage: new FormControl(''),
      applicationStatus: new FormControl(''),
      action: new FormControl(''),
      timeToSLA: new FormControl(''),
      currentStageLUSR: new FormControl(''),
      branchId: new FormControl(''),
      branchName: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      region: new FormControl(''),
      source: new FormControl(''),
      todate: new FormControl(''),
      fromdate: new FormControl(''),
    });
    var userData: any = localStorage.getItem('userDetails');
    this.userdetails = JSON.parse(decryptData(userData));
  }

  async ngOnInit() {
    await this.getMiscellaneous();
    await this.onTabClick('Common-Pool');
  }

  async getMiscellaneous() {
    var obj = {
      Cdval:
        'ApplicationStatus,Action,CustomerCategory,CustomerType,Product,ProductType,AllowedLoanType,Stage Details,DeviationStatus,Status,ProductType',
    };
    let res: any = await this.commonService.getCommonFunction('DropDown', obj);
    if (res.statusCode == 200) {
      this.miscellaneousValue = res.data;
      this.miscellaneousValueStages = res.data['Stage Details'];
    } else {
    }
  }

  toggleClass() {
    this.isActive = !this.isActive;
  }

  openMatDialogForCaseAssignmnet(PoolName: any) {
    var selectedApplicationIds = this.data
      .filter((data: any) => data.selected)
      .map((data: any) => data.loanApplicationId)
      .join(',');
    if (!selectedApplicationIds) {
      Swal.fire({
        icon: 'info',
        text: 'Please select at least one application ID',
      });
      return;
    }
    const dialogRef = this.dialog.open(caseAssignmnet, {
      data: {
        bucket: PoolName,
        applicationId: selectedApplicationIds,
        userDetails: this.userdetails,
      },
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  toggleAllSelections(event: any) {
    this.allSelected = event.target.checked;
    this.data.forEach((item) => {
      item.selected = this.allSelected;
    });
  }

  onCheckboxChange(item: any, event: any) {
    item.selected = event.target.checked;
    this.checkIfAllSelected();
  }

  checkIfAllSelected() {
    const allChecked = this.data.every((item) => item.selected);
    const noneChecked = this.data.every((item) => !item.selected);
    if (allChecked) {
      this.allSelected = true;
    } else if (noneChecked) {
      this.allSelected = false;
    } else {
      this.allSelected = false;
    }
  }

  async onTabClick(tabName: any) {
    this.activeTab = tabName;
    this.allSelected = false;
    var payload: any = {};
    payload = {
      cid: 1,
      applicationStatus: this.searchFilters?.value.applicationStatus,
      loanAmount:'',
      isPaginationRequired: true,
      customerCategory: this.searchFilters?.value.customerCategory,
      customerType: this.searchFilters?.value.customerType,
      source: '',
      branchId: '',
      currentStage: '',
      fromDate: '20240901',
      toDate: '20240925',
      loanApplicationId: '',
      pageNo: this.pageIndex,
      perPage: this.pageSize,
    };
    let endpoint = '';
    switch (tabName) {
      case 'My Case-Daviation':
        endpoint = 'GetByIdDeviation';
        payload['currentStageLUSR'] = this.userdetails.unitCode;
        break;
      case 'Common-Pool-Daviation':
        endpoint = 'GetAllDeviationAssignment';
        break;
      case 'My Case-Queries':
        endpoint = 'GetByIdQueriesAssignment';
        payload['currentStageLUSR'] = 'processorUser';
        break;
      case 'Common-Pool-Queries':
        endpoint = 'GetAllQueriesAssignment';
        break;
      case 'My Cases':
        endpoint = 'GetAllCaseAssignment';
        payload['currentStageLUSR'] = this.userdetails.unitCode;
        break;
      case 'Common-Pool':
        endpoint = 'GetAllCaseAssignment';
        break;
      default:
        console.log('Unknown tab');
        return;
    }
    const res = await this.fetchDataFromService(endpoint, payload);
    this.handleResponse(res);
  }

  private async fetchDataFromService(endpoint: string, payload: any) {
    try {
      return await this.commonService.getCommonFunction(endpoint, payload);
    } catch (error) {
      console.error('Service call failed:', error);
      return null;
    }
  }

  private handleResponse(res: any) {
    if (res && res.statusCode === 200) {
      this.data = res.data;
      this.totalRecords = res.totalRecords;
    } else {
      this.data = [];
      this.totalRecords = 0;
      this._snackBar.open(res?.message || 'An error occurred', '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.onTabClick(this.activeTab);
  }

  searchData(action: any) {
    if (action == 'clear') {
      this.searchFilters.reset();
    }
    this.onTabClick(this.activeTab);
  }

  navigateTostep(data: any) {
    this.routes.navigate(['/loan-workflow'], {
      queryParams: {
        appLicationId: data?.loanApplicationId,
        id: data?.id,
        stage: data?.currentStage,
      },
    });
  }
}
