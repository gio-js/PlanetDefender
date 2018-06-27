import { GameArena } from "../../model/cache/app.core.model.cache.gameArena";
import { Tank } from "../../model/cache/app.core.model.cache.tank";
import { Building } from "../../model/cache/app.core.model.cache.building";

/**
 * The game service manager
 */
export interface IGameService {

    CreateArena(): Promise<GameArena>;

    SearchArena(): Promise<GameArena>;

    NotifyAttack(target: Tank | Building, attacker: Tank);

    NotifyMove(target: Tank, offsetX: number, offsetY: number);

}