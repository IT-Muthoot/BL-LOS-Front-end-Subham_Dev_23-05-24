import { ChangeDetectionStrategy,Component, model } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonServiceService } from '../../../../services/common-service.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-holiday-config-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,MatCardModule,MatDatepickerModule,CommonModule],
  templateUrl: './holiday-config-form.component.html',
  styleUrl: './holiday-config-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HolidayConfigFormComponent {
  selected: Date | null = null;
  formattedDate: string = '';
  holidayConfigForm:any;
  finalSubmitted:boolean = false;
  warningMessage:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  allBranch:any = [];
  constructor(private _fb:FormBuilder, private _cs:CommonServiceService, private _snackBar:MatSnackBar, private _router:Router){
    this.getBranch();
  }

  ngOnInit(){
    
    this.holidayConfigForm = this._fb.group({
      levelId:['', Validators.required],
      bankId:['', Validators.required],
      branchName:['', Validators.required],
      branchId:['', Validators.required],
      festival:['', Validators.required],
      holiday:['', Validators.required]
    })

    this.holidayConfigForm.get('branchId')?.valueChanges.subscribe((selectedBranchId:any) => {
      const selectedBranch = this.allBranch.find((branch: any) => branch.bankCode === selectedBranchId);
      if (selectedBranch) {
        this.holidayConfigForm.patchValue({
          branchName: selectedBranch.branchName
        });
      }
    });
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "CustomerCategory,CustomerType,AllowedLoanType,productId"   
    };
    let res: any = await this._cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
    }else{
    }

  }
  convertDateToYYYYMMDD(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
  }
  ngDoCheck() {
    if (this.selected) {
      this.formattedDate = this.convertDateToYYYYMMDD(this.selected);
    }
  }

  async getBranch() {
    const payload = {
      cid: 1,
      pageNo: 1,
      pageSize: 500
    }
    let res:any = await this._cs.getCommonFunction('GetAllBranchConfig', payload);
    if(res.statusCode == 200){
      this.allBranch = res.branchConfigDataTable;
      console.log(this.allBranch);
      
    } else {
    }
  }

  async finalSubmit(){
    this.finalSubmitted = true;
    if(this.finalSubmitted && this.holidayConfigForm.invalid && !this.formattedDate){
      if(!this.formattedDate){
        this.warningMessage = true;
        return;
      }
      return;
    } else {
      var payload = {
        ...this.holidayConfigForm.value,
        lusr: "john_doe",
        status: 266,
        holiday:this.formattedDate
      }
      console.log(payload);
      let res:any = await this._cs.getCommonFunction('InsertHolidayConfig', payload);
      if(res.statusCode == 200){
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this._router.navigate(['/holiday-config-form'])
      } else {
        this._snackBar.open(res.message, '', {
          duration: 3000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    }
  }

}
