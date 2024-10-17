
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_end_point } from '../../global/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class CreditCommitteeService {

  constructor(private http:HttpClient) { }

  public async getAllCreditCommitteData(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.getAllCreditCommitteData, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async filterCreditCommitteData(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.filterCreditCommittee, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async commonAPICall(payloadData: any, url:string) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.commonUrl+url, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }
}
