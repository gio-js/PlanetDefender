import { ICommandQueue, Command, CommandType } from 'planet-defender-core';
import { UUID } from 'angular2-uuid';

export class CommandsQueue implements ICommandQueue {
    private isWaiting: boolean = false;
    private internalIndex: number = -1;
    private commandsQueue: Array<Command> = [];

    public Dequeue(): Command {
        if (!this.commandsQueue) {
            return null;
        }

        return this.commandsQueue.shift();
    }

    public NextCommand(commandType: CommandType) {
        const command = new Command();
        command.Uid = UUID.UUID();
        command.CommandType = commandType;
        return command;
    }

    Enqueue(command: Command) {
      this.commandsQueue.push(command);
    }

    public Wait() {
        this.isWaiting = true;
    }

    public ReleaseWait() {
        this.isWaiting = false;
    }

    public IsWaiting() {
        return this.isWaiting;
    }

    public ClearById(relatedElementById: string) {
      for (let i = 0 ; i < this.commandsQueue.length; i++) {
        const command = this.commandsQueue[i];
        if (command.RelatedElementId === relatedElementById) {
          this.commandsQueue.splice(i, 1);
        }
      }
    }
}
