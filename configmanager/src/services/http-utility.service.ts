import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilityService {
  private baseApiUrl: string;

  constructor(private http: HttpClient)
  {
    this.baseApiUrl = environment.apiUrl;
  }

  /**
   * Post
   * @param url
   * @param body
   */

  public post(url: string, body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    });
    return this.http
      .post(this.baseApiUrl + url, body, { headers: headers })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public get(url: string, options?: HttpParams): Observable<any> {
    if (options == undefined) {
      options = new HttpParams();
    }

    let headers = new HttpHeaders({
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    });

    return this.http.get(this.baseApiUrl + url, { headers: headers });
  }

  public getThirdParty(url: string, options?: HttpParams): Observable<any> {
    if (options == undefined) {
      options = new HttpParams();
    }

    let headers = new HttpHeaders({
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      expires: 'Sat, 01 Jan 2000 00:00:00 GMT',
    });

    return this.http.get(url);
  }
}
