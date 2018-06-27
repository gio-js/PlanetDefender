import { UserType } from "../../enums/app.core.enum.userType";
import { Tank } from "./app.core.model.cache.tank";
import { Building } from "./app.core.model.cache.building";


export class ArenaPlayer {

    public Email: string;
    public UserType: UserType;
    public Tanks: Array<Tank>;
    public Buildings: Array<Building>;

}