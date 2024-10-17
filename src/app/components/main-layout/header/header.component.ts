import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { decryptData } from '../../../services/aes/aes.services';
import { Router } from '@angular/router';
import { CommonServiceService } from '../../../services/common-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userDetails:any;

  constructor(private routes:Router, private _cs:CommonServiceService){}

  ngOnInit(){
    let userData:any
    if(localStorage.getItem('userDetails')){
      userData = localStorage.getItem('userDetails');
      this.userDetails=JSON?.parse(decryptData(userData));
    } else {
      userData = {};
      this.userDetails = ''
    }
    // console.log(typeof(userData),userData);
    // console.log('decryptData(userData)--',decryptData(userData));
    
    
  }

  async signOut(){
    debugger
    // let payLoad:any = {
    //   employeeId:this.userDetails.employeeId,
    //   cid:1
    // }
    // let res:any = await this._cs.getCommonFunction('LogOut', payLoad);
    // console.log(res)
    //   if(res.statusCode == 200){
    //     localStorage.clear();
    //     this.routes.navigate(['/login'])
    //   } else {
    //   }
    this._cs.signOut();
  }

}
