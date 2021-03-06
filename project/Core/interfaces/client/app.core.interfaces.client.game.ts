import { UserStatistics } from './../../model/dal/app.model.dal.userSatistics';
import { GameArena } from "../../model/game/app.core.model.game.gameArena";
import { Command } from "../../model/game/app.core.model.game.command";

/**
 * The game service manager
 */
export interface IGameService {

    OnPlayerJoined: any; // event of GameArena

    CreateArena(currentUserId: string): Promise<GameArena>;

    JoinArena(attackerUserId: string): Promise<GameArena>;

    NotifyCommand(command: Command): Promise<any>;

    GetStatistics(currentUserId: string): Promise<UserStatistics>;

    OnCommandAccepted(command: Command);

    OnCommandRejected(command: Command);

}