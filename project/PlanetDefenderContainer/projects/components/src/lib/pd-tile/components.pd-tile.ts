import { Component, OnInit, Input } from '@angular/core';
import { Tile, MapElementType } from 'planet-defender-core';

@Component({
  selector: 'pd-tile',
  templateUrl: './components.pd-tile.html',
  styleUrls: [
      './components.pd-tile.css'
  ]
})
export class PlanetDefenderTileComponent implements OnInit {

  @Input()
  Tile: Tile = null;

  public MapElementTypeEnum = MapElementType;

  constructor() { }

  ngOnInit() {
  }

}
