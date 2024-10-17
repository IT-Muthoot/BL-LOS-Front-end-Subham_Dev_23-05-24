import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_end_point } from '../../global/api-endpoint.config';


@Injectable({
  providedIn: 'root'
})
export class UserRoleManagementService {

  constructor(private http:HttpClient) { }

  public async getRoleList(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.roleList, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async roleSubmit(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.roleSubmit, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async roleListFilter(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.roleListFilter, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async roleGetById(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.roleGetById, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async roleUpdate(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.roleUpdate, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }
}


