import { Injectable } from "@angular/core";
import { Tank, MapElementDirection, GameArena, IMapMovableElement } from "planet-defender-core";

@Injectable()
export class UiService {
    /**
     * Duration of moving animations
     */
    private readonly MOVING_ANIMATIONS_DELAY: number = 2000;

    constructor(private gameArena: GameArena) { }

    /**
     * Moves the tank for a single tile for the specified direction
     */
    MoveTankNextStep(relatedElementId: string, direction: MapElementDirection): Promise<any> {
        const tank = this.gameArena.GetMapElementById(relatedElementId) as IMapMovableElement;

        tank.Direction = direction;
        tank.Moving = true;

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            tank.Moving = false;
            resolve();
          }, this.MOVING_ANIMATIONS_DELAY);
        });
    }
}
