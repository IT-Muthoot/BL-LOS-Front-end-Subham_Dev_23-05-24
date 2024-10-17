import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api_end_point } from '../../global/api-endpoint.config';

@Injectable({
  providedIn: 'root',
})
export class DmsService {
  constructor(private http_call: HttpClient) {}

  public async getDmsAuthToke() {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/x-www-form-urlencoded,',
          AuthToken: 'LKUKGbifrw9m8+ja/dYwo989zYIv7kSnAgvS1BSTclM=',
        }),
      };
      const response = await this.http_call
        .get(api_end_point.tokenGen, options)
        .toPromise();
      return response;
    } catch (error) {
      return error;
    }
  }

  public async uploadFile(payload:any,token:any) {
    try {
      const options = {
        headers: new HttpHeaders({
          Accept: 'application/x-www-form-urlencoded,',
          AuthToken: 'LKUKGbifrw9m8+ja/dYwo989zYIv7kSnAgvS1BSTclM=',
          Authorization: `Bearer ${token}`
        }),
      };
      const response = await this.http_call
        .post(api_end_point.uploadFile, payload, options)
        .toPromise();
      return response;
      // return this.http_call.post(api_end_point.uploadFile, payload, options)
    } catch (error) {
      return error;
    }
  }

  // public async getDmsUploadDoc(payload: any, token: string) {
  //   try {
  //     const options = {
  //       headers: new HttpHeaders({
  //         Accept: 'application/vnd.ms-excel',
  //         Authorization: `Bearer ${token}`,
  //         AuthToken: '9/rHffasCX1sxCQxT/eRLR6ZKkv9IL5In+jRfF68X68=',
  //       }),
  //       responseType: 'blob' as const,
  //     };
  //     const response: any = await this.http_call
  //       .post(api_end_point.downloadFile, payload, options)
  //       .toPromise();

  //     const contentType = response.type;
  //     let fileName = '';

  //     if (contentType === 'application/vnd.ms-word') {
  //       fileName = 'file.docx';
  //     } else if (
  //       contentType ===
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //     ) {
  //       fileName = 'file.xlsx';
  //     } else if (contentType === 'image/jpeg') {
  //       fileName = 'file.jpg';
  //     } else if (contentType === 'image/png') {
  //       fileName = 'file.png';
  //     } else if (contentType === 'application/zip') {
  //       fileName = 'file.zip';
  //     } else if (contentType === 'text/plain') {
  //       fileName = 'file.txt';
  //     } else {
  //       const contentArray = contentType.split('/');
  //       if (contentArray.length === 2) {
  //         fileName = `file.${contentArray[1]}`;
  //       }
  //     }

  //     // Download the file
  //     const blobUrl = URL.createObjectURL(response);
  //     const link = document.createElement('a');
  //     link.href = blobUrl;
  //     link.download = fileName;
  //     link.style.display = 'none';
  //     document.body.appendChild(link);
  //     link.click();
  //     URL.revokeObjectURL(blobUrl);
  //     document.body.removeChild(link);

  //     return { response, fileName };
  //   } catch (error) {
  //     return error;
  //   }
  // }
}
