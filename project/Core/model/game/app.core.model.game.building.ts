import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { Point } from "./app.core.model.game.point";
import { BUILDINGS_INITIAL_LIVES } from "../../consts/app.core.const.game";
import { MapElementType } from "../../enums/app.core.enum.mapElementType";

export class Building implements IMapElement {

    public Uid: string;
    public ElementType: MapElementType = MapElementType.Building;
    public Location: Point;
    public IsUnderAttack: boolean;
    public Lives: number;

    constructor() {
        this.Lives = BUILDINGS_INITIAL_LIVES;
    }


}