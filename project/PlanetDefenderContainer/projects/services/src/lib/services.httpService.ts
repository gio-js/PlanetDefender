import { PRIMARY_SERVICE_ENDPOINT, AuthenticationInfo } from 'planet-defender-core';
import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

  private authenticationInfo: AuthenticationInfo;

  constructor(private http: HttpClient) { }

  public Post(method: string, body: any): Promise<any>  {
    return this.http.post(`${PRIMARY_SERVICE_ENDPOINT}${method}`, body, this.getHeaders()).toPromise();
  }

  public Get(method: string, queryString: string): Promise<any>  {
    let url = `${PRIMARY_SERVICE_ENDPOINT}${method}`;
    if (queryString) {
      url += "?" + queryString;
    }
    return this.http.get(url, this.getHeaders()).toPromise();
  }

  private getHeaders(): any {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    // if (this.authenticationInfo) {
    //   headers.append('x-access-token', `${this.authenticationInfo.AuthenticationToken}`);
    // }

    // const options = new RequestOptions({ headers: headers });
    // return options;
    if (this.authenticationInfo) {
      return { headers: new HttpHeaders().set('x-access-token', this.authenticationInfo.AuthenticationToken) };
    }

    return undefined;
  }

  public SetAuthenticationInfo(authenticationInfo: AuthenticationInfo) {
    this.authenticationInfo = authenticationInfo;
  }

}
