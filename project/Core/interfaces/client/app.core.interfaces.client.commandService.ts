import { IAttackCommandExecutor } from './app.core.interfaces.client.attackCommandExecutor';
import { Command } from "../../model/game/app.core.model.game.command";
import { Tank } from "../../model/game/app.core.model.game.tank";
import { Building } from "../../model/game/app.core.model.game.building";
import { IMoveCommandExecutor } from "./app.core.interfaces.client.moveCommandExecutor";
import { Point } from '../../model/game/app.core.model.game.point';

export interface ICommandService {

    MoveCommandExecutor: IMoveCommandExecutor;

    AttackCommandExecutor: IAttackCommandExecutor;

    EnqueueAttackCommand(target: Tank | Building, attacker: Tank);

    EnqueueMoveCommands(target: Tank | Building, destinationPoint: Point);

    ExecuteAcceptedCommand(command: Command): Promise<any>;

    ClearCommandsQueueDueToRejection(relatedElementId: string);

    RunAsyncExecutors();

}