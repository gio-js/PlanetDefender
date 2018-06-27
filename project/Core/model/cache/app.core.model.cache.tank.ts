import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { IMapSelectableElement } from "../../interfaces/app.core.model.mapSelectableElement";
import { Point } from "./app.core.model.cache.point";
import { MapElementDirection } from "../../enums/app.core.enum.mapElementDirection";
import { TANKS_INITIAL_LIVES } from "../../consts/app.core.const.game";
import { IMapMovableElement } from "../../interfaces/app.core.model.mapMovableElement";


export class Tank implements IMapElement, IMapSelectableElement, IMapMovableElement {

    public Uid: string;
    public Location: Point;
    public Lives: number;
    public Selected: boolean;
    public Direction: MapElementDirection;

    constructor() {
        this.Lives = TANKS_INITIAL_LIVES;
    }

}