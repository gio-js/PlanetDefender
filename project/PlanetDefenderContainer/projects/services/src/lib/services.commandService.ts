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

  MoveCommandsExecutor: Array<IMoveCommandExecutor>;
  AttackCommandsExecutor: Array<IAttackCommandExecutor>;

  constructor(private applicationService: ApplicationService) {
    this.MoveCommandsExecutor = []; //new MoveCommandExecutorService(applicationService);
    this.AttackCommandsExecutor = []; // new AttackCommandExecutorService(applicationService);
  }

  private getMoveExecutor(elementId: string) {
    return this.MoveCommandsExecutor.find(m => m.RelatedElementId === elementId);
  }

  private getAttackExecutor(elementId: string) {
    return this.AttackCommandsExecutor.find(m => m.RelatedElementId === elementId);
  }

  EnqueueAttackCommand(target: IMapElement, attacker: IMapElement) {
    let executor = this.getAttackExecutor(attacker.Uid);
    if (!executor) {
      executor = new AttackCommandExecutorService(attacker.Uid, this.applicationService);
      this.AttackCommandsExecutor.push(executor);
    }

    const command = executor.CommandsQueue.NextCommand(CommandType.Attack);
    command.RelatedElementId = attacker.Uid;
    command.TargetElementId = target.Uid;
    command.TargetLocation = null;
    executor.CommandsQueue.Enqueue(command);
  }

  EnqueueMoveCommands(target: IMapElement, destinationPoint: Point) {
    let executor = this.getMoveExecutor(target.Uid);
    if (!executor) {
      executor = new MoveCommandExecutorService(target.Uid, this.applicationService);
      this.MoveCommandsExecutor.push(executor);
    }

    const command = executor.CommandsQueue.NextCommand(CommandType.Move);
    command.RelatedElementId = target.Uid;
    command.TargetElementId = null;
    command.TargetLocation = destinationPoint;
    executor.CommandsQueue.Enqueue(command);
  }

  ExecuteAcceptedCommand(command: Command): Promise<any> {
    switch (command.CommandType) {
      case CommandType.Move:
        const executorMove = this.getMoveExecutor(command.RelatedElementId);
        return executorMove.ExecuteMove(command.RelatedElementId, command.TargetLocation).then(v => {
          executorMove.CommandsQueue.ReleaseWait();
        });
      case CommandType.Attack:
        const executorAttack = this.getAttackExecutor(command.RelatedElementId);
        return executorAttack.ExecuteAttack(command.RelatedElementId, command.TargetElementId).then(v => {
          executorAttack.CommandsQueue.ReleaseWait();
        });
    }
  }

  ClearCommandsQueueDueToRejection(relatedElementId: string) {
    const executorMove = this.getMoveExecutor(relatedElementId);
    executorMove.CommandsQueue.Wait();
    executorMove.CommandsQueue.ClearById(relatedElementId);
    executorMove.CommandsQueue.ReleaseWait();

    const executorAttack = this.getAttackExecutor(relatedElementId);
    executorAttack.CommandsQueue.Wait();
    executorAttack.CommandsQueue.ClearById(relatedElementId);
    executorAttack.CommandsQueue.ReleaseWait();
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
    for (const executor of this.MoveCommandsExecutor) {
      if (executor.CommandsQueue.IsWaiting()) {
        continue;
      }

      const command = executor.CommandsQueue.Dequeue();
      if (command) {
        const gameHttpService = this.applicationService.GetGameService();

        gameHttpService.NotifyCommand(command);
        executor.CommandsQueue.Wait();
      }
    }
  }

  private fetchAttackCommands() {
    for (const executor of this.AttackCommandsExecutor) {
      if (executor.CommandsQueue.IsWaiting()) {
        continue;
      }

      const command = executor.CommandsQueue.Dequeue();
      if (command) {
        const gameHttpService = this.applicationService.GetGameService();

        gameHttpService.NotifyCommand(command);
        executor.CommandsQueue.Wait();
      }
    }
  }

}
