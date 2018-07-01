import { MapElementDirection } from "../enums/app.core.enum.mapElementDirection";
import { IMapElement } from "./app.core.model.mapElement";

export interface IMapMovableElement extends IMapElement {
    Direction: MapElementDirection;
    Moving: boolean;
}