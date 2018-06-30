import { Component, OnInit, Input } from '@angular/core';
import { Building, MapElementType } from 'planet-defender-core';

@Component({
  selector: 'pd-building',
  templateUrl: './components.pd-building.html',
  styleUrls: [
      './components.pd-building.css'
  ]
})
export class PlanetDefenderBuildingComponent implements OnInit {

  @Input()
  public Building: Building = null;

  public MapElementTypeEnum = MapElementType;

  constructor() { }

  ngOnInit() {
  }

}
