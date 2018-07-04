import { ApplicationService } from './services.applicationService';
import {
  IMoveCommandExecutor, Point,
  ICommandQueue, MapElementDirection, IAttackCommandExecutor } from 'planet-defender-core';
import { Injectable } from "@angular/core";
import { UiService } from './services.uiServices';
import { CommandsQueue } from './services.commandsQueue';

@Injectable()
export class AttackCommandExecutorService implements IAttackCommandExecutor {

  constructor(relatedElementId: string, private applicationService: ApplicationService) {
    this.RelatedElementId = relatedElementId;
    this.CommandsQueue = new CommandsQueue();
  }

  public CommandsQueue: ICommandQueue;
  public RelatedElementId: string;

  ExecuteAttack(relatedElementId: string, targetElementId: string): Promise<boolean> {
    const gameArena = this.applicationService.GetCurrentGameArena();
    const el = gameArena.GetMapElementById(relatedElementId);

    return new Promise((resolve, reject) => {



    });
  }

}
