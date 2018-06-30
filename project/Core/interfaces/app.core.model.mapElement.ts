import { Point } from "../model/game/app.core.model.game.point";
import { MapElementType } from "../enums/app.core.enum.mapElementType";

export interface IMapElement {
    ElementType: MapElementType;
    Location: Point;
}