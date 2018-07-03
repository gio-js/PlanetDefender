import { CommandService } from './services.commandService';
import { GameArena, ICommandService, IAuthenticationService } from 'planet-defender-core';
import { UiService } from './services.uiServices';
import { Injectable } from '@angular/core';
import { IGameService } from 'planet-defender-core';
import { GameHttpService } from './services.gameHttpService';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './services.httpService';
import { AuthenticationService } from './services.authenticationService';

@Injectable()
export class ApplicationService {

  private gameService: IGameService;
  private uiService: UiService;
  private currentGameArena: GameArena;
  private commandService: ICommandService;
  private authenticationService: IAuthenticationService;
  private httpService: HttpService;

  constructor(private http: HttpClient) {
    this.httpService = new HttpService(http);
    this.gameService = new GameHttpService(this.httpService);
    this.commandService = new CommandService(this);
    this.authenticationService = new AuthenticationService(this.httpService);
  }

  public GetGameService(): IGameService {
    return this.gameService;
  }

  public GetUIService(): UiService {
    return this.uiService;
  }

  public GetCurrentGameArena(): GameArena {
    return this.currentGameArena;
  }

  public SetCurrentGameArena(gameArena: GameArena) {
    this.currentGameArena = gameArena;
    this.uiService = new UiService(gameArena);
  }

  public GetCommandService() {
    return this.commandService;
  }

  public GetAuthenticationService(): IAuthenticationService {
    return this.authenticationService;
  }

}
