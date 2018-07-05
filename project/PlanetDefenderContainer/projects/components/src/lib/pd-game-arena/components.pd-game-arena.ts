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

    public actOnTileElement(tile: Tile) {
      const authService = this.applicationService.GetAuthenticationService();
      const currentUser = authService.GetAuthenticationInfo();
      const gameArea = this.applicationService.GetCurrentGameArena();
      const currentSelectedElement = this.applicationService.GetSelectedElement();
      const commandService = this.applicationService.GetCommandService();

      if (tile.Element) { // select or attack

        // selection
        if (currentUser.UserId === tile.Element.OwnerUserId) {
          this.applicationService.SetSelectedElement(tile.Element);

        } else { // attack (only if there is a selected element)
          if (currentSelectedElement) {
            const attackMovements = gameArea.Map.FindRouteForAttack(currentSelectedElement, tile.Location);

            // clear queue
            commandService.ClearCommandsQueue(currentSelectedElement.Uid);

            // enqueue commands
            for (const point of attackMovements) {
              commandService.EnqueueMoveCommands(currentSelectedElement, {
                X: point.X,
                Y: point.Y
              });
            }

            commandService.EnqueueAttackCommand(tile.Element, currentSelectedElement);

          }
        }
      } else { // move, only if there is a selected element
        if (currentSelectedElement) {
          const movementsPoints = gameArea.Map.FindRoutePointsByElement(currentSelectedElement, tile.Location);

          // clear queue
          commandService.ClearCommandsQueue(currentSelectedElement.Uid);

          // enqueue commands
          for (const point of movementsPoints) {
            commandService.EnqueueMoveCommands(currentSelectedElement, {
              X: point.X,
              Y: point.Y
            });
          }
        }
      }
    }

}
