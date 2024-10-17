import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-status-change-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './status-change-popup.component.html',
  styleUrl: './status-change-popup.component.scss'
})
export class StatusChangePopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,){
    console.log(data)
  }

  ngOnInit(){
    console.log()
  }

}
