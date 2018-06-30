import { Component, OnInit, Input } from '@angular/core';
import { GameArena, TILES_NUMBER, Tile } from 'planet-defender-core';

@Component({
    selector: 'pd-game-arena',
    templateUrl: './components.pd-game-arena.html',
    styleUrls: [
        './components.pd-game-arena.css'
    ]
})
export class PlanetDefenderGameArenaComponent implements OnInit {

    @Input()
    public GameArena: GameArena = null;

    public TilesArray: Array<number> = Array.from(Array(TILES_NUMBER).keys());

    constructor() { }

    ngOnInit() {
    }

    public getTileAt(x: number, y: number): Tile {
      return this.GameArena.Map.getTileAt(x, y);
    }

}
