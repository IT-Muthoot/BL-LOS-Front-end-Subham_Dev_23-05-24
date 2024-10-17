import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security/security.service';
import { api_end_point } from '../global/api-endpoint.config';
import { decryptData } from '../services/aes/aes.services';

@Injectable()
export class RequestEncryption implements HttpInterceptor {
  constructor(private ss: SecurityService) {}
  // Incase of getById URL, the request parameter will changed to subRequestData
  withtoken = [api_end_point.login];
  getByIdendPointList = [];
  dms: any = [api_end_point.tokenGen, api_end_point.uploadFile];
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const payloadData: string = JSON.stringify(req.body);
    const encryptedData: string = this.ss.encryptData(payloadData);
    if (this.withtoken.includes(req.url)) {
      const clonedRequest = req.clone({
        body: {
          requestData: encryptedData,
        },
      });
      return next.handle(clonedRequest);
    } else {
      if (this.dms.includes(req.url)) {
        return next.handle(req);
      } else {
        var token: any = localStorage.getItem('accessToken');
        const clonedRequest = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + decryptData(token),
          }),
          body: {
            requestData: encryptedData,
          },
        });
        return next.handle(clonedRequest);
      }
    }
  }
}
