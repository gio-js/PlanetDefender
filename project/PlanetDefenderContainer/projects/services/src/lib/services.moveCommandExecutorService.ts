import { ApplicationService } from './services.applicationService';
import {
  IMoveCommandExecutor, Point,
  ICommandQueue, MapElementDirection, IMapMovableElement } from 'planet-defender-core';
import { Injectable } from "@angular/core";
import { UiService } from './services.uiServices';
import { CommandsQueue } from './services.commandsQueue';

@Injectable()
export class MoveCommandExecutorService implements IMoveCommandExecutor {

  constructor(private applicationService: ApplicationService) {
  }

  ExecuteMove(relatedElementId: string, destinationPoint: Point): Promise<boolean> {
    const uiService = this.applicationService.GetUIService();

    const moveDirection = this.retriveMoveDirection(relatedElementId, destinationPoint);
    return uiService.MoveTankNextStep(relatedElementId, moveDirection).then(() => {
      const gameArena = this.applicationService.GetCurrentGameArena();
      const el = gameArena.GetMapElementById(relatedElementId);
      const tileSource = gameArena.Map.getTileAt(el.Location.X, el.Location.Y);
      const tileTarget = gameArena.Map.getTileAt(destinationPoint.X, destinationPoint.Y);

      tileSource.Element = null;
      tileTarget.Element = el;
      el.Location.X = destinationPoint.X;
      el.Location.Y = destinationPoint.Y;

      return true;
    });
  }

  private retriveMoveDirection(relatedElementId: string, destinationPoint: Point): MapElementDirection {
    const gameArena = this.applicationService.GetCurrentGameArena();
    const el = gameArena.GetMapElementById(relatedElementId);

    if (destinationPoint.X === (el.Location.X + 1)) {
      return MapElementDirection.East;
    }

    if (destinationPoint.X === (el.Location.X - 1)) {
      return MapElementDirection.West;
    }

    if (destinationPoint.Y === (el.Location.Y + 1)) {
      return MapElementDirection.South;
    }

    if (destinationPoint.Y === (el.Location.Y - 1)) {
      return MapElementDirection.North;
    }

  }

}
