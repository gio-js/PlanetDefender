import { Command } from "../../model/game/app.core.model.game.command";
import { ICommandExecutor } from "./app.core.interfaces.client.commandExecutor";
import { Point } from "model/game/app.core.model.game.point";

export interface IMoveCommandExecutor extends ICommandExecutor {

    EnqueueMove(relatedElementId: string, destinationPoint: Point);

    ExecuteMove(relatedElementId: string, destinationPoint: Point) : Promise<boolean>;

}