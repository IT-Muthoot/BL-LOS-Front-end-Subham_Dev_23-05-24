import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { api_end_point } from '../global/api-endpoint.config';
import { decryptData } from './aes/aes.services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  public eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http:HttpClient, private router:Router) { }
 
  async getCommonFunction(endPoint:String,payload:Object){
    try {
      const headers = new HttpHeaders();
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      };
      var response;
      response = await this.http
        .post(api_end_point.commonUrl+endPoint, payload)
        .toPromise();
      return response;
    } catch (error) {
      return error
    }
  }

  async signOut() {
    if(localStorage.getItem('userDetails')){
      let userData:any = localStorage.getItem('userDetails');
      let userDetails=JSON?.parse(decryptData(userData));
    
      const payLoad: any = {
        employeeId: userDetails.employeeId,
        cid: 1,
      };
      try {
        const res: any = await this.http.post(api_end_point.commonUrl+'LogOut', payLoad).toPromise();
        if (res.statusCode === 200) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Error during sign out', error);
      }
    }
  }

}
