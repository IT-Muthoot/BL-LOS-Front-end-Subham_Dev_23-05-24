import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {RouterLink, RouterOutlet, RouterLinkActive} from '@angular/router'

@Component({
  selector: 'app-employee-unit-mapping',
  standalone: true,
  imports: [MatDatepickerModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './employee-unit-mapping.component.html',
  styleUrl: './employee-unit-mapping.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EmployeeUnitMappingComponent {

}
