import { Command } from "../../model/game/app.core.model.game.command";
import { CommandType } from "../../enums/app.core.enum.commandType";

export interface ICommandQueue {
    RelatedElementId: string;
    Dequeue() : Command;
    NextCommand(commandType: CommandType) : Command;
    Enqueue(command: Command);
    Wait();
    ReleaseWait();
    IsWaiting() : boolean;
    HasElements() : boolean;
    Clear();
}