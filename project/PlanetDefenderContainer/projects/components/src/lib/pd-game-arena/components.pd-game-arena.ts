import { Component, OnInit, Input, Inject } from '@angular/core';
import { GameArena, TILES_NUMBER, Tile } from 'planet-defender-core';
import { ApplicationService } from 'services';

@Component({
    selector: 'pd-game-arena',
    templateUrl: './components.pd-game-arena.html',
    styleUrls: [
        './components.pd-game-arena.css'
    ]
})
export class PlanetDefenderGameArenaComponent implements OnInit {

    public TilesArray: Array<number> = Array.from(Array(TILES_NUMBER).keys());

    constructor(@Inject(ApplicationService)private applicationService: ApplicationService) { }

    ngOnInit() {
    }

    public getTileAt(x: number, y: number): Tile {
      const gameArena = this.applicationService.GetCurrentGameArena();
      return gameArena.Map.getTileAt(x, y);
    }

    public selectTileElement(tile: Tile) {
      const gameArena = this.applicationService.GetCurrentGameArena();
      const authService = this.applicationService.GetAuthenticationService();
      const currentUser = authService.GetAuthenticationInfo();
      let selectionMade: boolean = false;
      const anyType: any = tile;

      if (tile.Element && currentUser.UserId === tile.Element.OwnerUserId) {
        anyType.Element.Selected = true;
        selectionMade = true;
      }

      if (selectionMade === true) {
        // tslint:disable-next-line:forin
        for (const tilekey in gameArena.Map.Tiles) {
          const tileMap: any = gameArena.Map.Tiles[tilekey];
          if (tileMap.Element && 'Selected' in tileMap.Element) {
            tileMap.Element.Selected = false;
          }
        }
      }
    }

}
