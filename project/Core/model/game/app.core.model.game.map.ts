
import { Tile } from "./app.core.model.game.tile";
import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { TILES_NUMBER } from "../../consts/app.core.const.game";
import { TerrainType } from "../../enums/app.core.enum.terrainType";


export class Map {

    Tiles: {}; //Dictionary<xy, Tile>;

    constructor(attacker: ArenaPlayer, defender: ArenaPlayer) {
        this.Tiles = {};

        for(let x = 0; x < TILES_NUMBER; x++){
            for(let y = 0; y < TILES_NUMBER; y++){
                const tile = new Tile();
                tile.Location = {
                        X: x,
                        Y: y
                    };
                tile.TerrainType = TerrainType.Grass,
                tile.Element = attacker.getElementAt(x, y) || defender.getElementAt(x, y) || null;
                this.Tiles[`${x}_${y}`] = tile;
            }
        }
    }

    public getTileAt(x: number, y: number): Tile {
        return this.Tiles[`${x}_${y}`] || null;
    }

}