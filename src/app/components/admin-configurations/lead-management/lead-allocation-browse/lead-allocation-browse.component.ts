import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeadAllocationComponent } from '../../../../core/widgets/lead-allocation/lead-allocation.component';

@Component({
  selector: 'app-lead-allocation-browse',
  standalone: true,
  imports: [],
  templateUrl: './lead-allocation-browse.component.html',
  styleUrl: './lead-allocation-browse.component.scss'
})
export class LeadAllocationBrowseComponent {

  constructor(private dialog: MatDialog){

  }

  openAllocationDialog() {
    const dialogRef = this.dialog.open(LeadAllocationComponent, {
      data: { },
      height: '300px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

}
