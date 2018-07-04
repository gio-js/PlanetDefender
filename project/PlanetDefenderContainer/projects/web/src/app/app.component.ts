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
    this.GameArena.Randomize('5b395390c4c97f00142615ae');
    this.applicationService.SetCurrentGameArena(this.GameArena);
    const commandService = this.applicationService.GetCommandService();
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

    const callback = () => {
      //console.log(commandService);

      for (const executor of commandService.MoveCommandsExecutor) {
        console.log('start for');
        if (executor.CommandsQueue.IsWaiting()) {
          console.log('exit for wait');
          continue;
        }

        const command = executor.CommandsQueue.Dequeue();
        if (command) {
          console.log('wait');
          executor.CommandsQueue.Wait();

          console.log('execute');
          commandService.ExecuteAcceptedCommand(command).then(() => {
            console.log('end execute');


          });
        }
      }

      setTimeout(callback, 1000);


    };

    callback();
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
