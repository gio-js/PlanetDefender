import { Component, OnInit, Inject } from "@angular/core";
import {
  GameArena,
  Map,
  TankRoleType,
  ArenaPlayer,
  UserType,
  Tank,
  MapElementDirection,
  MapElementType,
  TILES_NUMBER,
  IMapMovableElement,
  Building,
  Point
} from "planet-defender-core";
import { ApplicationService } from "services";
import PathFind from 'pathfinding';

@Component({
  selector: "web-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public GameArena = new GameArena();

  constructor(@Inject(ApplicationService) private applicationService: ApplicationService) {
    this.GameArena.Randomize('aaa');
    this.applicationService.SetCurrentGameArena(this.GameArena);
    // const commandService = this.applicationService.GetCommandService();
    // const defTankAtt = this.GameArena.Attacker.Tanks[0];
    // const movementPoints = this.GameArena.Map.FindRoutePointsByElement(defTankAtt, {
    //   X: 3,
    //   Y: 3
    // });

    // for (const point of movementPoints) {
    //   commandService.EnqueueMoveCommands(defTankAtt, {
    //     X: point.X,
    //     Y: point.Y
    //   });
    // }

    // const callback = () => {
    //   const command = commandService.MoveCommandExecutor.CommandsQueue.Dequeue();
    //   if (command) {
    //     commandService.ExecuteAcceptedCommand(command).then(() => {

    //       setTimeout(callback, 100);

    //     });
    //   }

    // };

    // callback();
  }

  ngOnInit(): void {}

  public isAuthenticated(): boolean {
    const authenticationService = this.applicationService.GetAuthenticationService();
    return authenticationService.IsAuthenticated();
  }

  public getCurrentGameArena(): GameArena {
    return this.applicationService.GetCurrentGameArena();
  }
}
