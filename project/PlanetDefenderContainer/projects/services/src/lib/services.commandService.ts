import { ApplicationService } from './services.applicationService';
import { MoveCommandExecutorService } from './services.moveCommandExecutorService';
import { AttackCommandExecutorService } from './services.attackCommandExecutorService';
import { Injectable } from "@angular/core";
import {
  IAttackCommandExecutor, ICommandService, IMoveCommandExecutor,
  Tank, Building, Command, CommandType, Point, IMapElement } from 'planet-defender-core';

@Injectable()
export class CommandService implements ICommandService {

  private readonly INTERVAL_COMMANDS_EXECUTION_MS: number = 100;

  MoveCommandExecutor: IMoveCommandExecutor;
  AttackCommandExecutor: IAttackCommandExecutor;

  constructor(private applicationService: ApplicationService) {
    this.MoveCommandExecutor = new MoveCommandExecutorService(applicationService);
    this.AttackCommandExecutor = new AttackCommandExecutorService(applicationService);
  }

  EnqueueAttackCommand(target: IMapElement, attacker: IMapElement) {
    const command = this.AttackCommandExecutor.CommandsQueue.NextCommand(CommandType.Attack);
    command.RelatedElementId = attacker.Uid;
    command.TargetElementId = target.Uid;
    command.TargetLocation = null;
    this.AttackCommandExecutor.CommandsQueue.Enqueue(command);
  }

  EnqueueMoveCommands(target: IMapElement, destinationPoint: Point) {
    const command = this.MoveCommandExecutor.CommandsQueue.NextCommand(CommandType.Move);
    command.RelatedElementId = target.Uid;
    command.TargetElementId = null;
    command.TargetLocation = destinationPoint;
    this.MoveCommandExecutor.CommandsQueue.Enqueue(command);
  }

  ExecuteAcceptedCommand(command: Command): Promise<any> {
    switch (command.CommandType) {
      case CommandType.Move:
        return this.MoveCommandExecutor.ExecuteMove(command.RelatedElementId, command.TargetLocation).then(v => {
          this.MoveCommandExecutor.CommandsQueue.ReleaseWait();
        });
      case CommandType.Attack:
        return this.AttackCommandExecutor.ExecuteAttack(command.RelatedElementId, command.TargetElementId).then(v => {
          this.AttackCommandExecutor.CommandsQueue.ReleaseWait();
        });
    }
  }

  ClearCommandsQueueDueToRejection(relatedElementId: string) {
    this.MoveCommandExecutor.CommandsQueue.Wait();
    this.MoveCommandExecutor.CommandsQueue.ClearById(relatedElementId);
    this.MoveCommandExecutor.CommandsQueue.ReleaseWait();

    this.AttackCommandExecutor.CommandsQueue.Wait();
    this.AttackCommandExecutor.CommandsQueue.ClearById(relatedElementId);
    this.AttackCommandExecutor.CommandsQueue.ReleaseWait();
  }

  RunAsyncExecutors() {
    setTimeout(() => {
      this.fetchMoveCommands();
      this.fetchAttackCommands();

      // recursive call
      this.RunAsyncExecutors();

    }, this.INTERVAL_COMMANDS_EXECUTION_MS);
  }

  private fetchMoveCommands() {
    if (this.MoveCommandExecutor.CommandsQueue.IsWaiting()) {
      return;
    }

    const command = this.MoveCommandExecutor.CommandsQueue.Dequeue();
    if (command) {
      const gameHttpService = this.applicationService.GetGameService();

      gameHttpService.NotifyCommand(command);
      this.MoveCommandExecutor.CommandsQueue.Wait();
    }
  }

  private fetchAttackCommands() {
    if (this.AttackCommandExecutor.CommandsQueue.IsWaiting()) {
      return;
    }

    const command = this.AttackCommandExecutor.CommandsQueue.Dequeue();
    if (command) {
      const gameHttpService = this.applicationService.GetGameService();

      gameHttpService.NotifyCommand(command);
      this.AttackCommandExecutor.CommandsQueue.Wait();
    }
  }

}
