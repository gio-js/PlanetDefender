import { 
    BUILDINGS_INITIAL_LIVES, BUILDINGS_INITIAL_COUNT, 
    TANKS_INITIAL_LIVES,
    TANKS_INITIAL_COUNT, TILES_NUMBER } from '../../consts/app.core.const.game';
import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { Map } from "./app.core.model.game.map";
import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { UserType } from "../../enums/app.core.enum.userType";
import { MapElementType } from "../../enums/app.core.enum.mapElementType";
import { Building } from "./app.core.model.game.building";
import { Tank } from "./app.core.model.game.tank";
import { MapElementDirection } from "../../enums/app.core.enum.mapElementDirection";
import { TankRoleType } from "../../enums/app.core.enum.tankRoleType";
import shuffle from 'shuffle-array';
import uuidv1 from 'uuid/v1';

export class GameArena {
    public Uid: string;
    public Attacker: ArenaPlayer;
    public Defender: ArenaPlayer;
    public Map: Map;

    constructor() { }

    public GetMapElementById(elementId: string) : IMapElement {
        if (this.Attacker) {
            for(const el of this.Attacker.Tanks) {
                if (el.Uid == elementId) {
                    return el;
                }
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

    /**
     * Randomize the game arena content
     */
    public Randomize(ownerUserId: string) {
        const defender = new ArenaPlayer();
        defender.UserId = ownerUserId;
        defender.UserType = UserType.Defender;
        defender.Tanks = [];
        defender.Buildings = [];
    
        // const baseBuilding = new Building();
        // baseBuilding.ElementType = MapElementType.Building;
        // baseBuilding.IsUnderAttack = true;
        // baseBuilding.Lives = 2;
        // baseBuilding.Location = {
        //   X: 6,
        //   Y: 5
        // };
        // defender.Buildings.push(baseBuilding);

        const numberOfTiles = TILES_NUMBER * TILES_NUMBER;
        const tilesIndexes = [];
        let buildingsCount = BUILDINGS_INITIAL_COUNT, tanksCount = TANKS_INITIAL_COUNT;
        for(let index = 0; index < numberOfTiles; index++) {
            if (buildingsCount > 0) {
                tilesIndexes[index] = parseInt(MapElementType.Building.toString());
                buildingsCount--;
            } else if (tanksCount > 0) {
                tilesIndexes[index] = parseInt(MapElementType.Tank.toString());
                tanksCount--;
            } else {
                tilesIndexes[index] = -1;
            }
        }

        shuffle(tilesIndexes);

        // create buildings and tanks
        for(let index = 0; index < tilesIndexes.length; index++) {
            let tileValue = tilesIndexes[index];
            switch(tileValue) {
                case MapElementType.Building:
                    const baseBuilding = new Building();
                    baseBuilding.ElementType = MapElementType.Building;
                    baseBuilding.IsUnderAttack = false;
                    baseBuilding.Lives = BUILDINGS_INITIAL_LIVES;
                    baseBuilding.Location = {
                        X: index % TILES_NUMBER,
                        Y: parseInt((index / TILES_NUMBER).toString())
                    };
                    baseBuilding.Uid = uuidv1();
                    baseBuilding.OwnerUserId = ownerUserId;
                    defender.Buildings.push(baseBuilding);
                    break;
                case MapElementType.Tank:
                    const defTank = new Tank();
                    defTank.Direction = MapElementDirection.South;
                    defTank.ElementType = MapElementType.Tank;
                    defTank.TankRoleType = TankRoleType.Defender;
                    defTank.Location = {
                        X: index % TILES_NUMBER,
                        Y: parseInt((index / TILES_NUMBER).toString())
                    };
                    defTank.Lives = TANKS_INITIAL_LIVES;
                    defTank.Uid = uuidv1();
                    defTank.OwnerUserId = ownerUserId;
                    defender.Tanks.push(defTank);
                    break;
            }
        }

        this.Defender = defender;
        this.Uid = uuidv1();
        this.Map = new Map(null, defender);
    }
}