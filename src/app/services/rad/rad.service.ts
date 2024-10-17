import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_end_point } from '../../global/api-endpoint.config';

@Injectable({
  providedIn: 'root'
})
export class RadService {

  constructor(private http:HttpClient) { }

  public async radRatioAnalysisScoreBrowse(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radRatioAnalysisScoreBrowse, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisScoreFilter(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radScoreFilter, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisScoreSubmit(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radScoreSubmit, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisScoreGetById(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radScoreGetById, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisScoreUpdate(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radScoreUpdate, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  // Configuration 2

  public async radRatioAnalysisWeightageBrowse(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radRatioAnalysisWeightageBrowse, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisWeightageFilter(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radWeightageFilter, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisWeightageGetById(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radWeightageGetById, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async ratioAnalysisWeightageUpdate(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radWeightageUpdate, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async radWeightageStatusUpdate(payloadData: any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/json, text/plain, */*',
        }),
      };
      const response = await this.http
        .post(api_end_point.radWeightageStatusUpdate, payloadData, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

}