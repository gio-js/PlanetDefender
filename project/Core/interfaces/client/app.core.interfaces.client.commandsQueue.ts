import { Command } from "../../model/game/app.core.model.game.command";
import { CommandType } from "../../enums/app.core.enum.commandType";

export interface ICommandQueue {
    Dequeue() : Command;
    NextCommand(commandType: CommandType) : Command;
    Enqueue(command: Command);
    Wait();
    ReleaseWait();
    IsWaiting() : boolean;
    ClearById(relatedElementById: string);
}