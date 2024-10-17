import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRoleManagementService } from '../../../../services/user-role-management/user-role-management.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonServiceService } from '../../../../services/common-service.service';

@Component({
  selector: 'app-role-management-submit',
  standalone: true,
  imports: [MatTabsModule, MatTooltipModule, CommonModule, ReactiveFormsModule,FormsModule, RouterLink],
  templateUrl: './role-management-submit.component.html',
  styleUrl: './role-management-submit.component.scss'
})
export class RoleManagementSubmitComponent {

  windowScrolled: boolean = false;
  formRoleDetails:any;
  formFuncnalityAccessDetails:any;
  finalSubmit:boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isEditMode: boolean = false;
  mergedData: any;
  accessLevelOption:any;
  recordsArray: any= [];
  masterId:any

  constructor(private _snackBar: MatSnackBar,private fb:FormBuilder, private userRole:UserRoleManagementService, private router: Router, private route:ActivatedRoute, private cs:CommonServiceService){

    this.formFuncnalityAccessDetails = this.fb.group({
      mergedDataId: ['', Validators.required]
    });
    this.getMiscellaneous().then((data) => {
      this.mergedData = data;
      this.mergedData.forEach((data:any) => {
        this.formFuncnalityAccessDetails.addControl('new_customer_loan_app_' + data.id, this.fb.control('', Validators.required));
      });
    });
  }

  async ngOnInit() {
    this.getMiscellaneous();

    this.formRoleDetails = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(4)]],
      roleDescription: ['', [Validators.required, Validators.minLength(4)]]
    });
    

    this.route.params.subscribe(async params => {
      // if (params['id']) {
      //   this.isEditMode = true;
      //   let payload:any = {
      //     roleId: Number(params['id'])
      //   };
      //   let res:any = await this.userRole.roleGetById(payload);
      //   if(res.statusCode == 200){
      //     this.formRoleDetails = this.fb.group({
      //       roleName: [res.roleName, [Validators.required, Validators.minLength(4)]],
      //       roleDescription: [res.description, [Validators.required, Validators.minLength(4)]],
      //     });
      //     // Initialize the functionality access form
      //     this.formFuncnalityAccessDetails = this.fb.group({
      //       mergedDataId: ['', Validators.required]
      //     });
      //     // Fetch the miscellaneous data
      //     this.getMiscellaneous().then((data) => {
      //       this.mergedData = data;
      //       // Loop through each item in the merged data and add form controls
      //       this.mergedData.forEach((data: any) => {
      //         const accessValue = this.getAccessValueFromResponse(res.rolePrivilage, data.id); // Find value from response
      //         // Add control and set the value based on the response
      //         this.formFuncnalityAccessDetails.addControl(
      //           'new_customer_loan_app_' + data.id, 
      //           this.fb.control(269, Validators.required)
      //         );
      //       console.log(this.formFuncnalityAccessDetails)
      //       });
      //     });

      //   } else {
      //   }
      // }

      if (params['id']) {
        this.isEditMode = true;
        this.masterId = params['id'];
        let payload: any = { roleId: Number(params['id']) };
        let res: any = await this.userRole.roleGetById(payload);
        if (res.statusCode === 200) {
          // Instead of creating a new form group, use patchValue
          this.formRoleDetails.patchValue({
            roleName: res.roleName,
            roleDescription: res.description
          });
    
          // Initialize functionality access form and fetch data
          this.formFuncnalityAccessDetails = this.fb.group({
            mergedDataId: ['', Validators.required]
          });
    
          // Fetch miscellaneous data
          this.getMiscellaneous().then((data) => {
            this.mergedData = data;
    
            // Loop through mergedData and add controls based on res.rolePrivilage
            this.mergedData.forEach((data: any) => {
              const accessValue = this.getAccessValueFromResponse(res.rolePrivilage, data.id);
              this.formFuncnalityAccessDetails.addControl(
                'new_customer_loan_app_' + data.id,
                this.fb.control(accessValue, Validators.required) // Set correct value here
              );
            });
          });
        }
      }
    });
  }

  getAccessValueFromResponse(response: any, dataId: number): string {
    const foundItem = response.find((item: any) => item.moduleId === dataId);
    return foundItem ? foundItem.accessLabelId : ''; // Return the access level or empty string if not found
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: "StageName,Previlage,StageAccessLevel"   
    };
    let res: any = await this.cs.getCommonFunction(
      'DropDown',
      obj
    );
    if(res.statusCode==200){
      var stageName = res.data.StageName;
      var privillages = res.data.Previlage;
      this.accessLevelOption = res.data.StageAccessLevel;
      return this.mergedData = stageName.concat(privillages);
    }else{
    }
  }

  trackByFn(index: number, item: any) {
    return item.id; // or any unique identifier for your items
  }

  onRadioChange(privilage:any, accessId:any){
    const existingIndex = this.recordsArray.findIndex((record:any) => record.moduleId == privilage);
    if (existingIndex > -1) {
      this.recordsArray[existingIndex] = { moduleId:privilage, accessLabelId:accessId, cid:1, lusr:"MF58957" };
    } else {
      this.recordsArray.push({ moduleId:privilage, accessLabelId:accessId, cid:1, lusr:"MF58957" });
    }
  }

  async formSubmit(){
    this.finalSubmit = true;
    if(this.finalSubmit &&this.formFuncnalityAccessDetails.invalid &&this.formRoleDetails.invalid){
      return
    } else {
      var roleName = this.formRoleDetails.value.roleName
      var roleDescription = this.formRoleDetails.value.roleDescription
      var payload = {
        cid: 1,
        roleName: roleName,
        description: roleDescription,
        status: 1,
        lusr: "MF64479",
        RoleModule : this.recordsArray
      }
      if(this.isEditMode){
        let data = {...payload, id: this.masterId}
        let res:any = await this.userRole.roleUpdate(data);
        if(res.statusCode == 200){
          this.router.navigateByUrl('/role-management-list')
          this._snackBar.open('Data updated successfully!!', '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
        }
      } else {
        let res:any = await this.cs.getCommonFunction('InsertRole', payload);
        if(res.statusCode == 200){
          this.router.navigateByUrl('/role-management-list')
          this._snackBar.open(res.message, '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } else {
        }
      }
    }
  }
}
