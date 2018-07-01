import { GameArena } from "../../model/game/app.core.model.game.gameArena";
import { Tank } from "../../model/game/app.core.model.game.tank";
import { Building } from "../../model/game/app.core.model.game.building";
import { Command } from "../../model/game/app.core.model.game.command";

/**
 * The game service manager
 */
export interface IGameService {

    CreateArena(): Promise<GameArena>;

    SearchArena(): Promise<GameArena>;

    JoinArena(channelId: string): Promise<GameArena>;

    NotifyCommand(command: Command);

    OnCommandAccepted(command: Command);

    OnCommandRejected(command: Command);

}