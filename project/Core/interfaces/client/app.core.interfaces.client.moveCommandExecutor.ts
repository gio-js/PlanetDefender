import { ICommandExecutor } from "./app.core.interfaces.client.commandExecutor";
import { Point } from "../../model/game/app.core.model.game.point";
import { Command } from "../../model/game/app.core.model.game.command";

export interface IMoveCommandExecutor extends ICommandExecutor {

    ExecuteMove(relatedElementId: string, destinationPoint: Point) : Promise<boolean>;

}