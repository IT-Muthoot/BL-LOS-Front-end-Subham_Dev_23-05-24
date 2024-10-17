import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonServiceService } from '../../../services/common-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-allocation',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule],
  templateUrl: './case-assignment.component.html',
  styleUrl: './case-assignment.component.scss',
})
export class caseAssignmnet {
  data: any;
  stageId: any;
  isAcknowledge: boolean = true;
  branchId: any;
  branchName: any;
  employeeCode: any;
  branchDetails: any = [];
  userDetails: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public option: any,
    private commonService: CommonServiceService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.data = option;
    this.branchId = this.data.userDetails?.unitCode;
    this.branchId = this.data.userDetails?.unitName;
    this.employeeCode = this.data.userDetails?.employeeId;
  }

  async ngOnInit() {
    await this.getBranchData();
    await this.getUserData();
  }

  async getBranchData() {
    const payload = {
      cid: 1,
      pageNo: 1,
      pageSize: 10000,
    };
    let res: any = await this.commonService.getCommonFunction(
      'GetAllBranchConfig',
      payload
    );
    if (res.statusCode == 200) {
      this.branchDetails = res.branchConfigDataTable;
    } else {
      this.branchDetails = [];
    }
  }
  async getUserData() {
    const payload = {
      cid: 1,
      pageNo: 1,
      pageSize: 10000,
      employeeId: '',
    };
    let res: any = await this.commonService.getCommonFunction(
      'GetAllUsers',
      payload
    );
    if (res.statusCode == 200) {
      this.userDetails = res.data;
    } else {
      this.userDetails = [];
    }
  }

  async updateApplicationStatus() {
    var endpoint;
    switch (this.data.bucket) {
      case 'Common-Pool-Daviation':
        endpoint = 'AssignDeviationAssignment';
        break;
      case 'Common-Pool-Queries':
        endpoint = 'UpdateQueriesAssignment';
        break;
      case 'Common-Pool':
        endpoint = 'UpdateCaseAssignment';
        break;
      default:
        console.log('Unknown tab');
        return;
    }
    var payload: any = {
      cid: 1,
      loanApplicationId: this.data.applicationId,
      assignedBranchName: this.branchId,
      AssignedBranchId: this.branchId,
      LUSR: '1111',
      currentStage: '634',
      currentStageLUSR: this.employeeCode,
      assignTOLUSR: this.employeeCode,
      ApplicationStatus: 635,
    };
    console.log(payload);
    
    let res: any = await this.commonService.getCommonFunction(
      endpoint,
      payload
    );
    if (res.statusCode == 200) {
      this.dialog.closeAll();
      this._snackBar.open(res?.message, '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    } else {
      this.dialog.closeAll();
      this._snackBar.open(res?.message || 'An error occurred', '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
  }

  onRadioChange(value: string) {
    if (value === 'acknowledge') {
      this.isAcknowledge = true;
      this.branchId = this.data.userDetails?.unitCode;
      this.employeeCode = this.data.userDetails?.unitCode;
    } else {
      this.isAcknowledge = false;
      this.branchId = '';
      this.employeeCode = '';
    }
  }

  async assignApplicationId() {
    var payload: any = {
      loanApplicationId: this.data.applicationId,
      assignedBranchName: 'Blr-1',
      AssignedBranchId: '1111',
      LUSR: '1111',
      currentStage: '634',
      currentStageLUSR: '1111',
      assignTOLUSR: '1111',
      ApplicationStatus: 635,
    };
    let res: any = await this.commonService.getCommonFunction(
      'UpdateCaseAssignment',
      payload
    );
    if (res.statusCode == 200) {
      this.dialog.closeAll();
      this._snackBar.open(res?.message, '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    } else {
      this.dialog.closeAll();
      this._snackBar.open(res?.message || 'An error occurred', '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
      });
    }
  }
}
