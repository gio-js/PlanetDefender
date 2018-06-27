import { MapElementDirection } from "../enums/app.core.enum.mapElementDirection";

export interface IMapSelectableElement {
    Selected: boolean;
    Direction: MapElementDirection;
}