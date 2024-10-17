import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterOutlet, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { raiseDeviation } from '../../../core/widgets/deviation/deviation.component';
import { raiseQueries } from '../../../core/widgets/queries/queries.component';
import { raiseComments } from '../../../core/widgets/comments/comments.component';
import { sendBackStage } from '../../../core/widgets/send-back/sendbackStage.component';
import { holdStage } from '../../../core/widgets/hold/holdStage.component';

@Component({
  selector: 'app-workflow-stepper',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule,FormsModule],
  templateUrl: './workflow-stepper.component.html',
  styleUrl: './workflow-stepper.component.scss',
})
export class WorkflowStepperComponent {
  actualStage:any;
  appLicationId:any;
  currentStage:any;
  dropDownSelectedVal:any='Yearly';
  activeStep = 2 - 1;
  steps = [
    {
      title: 'Loan Application Initiation',
      form: 'loanApplicationForm',
      stageId:'621',
      completed: false,
    },
    {
      title: 'Document Verification',
      form: 'documentVerificationForm',
      stageId:'622',
      completed: false,
    },
    { title: 'Data Enrichment',
       form: 'dataEnrichmentForm', 
       stageId:'623',
       completed: false },
    {
      title: 'Credit Underwriting',
      form: 'creditUnderwritingForm',
      stageId:'624',
      completed: false,
    },
    {
      title: 'Credit Committee Approval',
      form: 'creditCommitteeForm',
      stageId:'625',
      completed: false,
    },
    {
      title: 'Final Document Check',
      form: 'finalDocumentCheckForm',
      stageId:'626',
      completed: false,
    },
  ];

  loanApplicationForm!: FormGroup;
  documentVerificationForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog,private activeRoute:ActivatedRoute) {
   this.activeRoute.queryParams.subscribe((data:any)=>{
this.appLicationId=data.appLicationId
this.actualStage=data.stage
   });
  }

  ngOnInit(): void {
    this.loanApplicationForm = this.fb.group({
      field1: ['', Validators.required],
      field2: ['', Validators.required],
    });

    this.documentVerificationForm = this.fb.group({
      document: ['', Validators.required],
    });
  }

  getStepClass(index: number): string {
    if (index < this.activeStep) return 'completed st-step';
    if (index === this.activeStep) return 'active st-step';
    return 'st-step';
  }

  // Get the correct image for each step
  getStepImage(index: number): string {
    if (index < this.activeStep) return 'assets/images/Done.svg';
    if (index === this.activeStep) return 'assets/images/On-Going-Process.svg';
    return 'assets/images/Waiting.svg';
  }

  goToStep(index: number): void {
    if (index <= this.activeStep) this.activeStep = index;
  }

  onSubmit(): void {
    if (
      this.steps[this.activeStep].form === 'loanApplicationForm' &&
      this.loanApplicationForm.valid
    ) {
      this.steps[this.activeStep].completed = true;
      this.activeStep++;
    }
  }

  openModalBox(modalName: any) {
    if (modalName == 'raiseDeviation') {
      const dialogRef = this.dialog.open(raiseDeviation, {
        height: '500px',
        width: '1200px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
    if (modalName == 'raiseQueries') {
      const dialogRef = this.dialog.open(raiseQueries, {
        height: '500px',
        width: '1200px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
    if (modalName == 'comments') {
      const dialogRef = this.dialog.open(raiseComments, {
        height: '500px',
        width: '1200px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
    if (modalName == 'sendBackStage') {
      const dialogRef = this.dialog.open(sendBackStage, {
        height: '500px',
        width: '1200px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
    if (modalName == 'holdStage') {
      const dialogRef = this.dialog.open(holdStage, {
        height: '500px',
        width: '1200px',
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    }
  }

   accordionSections = [
    { title: 'Business KYC', isOpen: false, contentType: 'table' },
    { title: 'Business Financial Document', isOpen: false, contentType: 'other' },
    { title: 'Individual KYC Documents', isOpen: false, contentType: 'other' },
    { title: 'Individual Financial Documents', isOpen: false, contentType: 'other' }
  ];

  documents = [
    { type: 'Certificate of Incorporation' },
    { type: 'GST Registration Certificate' },
    { type: 'Income Tax Registration Certificate' },
    { type: 'UDYAM Registration Certificate' }
  ];

  toggleAccordion(section: any) {
    section.isOpen = !section.isOpen;
  }
}
