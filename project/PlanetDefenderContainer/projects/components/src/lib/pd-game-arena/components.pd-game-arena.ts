import { Component, OnInit, Input } from '@angular/core';
import { GameArena, TILES_NUMBER, Tile } from 'planet-defender-core';

@Component({
    selector: 'pd-game-arena',
    templateUrl: './components.pd-game-arena.html',
    styleUrls: [
        './components.pd-game-arena.css'
    ]
})
export class PlanetDefenderGameArenaComponent implements OnInit {

    @Input()
    public GameArena: GameArena = null;

    public TilesArray: Array<number> = Array.from(Array(TILES_NUMBER).keys());

    constructor() { }

    ngOnInit() {
    }

    public getTileAt(x: number, y: number): Tile {
      return this.GameArena.Map.getTileAt(x, y);
    }

    public selectTileElement(tile: Tile) {
      // tslint:disable-next-line:forin
      for (const tilekey in this.GameArena.Map.Tiles) {
        const tileMap: any = this.GameArena.Map.Tiles[tilekey];
        if (tileMap.Element && 'Selected' in tileMap.Element) {
          tileMap.Element.Selected = false;
        }
      }

      const anyType: any = tile;
      if (anyType.Element) {
        anyType.Element.Selected = true;
      }
    }

}
