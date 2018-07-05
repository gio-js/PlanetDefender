import { ApplicationService } from './services.applicationService';
import {
  IMoveCommandExecutor, Point,
  ICommandQueue, MapElementDirection, IAttackCommandExecutor, IMapMovableElement } from 'planet-defender-core';
import { Injectable } from "@angular/core";
import { UiService } from './services.uiServices';
import { CommandsQueue } from './services.commandsQueue';

@Injectable()
export class AttackCommandExecutorService implements IAttackCommandExecutor {

  constructor(private applicationService: ApplicationService) {
  }

  ExecuteAttack(relatedElementId: string, targetElementId: string): Promise<boolean> {
    const gameArena = this.applicationService.GetCurrentGameArena();
    const uiService = this.applicationService.GetUIService();
    const attackDirection = this.retriveAttackDirection(relatedElementId, targetElementId);
    const attackerTank = gameArena.GetMapElementById(relatedElementId) as IMapMovableElement;
    const targetTank = gameArena.GetMapElementById(targetElementId);

    // attacker directed on the target
    attackerTank.Direction = attackDirection;

    // decrease target live
    targetTank.Lives--;

    return uiService.AttackTank(targetElementId).then(() => {
      const tileTarget = gameArena.Map.getTileAt(targetTank.Location.X, targetTank.Location.Y);

      // if the target ended his lifes, then remove it from the game
      if (targetTank.Lives === 0) {
        tileTarget.Element = null;
      }

      return true;
    });
  }

  private retriveAttackDirection(relatedElementId: string, targetElementId: string): MapElementDirection {
    const gameArena = this.applicationService.GetCurrentGameArena();
    const attacker = gameArena.GetMapElementById(relatedElementId);
    const attacked = gameArena.GetMapElementById(targetElementId);

    if (attacked.Location.X === (attacker.Location.X + 1)) {
      return MapElementDirection.East;
    }

    if (attacked.Location.X === (attacker.Location.X - 1)) {
      return MapElementDirection.West;
    }

    if (attacked.Location.Y === (attacker.Location.Y + 1)) {
      return MapElementDirection.South;
    }

    if (attacked.Location.Y === (attacker.Location.Y - 1)) {
      return MapElementDirection.North;
    }

  }

}
