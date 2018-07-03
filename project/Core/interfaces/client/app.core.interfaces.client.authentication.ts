import { AuthenticationInfo } from "../../model/business/app.core.model.business.authenticationInfo";

/**
 * Authentication service
 */
export interface IAuthenticationService {

    Register(email: string, password: string) : Promise<AuthenticationInfo>;

    Authenticate(email: string, password: string) : Promise<AuthenticationInfo>;

    IsAuthenticated(): boolean;

    GetAuthenticationInfo(): AuthenticationInfo;

    SetAuthenticationInfo(auth: AuthenticationInfo);
}