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
  Point,
  GameArenaFactory
} from "planet-defender-core";
import { ApplicationService } from "services";
import PathFind from 'pathfinding';

@Component({
  selector: "web-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  private GameArena = null;

  constructor(@Inject(ApplicationService) private applicationService: ApplicationService) {

  }

  ngOnInit(): void {

    // this.testGame();
  }

  public isAuthenticated(): boolean {
    const authenticationService = this.applicationService.GetAuthenticationService();
    return authenticationService.IsAuthenticated();
  }

  public getCurrentGameArena(): GameArena {
    return this.applicationService.GetCurrentGameArena();
  }

  public createGame() {
    const gameService = this.applicationService.GetGameService();
    const userId = this.applicationService.GetAuthenticationService().GetAuthenticationInfo().UserId;
    gameService.CreateArena(userId).then(arena => {
      const gameArena = GameArenaFactory.Create(arena);
      this.applicationService.SetCurrentGameArena(gameArena);
      return gameArena;
    });
  }

  private testGame() {
    this.GameArena.Randomize('5b395390c4c97f00142615ae');
    this.GameArena.RandomizeAttacker('todo');

    this.applicationService.SetCurrentGameArena(this.GameArena);
    const commandService = this.applicationService.GetCommandService();

    const callback = () => {
      console.log(commandService.CommandsQueue);

      let index = 0;
      for (const queue of commandService.CommandsQueue) {
        index++;
        console.log(index, 'start for');
        if (queue.IsWaiting()) {
          console.log(index, 'exit for wait');
          continue;
        }

        const command = queue.Dequeue();
        if (command) {
          const internalIndex = index;
          console.log(internalIndex, 'wait');
          queue.Wait();

          console.log(internalIndex, 'execute');
          commandService.ExecuteAcceptedCommand(command).then(() => {
            console.log(internalIndex, 'end execute');


          });
        }
      }

      setTimeout(callback, 10);


    };

    callback();
  }
}
