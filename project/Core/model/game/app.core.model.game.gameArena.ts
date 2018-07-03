import { ArenaPlayer } from "./app.core.model.game.arenaPlayer";
import { Map } from "./app.core.model.game.map";
import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { UserType } from "../../enums/app.core.enum.userType";
import { MapElementType } from "../../enums/app.core.enum.mapElementType";
import { Building } from "./app.core.model.game.building";
import { Tank } from "./app.core.model.game.tank";
import { MapElementDirection } from "../../enums/app.core.enum.mapElementDirection";
import { TankRoleType } from "../../enums/app.core.enum.tankRoleType";

export class GameArena {
    public Uid: string;
    public Attacker: ArenaPlayer;
    public Defender: ArenaPlayer;
    public Map: Map;

    constructor() { }

    public GetMapElementById(elementId: string) : IMapElement {
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

    /**
     * Randomize the game arena content
     */
    public Randomize() {
        const defender = new ArenaPlayer();
        defender.Email = "c@d.it";
        defender.UserType = UserType.Defender;
        defender.Tanks = [];
        defender.Buildings = [];
    
        const baseBuilding = new Building();
        baseBuilding.ElementType = MapElementType.Building;
        baseBuilding.IsUnderAttack = true;
        baseBuilding.Lives = 2;
        baseBuilding.Location = {
          X: 6,
          Y: 5
        };
        defender.Buildings.push(baseBuilding);
    
        const defTank = new Tank();
        defTank.Direction = MapElementDirection.East;
        defTank.ElementType = MapElementType.Tank;
        defTank.TankRoleType = TankRoleType.Defender;
        defTank.Location = {
          X: 0,
          Y: 0
        };
        defTank.Lives = 3;
        defTank.Uid = "aaaa";
    
        const defTankSel = new Tank();
        defTankSel.Direction = MapElementDirection.North;
        defTankSel.Selected = true;
        defTankSel.ElementType = MapElementType.Tank;
        defTankSel.TankRoleType = TankRoleType.Defender;
        defTankSel.Location = {
          X: 1,
          Y: 1
        };
        defTankSel.Lives = 3;
        defTankSel.Uid = "bbbb";
    
        const defTankAtt = new Tank();
        defTankAtt.Direction = MapElementDirection.West;
        defTankAtt.IsUnderAttack = true;
        defTankAtt.ElementType = MapElementType.Tank;
        defTankAtt.TankRoleType = TankRoleType.Attacker;
        defTankAtt.Location = {
          X: 12,
          Y: 6
        };
        defTankAtt.Lives = 3;
        defTankAtt.Uid = "bbbb";
    
        defender.Tanks = [defTank, defTankSel];
    
        this.Defender = defender;
    
        const attacker = new ArenaPlayer();
        attacker.Email = "c@d.it";
        attacker.UserType = UserType.Attacker;
        attacker.Buildings = [];
        attacker.Tanks = [defTankAtt];
    
        this.Attacker = attacker;
    
        this.Uid = "uid";
        this.Map = new Map(attacker, defender);
    }
}