import { Component, OnInit, Input } from '@angular/core';
import { Tank, MapElementType, TankRoleType, MapElementDirection } from 'planet-defender-core';

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

  constructor() { }

  ngOnInit() {
  }

}
