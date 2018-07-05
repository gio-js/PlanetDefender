import { ApplicationService } from './services.applicationService';
import { MoveCommandExecutorService } from './services.moveCommandExecutorService';
import { AttackCommandExecutorService } from './services.attackCommandExecutorService';
import { CommandsQueue } from './services.commandsQueue';
import { Injectable } from "@angular/core";
import {
  IAttackCommandExecutor, ICommandService, IMoveCommandExecutor,
  Tank, Building, Command, CommandType, Point, IMapElement,
  ICommandQueue } from 'planet-defender-core';

@Injectable()
export class CommandService implements ICommandService {

  private readonly INTERVAL_COMMANDS_EXECUTION_MS: number = 50;

  MoveCommandsExecutor: IMoveCommandExecutor;
  AttackCommandsExecutor: IAttackCommandExecutor;
  CommandsQueue: Array<ICommandQueue>;

  constructor(private applicationService: ApplicationService) {
    this.MoveCommandsExecutor = new MoveCommandExecutorService(this.applicationService);
    this.AttackCommandsExecutor = new AttackCommandExecutorService(this.applicationService);
    this.CommandsQueue = [];
  }

  private getQueue(elementId: string): ICommandQueue {
    return this.CommandsQueue.find(m => m.RelatedElementId === elementId);
  }

  EnqueueAttackCommand(target: IMapElement, attacker: IMapElement) {
    const gameArena = this.applicationService.GetCurrentGameArena();
    let queue = this.getQueue(attacker.Uid);
    if (!queue) {
      queue = new CommandsQueue(attacker.Uid);
      this.CommandsQueue.push(queue);
    }

    const command = queue.NextCommand(CommandType.Attack);
    command.ArenaUid = gameArena.Uid;
    command.RelatedElementId = attacker.Uid;
    command.TargetElementId = target.Uid;
    command.TargetLocation = null;
    queue.Enqueue(command);
  }

  EnqueueMoveCommands(target: IMapElement, destinationPoint: Point) {
    const gameArena = this.applicationService.GetCurrentGameArena();
    let queue = this.getQueue(target.Uid);
    if (!queue) {
      queue = new CommandsQueue(target.Uid);
      this.CommandsQueue.push(queue);
    }

    const command = queue.NextCommand(CommandType.Move);
    command.ArenaUid = gameArena.Uid;
    command.RelatedElementId = target.Uid;
    command.TargetElementId = null;
    command.TargetLocation = destinationPoint;
    queue.Enqueue(command);
  }

  ExecuteAcceptedCommand(command: Command): Promise<any> {
    const queue = this.getQueue(command.RelatedElementId);

    switch (command.CommandType) {
      case CommandType.Move:
        return this.MoveCommandsExecutor.ExecuteMove(command.RelatedElementId, command.TargetLocation).then(v => {
          queue.ReleaseWait();
        });
      case CommandType.Attack:
        return this.AttackCommandsExecutor.ExecuteAttack(command.RelatedElementId, command.TargetElementId).then(v => {
          queue.ReleaseWait();

          // if the target element has still lives available, then continue with another attack command
          const gameArena = this.applicationService.GetCurrentGameArena();
          const relatedElement = gameArena.GetMapElementById(command.RelatedElementId);
          const targetElement = gameArena.GetMapElementById(command.TargetElementId);

          if (targetElement.Lives > 0) {
            this.EnqueueAttackCommand(targetElement, relatedElement);
          }
        });
    }
  }

  ClearCommandsQueue(relatedElementId: string) {
    const queue = this.getQueue(relatedElementId);
    if (queue) {
      queue.Wait();
      queue.Clear();
      queue.ReleaseWait();
    }
  }

  RunAsyncExecutors() {
    setTimeout(() => {
      this.fetchCommands();

      // recursive call
      this.RunAsyncExecutors();

    }, this.INTERVAL_COMMANDS_EXECUTION_MS);
  }

  private fetchCommands() {
    for (const queue of this.CommandsQueue) {
      if (queue.IsWaiting()) {
        continue;
      }

      const command = queue.Dequeue();
      if (command) {
        const gameHttpService = this.applicationService.GetGameService();

        gameHttpService.NotifyCommand(command);
        queue.Wait();
      }
    }
  }

}
