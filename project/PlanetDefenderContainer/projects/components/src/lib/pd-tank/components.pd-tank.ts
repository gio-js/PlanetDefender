import { ApplicationService } from 'services';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Tank, MapElementType, TankRoleType, MapElementDirection, IMapElement } from 'planet-defender-core';

@Component({
  selector: 'pd-tank',
  templateUrl: './components.pd-tank.html',
  styleUrls: [
      './components.pd-tank.css'
  ]
})
export class PlanetDefenderTankComponent implements OnInit {

  @Input()
  public Tank: Tank = null;

  public MapElementTypeEnum = MapElementType;
  public MapElementDirectionEnum = MapElementDirection;
  public TankRoleTypeEnum = TankRoleType;

  constructor(@Inject(ApplicationService)private applicationService: ApplicationService) { }

  ngOnInit() {
  }

  getSelectedElement(): IMapElement {
    return this.applicationService.GetSelectedElement();
  }

}
