import { GameArena } from "../../model/game/app.core.model.game.gameArena";
import { Tank } from "../../model/game/app.core.model.game.tank";
import { Building } from "../../model/game/app.core.model.game.building";
import { Command } from "../../model/game/app.core.model.game.command";

/**
 * The game service manager
 */
export interface IGameService {

    CreateArena(currentUserId: string): Promise<GameArena>;

    JoinArena(arenaId: string): Promise<GameArena>;

    NotifyCommand(command: Command): Promise<any>;

    OnCommandAccepted(command: Command);

    OnCommandRejected(command: Command);

}