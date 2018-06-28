import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import { PlanetDefenderHeaderComponent } from './pd-header/components.pd-header';
import { PlanetDefenderLoginComponent } from './pd-login/components.pd-login';

@NgModule({
  imports: [
  ],
  declarations: [
    ComponentsComponent,
    PlanetDefenderHeaderComponent,
    PlanetDefenderLoginComponent
  ],
  exports: [
    ComponentsComponent,
    PlanetDefenderHeaderComponent,
    PlanetDefenderLoginComponent
  ]
})
export class ComponentsModule { }
