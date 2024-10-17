import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_end_point } from '../../global/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  async login(payload:any){
    try {
      const headers = new HttpHeaders();
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
      };
      var response;
      response = await this.http
        .post(api_end_point.login, payload)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }
}
