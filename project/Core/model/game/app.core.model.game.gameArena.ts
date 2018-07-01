import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { Map } from "./app.core.model.game.map";
import { IMapElement } from "../../interfaces/app.core.model.mapElement";

export class GameArena {
    public Uid: string;
    public Attacker: ArenaPlayer;
    public Defender: ArenaPlayer;
    public Map: Map;

    constructor() { }

    public getMapElementById(elementId: string) : IMapElement {
        for(const el of this.Attacker.Tanks) {
            if (el.Uid == elementId) {
                return el;
            }
        }

        for(const el of this.Defender.Tanks) {
            if (el.Uid == elementId) {
                return el;
            }
        }

        for(const el of this.Defender.Buildings) {
            if (el.Uid == elementId) {
                return el;
            }
        }

        return null;
    }
}