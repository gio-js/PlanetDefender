import { CommandService } from './services.commandService';
import { GameArena, ICommandService } from 'planet-defender-core';
import { UiService } from './services.uiServices';
import { Injectable } from '@angular/core';
import { IGameService } from 'planet-defender-core';
import { GameHttpService } from './services.gameHttpService';

@Injectable()
export class ApplicationService {

  private gameService: IGameService;
  private uiService: UiService;
  private currentGameArena: GameArena;
  private commandService: ICommandService;

  constructor() {
    this.gameService = new GameHttpService();
    this.commandService = new CommandService(this);
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


}
