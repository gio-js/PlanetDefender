import { ArenaPlayer } from "./app.core.model.game.playerArena";
import { Map } from "./app.core.model.game.map";

export class GameArena {
    public Uid: string;
    public Attacker: ArenaPlayer;
    public Defender: ArenaPlayer
    public Map: Map;
}