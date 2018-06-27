import { IMapElement } from "../../interfaces/app.core.model.mapElement";
import { Point } from "./app.core.model.cache.point";
import { BUILDINGS_INITIAL_LIVES } from "../../consts/app.core.const.game";

export class Building implements IMapElement {

    public Uid: string;
    public Location: Point;
    public Lives: number;

    constructor() {
        this.Lives = BUILDINGS_INITIAL_LIVES;
    }


}