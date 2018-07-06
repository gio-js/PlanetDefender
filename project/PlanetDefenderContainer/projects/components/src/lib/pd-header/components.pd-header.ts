import { ApplicationService } from 'services';
import { Component, OnInit, Inject } from '@angular/core';
import { GameArenaFactory } from 'planet-defender-core';

@Component({
  selector: 'pd-header',
  templateUrl: './components.pd-header.html',
  styles: []
})
export class PlanetDefenderHeaderComponent implements OnInit {

  constructor(@Inject(ApplicationService) private applicationService: ApplicationService) { }

  ngOnInit() {
  }

  public newGame() {
    const gameService = this.applicationService.GetGameService();
    const userId = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserId;
    gameService.CreateArena(userId).then(arena => {
      const gameArena = GameArenaFactory.Create(arena);
      this.applicationService.SetCurrentGameArena(gameArena);
      return gameArena;
    });

    this.applicationService.IsGamePageView = true;
    this.applicationService.IsStatisticsPageView = false;
  }

  public joinGame() {
    const gameService = this.applicationService.GetGameService();
    const userId = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserId;

    gameService.JoinArena(userId).then(arena => {
      if (arena) {
        const gameArena = GameArenaFactory.Create(arena);
        this.applicationService.SetCurrentGameArena(gameArena);
        return gameArena;
      }
      return null;
    });

    this.applicationService.IsGamePageView = true;
    this.applicationService.IsStatisticsPageView = false;
  }

  public showStats() {
    const gameService = this.applicationService.GetGameService();
    const userId = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserId;
    gameService.GetStatistics(userId).then(stats => {

    });

    this.applicationService.IsStatisticsPageView = true;
    this.applicationService.IsGamePageView = false;
  }

  public exitGame() {
    this.applicationService.GetAuthenticationService().SetAuthenticationInfo(null);
    this.applicationService.SetCurrentGameArena(null);

    this.applicationService.IsGamePageView = false;
    this.applicationService.IsStatisticsPageView = false;
  }

  public currentUserName() {
    const userName = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserName;
    return userName;
  }

  public enemyUserName() {
    return "";
  }

  public currentGameId() {
    const gameArena = this.applicationService.GetCurrentGameArena();

    if (gameArena) {
      return gameArena.Uid;
    }

    return null;
  }


}
