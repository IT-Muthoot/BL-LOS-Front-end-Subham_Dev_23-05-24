import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-status-active-inactive',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './status-active-inactive.component.html',
  styleUrl: './status-active-inactive.component.scss'
})
export class StatusActiveInactiveComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<StatusActiveInactiveComponent>){
    console.log(data)
  }

  ngOnInit(){
    console.log()
  }
  onConfirm(): void {
    this.dialogRef.close('confirm');
  }

}
