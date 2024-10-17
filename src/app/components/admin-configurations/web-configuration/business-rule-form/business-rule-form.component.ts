import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonServiceService } from '../../../../services/common-service.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-rule-form',
  standalone: true,
  imports: [MatTabsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './business-rule-form.component.html',
  styleUrl: './business-rule-form.component.scss',
})
export class BusinessRuleFormComponent {
  miscellaneousValue: any = [];
  form!: FormGroup;
  productName:any=''
  constructor(
    private _cs: CommonServiceService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  riskLevels = [
    {
      level: 'High Risk',
      cbScoreApplicant: '',
      cbScoreBusiness: '',
      cbScoreCoApplicant: '',
      bankStatementAnalysis: '',
      financialTrendScore: '',
      
    },
    {
      level: 'Medium Risk',
      cbScoreApplicant: '',
      cbScoreBusiness: '',
      cbScoreCoApplicant: '',
      bankStatementAnalysis: '',
      financialTrendScore: '',
    },
    {
      level: 'Low Risk',
      cbScoreApplicant: '',
      cbScoreBusiness: '',
      cbScoreCoApplicant: '',
      bankStatementAnalysis: '',
      financialTrendScore: '',
    },
  ];

  bankStatementOptions = ['Option1', 'Option2', 'Option3', 'Option4'];

  documentParameters: any = [];
  documentParameter = '';
  trendNatureOptions: any = [
    { id: 1, title: 'Positive' },
    { id: 2, title: 'Neutral' },
    { id: 3, title: 'Negative' },
  ];
  selectedTrendNature = '';
  score = '';

  addDocumentParameter() {
    if (this.documentParameter && this.selectedTrendNature && this.score) {
      this.documentParameters.push({
        parameter: this.documentParameter,
        trendNature: this.trendNatureOptions.find(
          (item: { id: string }) => item.id === this.selectedTrendNature
        )?.title,
        score: this.score,
      });
      this.documentParameter = '';
      this.selectedTrendNature = '';
      this.score = '';
    }
  }

  removeDocumentParameter(index: number) {
    this.documentParameters.splice(index, 1);
  }
  ngOnInit() {
    this.getMiscellaneous();
  }

  async getMiscellaneous() {
    var obj = {
      Cdval: 'Product,ProductType,TrendNature',
    };
    let res: any = await this._cs.getCommonFunction('DropDown', obj);
    if (res.statusCode == 200) {
      this.miscellaneousValue = res.data;
    } else {
      this.miscellaneousValue = [];
    }
  }

  async submit() {
    const populatedObject = {
      cid: 1, 
      productId: 1, // Replace with actual product ID
      productName: this.productName, // Replace with actual product name
      status: 0, // Default or replace with actual status
      lusr: "MF58957", // Replace with actual user identifier
      ludt: new Date().toISOString().split('T')[0], // Current date in string format
      lutm: new Date().toTimeString().split(' ')[0], // Current time in string format
      breRiskConfigurationDetails: [
        // External Credit Score Risk
        {
          cid: 1, // Replace with actual value if needed
          id: 0, // Replace with actual ID if applicable
          brEid: 0, // Replace with actual brEid
          breType: 1, // External Credit Score Risk (breType = 1)
          riskType:  0, // Replace with form value
          analysisScoreType: 0, // Replace with form value
          analysisScore:  0, // Use the value from External Credit Score Risk
          status: 0, // Default or replace with actual status
          lusr: "MF58957", // Replace with actual user identifier
          ludt: new Date().toISOString().split('T')[0], // Current date
          lutm: new Date().toTimeString().split(' ')[0], // Current time
          breRiskConfigurationDocumentParameterDetails: [] // No document parameters for this tab
        },
        // Bank Statement Analysis
        {
          cid: 1, // Replace with actual value if needed
          id: 0, // Replace with actual ID if applicable
          brEid: 0, // Replace with actual brEid
          breType: 2, // Bank Statement Analysis (breType = 2)
          riskType:  0, // Replace with form value
          analysisScoreType:  0, // Replace with form value
          analysisScore: 0, // Use the value from Bank Statement Analysis
          status: 0, // Default or replace with actual status
          lusr: "MF58957", // Replace with actual user identifier
          ludt: new Date().toISOString().split('T')[0], // Current date
          lutm: new Date().toTimeString().split(' ')[0], // Current time
          breRiskConfigurationDocumentParameterDetails: [] // No document parameters for this tab
        },
        // Financial Trend Analysis
        {
          cid: 1, // Replace with actual value if needed
          id: 0, // Replace with actual ID if applicable
          brEid: 0, // Replace with actual brEid
          breType: 3, // Financial Trend Analysis (breType = 3)
          riskType: 0, // Replace with form value
          analysisScoreType: 0, // Replace with form value
          analysisScore: 0, // Use the value from Financial Trend Analysis
          status: 0, // Default or replace with actual status
          lusr: "MF58957", // Replace with actual user identifier
          ludt: new Date().toISOString().split('T')[0], // Current date
          lutm: new Date().toTimeString().split(' ')[0], // Current time
          // Document parameters for Financial Trend Analysis
          breRiskConfigurationDocumentParameterDetails: this.documentParameters.map((docParam: { parameter: any; trendNature: string; score: any; }) => ({
            cid: 1, // Replace with actual value if needed
            id: 0, // Replace with actual ID if applicable
            brEid: 0, // Replace with actual brEid
            breType: 3, // Financial Trend Analysis (breType = 3)
            parameters: docParam.parameter || 0, // Replace with the actual parameter value
            trendNatureIncrease: docParam.trendNature === 'Positive' ? 1 : 0, // Set based on trend nature
            increaseScore: docParam.trendNature === 'Positive' ? docParam.score : 0, // Set score for increase
            trendNatureDecrease: docParam.trendNature === 'Negative' ? 1 : 0, // Set for decrease
            decreaseScore: docParam.trendNature === 'Negative' ? docParam.score : 0, // Set score for decrease
            status: 0, // Default or replace with actual status
            lusr: "MF58957", // Replace with actual user identifier
            ludt: new Date().toISOString().split('T')[0], // Current date
            lutm: new Date().toTimeString().split(' ')[0], // Current time
          }))
        }
      ]
    };

    var res: any = await this._cs.getCommonFunction(
      'BRERiskConfigInsert',
      populatedObject
    );
    if (res.statusCode == 200) {
      alert('sucess');
      this._router.navigate(['/business-risk-list'])
    } else {
      alert(res.message);
      // this._router.navigate(['/business-risk-list'])
    }
  }
}
