import { Component, OnInit, Input } from '@angular/core';
import { MapElementType, TANKS_INITIAL_LIVES, BUILDINGS_INITIAL_LIVES } from 'planet-defender-core';

@Component({
    selector: 'pd-life-bar',
    templateUrl: './components.pd-life-bar.html',
    styleUrls: [
        './components.pd-life-bar.css'
    ]
})
export class PlanetDefenderLifeBarComponent implements OnInit {

    @Input()
    public MapElementType: MapElementType = null;

    @Input()
    public Lives: number = null;


    constructor() { }

    ngOnInit() {

    }

    public getLifePercentage(): number {
        let maximumLives: number = 0;
        switch (this.MapElementType) {
            case MapElementType.Tank:
                maximumLives = TANKS_INITIAL_LIVES;
                break;
            case MapElementType.Building:
                maximumLives = BUILDINGS_INITIAL_LIVES;
                break;
        }

        return (this.Lives * 100) / maximumLives;
    }

}
