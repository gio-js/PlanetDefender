import { GameArena } from "../../model/game/app.core.model.game.gameArena";
import { Tank } from "../../model/game/app.core.model.game.tank";
import { Building } from "../../model/game/app.core.model.game.building";
import { PlayerMessage } from "../../model/message/app.model.message.playerMessage";

/**
 * The game service manager
 */
export interface IGameService {

    CreateArena(): Promise<GameArena>;

    SearchArena(): Promise<GameArena>;

    JoinArena(channelId: string): Promise<GameArena>;

    NotifyAttack(target: Tank | Building, attacker: Tank);

    NotifyMove(target: Tank, offsetX: number, offsetY: number);

    OnMessageAccepted(message: PlayerMessage);

}