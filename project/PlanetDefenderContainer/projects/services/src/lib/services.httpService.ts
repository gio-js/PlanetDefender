import { PRIMARY_SERVICE_ENDPOINT, AuthenticationInfo } from 'planet-defender-core';
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  private authenticationInfo: AuthenticationInfo;

  constructor(private http: HttpClient) { }

  public Post(method: string, body: any): Promise<any>  {
    return this.http.post(`${PRIMARY_SERVICE_ENDPOINT}${method}`, body).toPromise();
  }

  public Get(method: string, queryString: string): Promise<any>  {
    let url = `${PRIMARY_SERVICE_ENDPOINT}${method}`;
    if (queryString) {
      url += "?" + queryString;
    }
    return this.http.get(url).toPromise();
  }

  public SetAuthenticationInfo(authenticationInfo: AuthenticationInfo) {
    this.authenticationInfo = authenticationInfo;
  }

}
