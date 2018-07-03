import { Point } from "../model/game/app.core.model.game.point";
import { MapElementType } from "../enums/app.core.enum.mapElementType";

export interface IMapElement {
    Uid: string;
    OwnerUserId: string;
    ElementType: MapElementType;
    Location: Point;
    Lives: number;
    IsUnderAttack: boolean;
}