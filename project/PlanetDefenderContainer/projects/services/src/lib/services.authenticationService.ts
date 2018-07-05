import { AuthenticationInfo, IAuthenticationService } from 'planet-defender-core';
import { Injectable, Inject } from "@angular/core";
import { HttpService } from './services.httpService';

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  private authenticationInfo: AuthenticationInfo;
  private isStatisticsPageView = false;
  private isGamePageView = false;

  constructor(private http: HttpService) { }

  Register(email: string, password: string): Promise<AuthenticationInfo> {
    return this.http.Post("/users/register", {
      email: email,
      password: password
    }).then(info => {
      this.authenticationInfo = info;

      return info;
    });
  }

  Authenticate(email: string, password: string): Promise<AuthenticationInfo> {
    return this.http.Post("/authentication/login", {
      email: email,
      password: password
    }).then(info => {
      this.SetAuthenticationInfo(info);

      return info;
    });
  }

  public IsAuthenticated(): boolean {
    return (this.authenticationInfo != null);
  }

  public GetAuthenticationInfo(): AuthenticationInfo {
    return this.authenticationInfo;
  }

  public SetAuthenticationInfo(auth: AuthenticationInfo) {
    this.authenticationInfo = auth;
    this.http.SetAuthenticationInfo(auth);
  }
}
