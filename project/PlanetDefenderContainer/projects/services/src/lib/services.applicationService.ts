import { Injectable } from '@angular/core';
import { IGameService } from 'planet-defender-core';
import { GameService } from './services.gameService';

@Injectable()
export class ApplicationService {

  private gameService: IGameService;

  constructor() {
    this.gameService = new GameService();

  }

  public GameService(): IGameService {
    return this.gameService;
  }

}
