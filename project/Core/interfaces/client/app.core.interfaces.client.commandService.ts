import { IAttackCommandExecutor } from './app.core.interfaces.client.attackCommandExecutor';
import { Command } from "../../model/game/app.core.model.game.command";
import { Tank } from "../../model/game/app.core.model.game.tank";
import { Building } from "../../model/game/app.core.model.game.building";
import { IMoveCommandExecutor } from "./app.core.interfaces.client.moveCommandExecutor";
import { Point } from '../../model/game/app.core.model.game.point';
import { IMapElement } from '../app.core.model.mapElement';

export interface ICommandService {

    MoveCommandsExecutor: Array<IMoveCommandExecutor>;

    AttackCommandsExecutor: Array<IAttackCommandExecutor>;

    EnqueueAttackCommand(target: IMapElement, attacker: IMapElement);

    EnqueueMoveCommands(target: IMapElement, destinationPoint: Point);

    ExecuteAcceptedCommand(command: Command): Promise<any>;

    ClearCommandsQueueDueToRejection(relatedElementId: string);

    RunAsyncExecutors();

}