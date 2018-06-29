import { Component, OnInit, Input } from '@angular/core';
import { GameArena } from 'planet-defender-core';

@Component({
    selector: 'pd-tile',
    templateUrl: './components.pd-game-arena.html',
    styleUrls: [
        './components.pd-game-arena.css'
    ]
})
export class PlanetDefenderGameArenaComponent implements OnInit {

    @Input()
    public GameArena: GameArena = null;

    public NumberOfTiles: number = 100;

    constructor() { }

    ngOnInit() {
    }

}
