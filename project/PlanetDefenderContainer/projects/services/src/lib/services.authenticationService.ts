import { AuthenticationInfo, IAuthenticationService } from 'planet-defender-core';
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  private authenticationInfo: AuthenticationInfo;

  constructor(@Inject() private http: HttpService) { }

  Register(email: string, password: string): Promise<AuthenticationInfo> {
    this.http.Post("/users/register", {

    })
    PRIMARY_SERVICE_ENDPOINT
    throw new Error("Method not implemented.");
  }

  Authenticate(email: string, password: string) {
    throw new Error("Method not implemented.");
  }

  public IsAuthenticated(): boolean {
    return (this.authenticationInfo != null);
  }

  public GetAuthenticationInfo(): AuthenticationInfo {
    return this.authenticationInfo;
  }

}
