import { Command } from "../../model/game/app.core.model.game.command";
import { ICommandExecutor } from "./app.core.interfaces.client.commandExecutor";
import { Point } from "model/game/app.core.model.game.point";

export interface IAttackCommandExecutor extends ICommandExecutor {

    EnqueueAttack(relatedElementId: string, targetElementId: string);

    ExecuteAttack(relatedElementId: string, targetElementId: string) : Promise<boolean>;

}