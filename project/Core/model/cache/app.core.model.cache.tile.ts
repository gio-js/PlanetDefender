import { Point } from "./app.core.model.cache.point";
import { TerrainType } from "../../enums/app.core.enum.terrainType";
import { IMapElement } from "../../interfaces/app.core.model.mapElement";

export class Tile {
    public TerrainType: TerrainType;
    public Location: Point;
    public Element: IMapElement;
}