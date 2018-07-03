import { ApplicationService } from 'services';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'pd-login',
  templateUrl: './components.pd-login.html',
  styleUrls: [
      './components.pd-login.css'
  ]
})
export class PlanetDefenderLoginComponent implements OnInit {

  public userName: string;
  public password: string;
  public errorMessage: string;
  public isRegister: boolean = false;

  constructor(@Inject(ApplicationService) private applicationService: ApplicationService) { }

  ngOnInit() {
  }

  login() {
    this.errorMessage = '';
    const authenticationService = this.applicationService.GetAuthenticationService();
    authenticationService.Authenticate(this.userName, this.password).catch(err => {
      this.errorMessage = 'Autenticazione fallita';
    });
  }

  register() {
    this.errorMessage = '';
    const authenticationService = this.applicationService.GetAuthenticationService();
    authenticationService.Register(this.userName, this.password).catch(err => {
      this.errorMessage = 'Registrazione fallita';
    });
  }

  showRegister() {
    this.isRegister = true;
  }

  showLogin() {
    this.isRegister = false;
  }

}
