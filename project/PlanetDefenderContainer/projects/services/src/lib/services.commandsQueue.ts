import { ICommandQueue, Command, CommandType } from 'planet-defender-core';
import { UUID } from 'angular2-uuid';

export class CommandsQueue implements ICommandQueue {
    private isWaiting: boolean = false;
    private commandsQueue: Array<Command> = [];

    constructor(relatedElementId: string) {
      this.RelatedElementId = relatedElementId;
    }

    public RelatedElementId: string;

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

    public IsWaiting(): boolean {
        return this.isWaiting;
    }

    public HasElements(): boolean {
        return (this.commandsQueue.length > 0);
    }

    public Clear() {
      this.commandsQueue.length = 0;
    }
}
