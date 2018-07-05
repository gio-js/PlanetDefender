import { ApplicationService } from 'services';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Tank, MapElementType, TankRoleType, MapElementDirection, IMapElement, UserStatistics } from 'planet-defender-core';

@Component({
  selector: 'pd-statistics',
  templateUrl: './components.pd-statistics.html',
  styleUrls: [
  ]
})
export class PlanetDefenderStatisticsComponent implements OnInit {

  public Stats: UserStatistics = new UserStatistics;

  constructor(@Inject(ApplicationService)private applicationService: ApplicationService) { }

  ngOnInit() {
    const gameService = this.applicationService.GetGameService();
    const userId = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserId;
    gameService.GetStatistics(userId).then(stats => {
      this.Stats = stats;
    });
  }


}
