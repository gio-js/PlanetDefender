import { ApplicationService } from './services.applicationService';
import {
  IMoveCommandExecutor, Point,
  ICommandQueue, MapElementDirection, IAttackCommandExecutor } from 'planet-defender-core';
import { Injectable } from "@angular/core";
import { UiService } from './services.uiServices';
import { CommandsQueue } from './services.commandsQueue';

@Injectable()
export class AttackCommandExecutorService implements IAttackCommandExecutor {

  constructor(private applicationService: ApplicationService) {
    this.CommandsQueue = new CommandsQueue();
  }

  public CommandsQueue: ICommandQueue;

  ExecuteAttack(relatedElementId: string, targetElementId: string): Promise<boolean> {
    const gameArena = this.applicationService.GetCurrentGameArena();
    const el = gameArena.getMapElementById(relatedElementId);

    return new Promise((resolve, reject) => {



    });
  }

}
