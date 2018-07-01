import { MapElementDirection } from "../enums/app.core.enum.mapElementDirection";
import { IMapElement } from "./app.core.model.mapElement";

export interface IMapSelectableElement extends IMapElement {
    Selected: boolean;
    Direction: MapElementDirection;
}