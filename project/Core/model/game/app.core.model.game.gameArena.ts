import { TILES_NUMBER } from './../../consts/app.core.const.game';
import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { Map } from "./app.core.model.game.map";
import { TerrainType } from '../../enums/app.core.enum.terrainType';
import { Tile } from './app.core.model.game.tile';

export class GameArena {
    public Uid: string;
    public Attacker: ArenaPlayer;
    public Defender: ArenaPlayer;
    public Map: Map;

    constructor() { }
}