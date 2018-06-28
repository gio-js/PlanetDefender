import { GameArena } from "../../model/cache/app.core.model.cache.gameArena";
import { Tank } from "../../model/cache/app.core.model.cache.tank";
import { Building } from "../../model/cache/app.core.model.cache.building";
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