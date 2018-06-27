/**
 * Authentication service
 */
export interface IAuthenticationService {

    Register(email: string, password: string);

    Authenticate(email: string, password: string);

}