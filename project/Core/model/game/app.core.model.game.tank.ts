import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { IMapSelectableElement } from "../../interfaces/app.core.model.mapSelectableElement";
import { Point } from "./app.core.model.game.point";
import { MapElementDirection } from "../../enums/app.core.enum.mapElementDirection";
import { TANKS_INITIAL_LIVES } from "../../consts/app.core.const.game";
import { IMapMovableElement } from "../../interfaces/app.core.model.mapMovableElement";
import { MapElementType } from "../../enums/app.core.enum.mapElementType";
import { TankRoleType } from "../../enums/app.core.enum.tankRoleType";


export class Tank implements IMapElement, IMapSelectableElement, IMapMovableElement {

    public Uid: string;
    public ElementType: MapElementType = MapElementType.Tank;
    public Location: Point;
    public Lives: number;
    public Selected: boolean;
    public IsUnderAttack: boolean;
    public Direction: MapElementDirection;
    public TankRoleType: TankRoleType;

    constructor() {
        this.Lives = TANKS_INITIAL_LIVES;
    }

}