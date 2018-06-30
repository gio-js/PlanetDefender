import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { PlanetDefenderHeaderComponent } from './pd-header/components.pd-header';
import { PlanetDefenderLoginComponent } from './pd-login/components.pd-login';
import { PlanetDefenderGameArenaComponent } from './pd-game-arena/components.pd-game-arena';
import { PlanetDefenderTileComponent } from './pd-tile/components.pd-tile';
import { PlanetDefenderTankComponent } from './pd-tank/components.pd-tank';
import { PlanetDefenderBuildingComponent } from './pd-building/components.pd-building';
import { PlanetDefenderLifeBarComponent } from './pd-life-bar/components.pd-life-bar';
import { PlanetDefenderElementUnderAttackComponent } from './pd-element-under-attack/components.pd-element-under-attack';
import { PlanetDefenderElementSelectedComponent } from './pd-element-selected/components.pd-element-selected';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    PlanetDefenderHeaderComponent,
    PlanetDefenderLoginComponent,

    PlanetDefenderGameArenaComponent,
    PlanetDefenderTileComponent,
    PlanetDefenderTankComponent,
    PlanetDefenderBuildingComponent,
    PlanetDefenderLifeBarComponent,
    PlanetDefenderElementUnderAttackComponent,
    PlanetDefenderElementSelectedComponent
  ],
  exports: [
    PlanetDefenderHeaderComponent,
    PlanetDefenderLoginComponent,

    PlanetDefenderGameArenaComponent,
    PlanetDefenderTileComponent,
    PlanetDefenderTankComponent,
    PlanetDefenderBuildingComponent,
    PlanetDefenderLifeBarComponent,
    PlanetDefenderElementUnderAttackComponent,
    PlanetDefenderElementSelectedComponent
  ]
})
export class ComponentsModule { }
