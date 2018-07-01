import { Command } from "../../model/game/app.core.model.game.command";
import { ICommandExecutor } from "./app.core.interfaces.client.commandExecutor";

export interface IAttackCommandExecutor extends ICommandExecutor {

    ExecuteAttack(relatedElementId: string, targetElementId: string) : Promise<boolean>;

}