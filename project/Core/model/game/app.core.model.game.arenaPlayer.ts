import { IMapElement } from './../../interfaces/app.core.model.mapElement';
import { UserType } from "../../enums/app.core.enum.userType";
import { Tank } from "./app.core.model.game.tank";
import { Building } from "./app.core.model.game.building";


export class ArenaPlayer {

    public UserId: string;
    public UserType: UserType;
    public Tanks: Array<Tank>;
    public Buildings: Array<Building>;

    public getElementAt(x: number, y: number): IMapElement {
        let tank, building;

        if (this.Tanks) {
            tank = this.Tanks.find(t => t.Location.X === x && t.Location.Y === y);
        }

        if (!tank && this.Buildings) {
            building = this.Buildings.find(b => b.Location.X === x && b.Location.Y === y);
        }

        return (tank || building || null);
    }

}