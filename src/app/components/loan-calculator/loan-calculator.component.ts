import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatNativeDateModule } from '@angular/material/core'; // For Datepicker support
import { AppComponent } from '../../app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
interface AmortizationData {
  sNo: number;
  year: number;
  principle: number;
  interest: number;
  total: number;
  balance: number;
}
@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [
    MatSliderModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatTableModule,
    MatButtonModule, CommonModule, FormsModule, ReactiveFormsModule,
    AppComponent,MatFormFieldModule
  ],
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'] // Fix the property name to 'styleUrls'
})
export class LoanCalculatorComponent {
  loanAmount: number = 400000;
  loanTenure: number = 14; // in years or months
  loanTenureType: string = 'Years';
  interestRate: number = 14;
  loanStartDate: Date = new Date();

  totalAmount: number = 463586;
  interestPayable: number = 63586;
  monthlyEMI: number = 14353;

  // Missing amortizationType property
  amortizationType: string = 'Yearly'; 
   // Default value, can be 'Monthly' or 'Yearly'
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `{value}`;
  }
  amortizationData: AmortizationData[] = [
    { sNo: 1, year: 1, principle: 400000, interest: 63586, total: 463586, balance: 445856 }
  ];

  displayedColumns: string[] = ['sNo', 'year', 'principle', 'interest', 'total', 'balance'];

  get percentage(): number {
    return (this.interestRate / 35) * 100; // To update the circular progress bar based on interest rate
  }
}
