import { Component, OnInit, Inject } from "@angular/core";
import {
  GameArena,
  Map,
  TankRoleType,
  ArenaPlayer,
  UserType,
  Tank,
  MapElementDirection,
  MapElementType
} from "planet-defender-core";
import { ApplicationService } from "services";

@Component({
  selector: "web-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private applicationService: ApplicationService;
  public GameArena = new GameArena();

  constructor() {
    this.applicationService = new ApplicationService();

    const defender = new ArenaPlayer();
    defender.Email = "c@d.it";
    defender.UserType = UserType.Defender;
    defender.Tanks = [];
    defender.Buildings = [];

    const defTank = new Tank();
    defTank.Direction = MapElementDirection.East;
    defTank.ElementType = MapElementType.Tank;
    defTank.TankRoleType = TankRoleType.Defender;
    defTank.Location = {
      X: 0,
      Y: 0
    };
    defTank.Lives = 3;
    defTank.Uid = "aaaa";

    const defTankSel = new Tank();
    defTankSel.Direction = MapElementDirection.North;
    defTankSel.Selected = true;
    defTankSel.ElementType = MapElementType.Tank;
    defTankSel.TankRoleType = TankRoleType.Defender;
    defTankSel.Location = {
      X: 1,
      Y: 1
    };
    defTankSel.Lives = 3;
    defTankSel.Uid = "bbbb";

    const defTankAtt = new Tank();
    defTankAtt.Direction = MapElementDirection.West;
    defTankAtt.IsUnderAttack = true;
    defTankAtt.ElementType = MapElementType.Tank;
    defTankAtt.TankRoleType = TankRoleType.Attacker;
    defTankAtt.Location = {
      X: 12,
      Y: 6
    };
    defTankAtt.Lives = 3;
    defTankAtt.Uid = "bbbb";

    defender.Tanks = [defTank, defTankSel];

    this.GameArena.Defender = defender;

    const attacker = new ArenaPlayer();
    attacker.Email = "c@d.it";
    attacker.UserType = UserType.Attacker;
    attacker.Buildings = [];
    attacker.Tanks = [defTankAtt];

    this.GameArena.Attacker = attacker;

    this.GameArena.Uid = "uid";
    this.GameArena.Map = new Map(attacker, defender);

    this.applicationService.SetCurrentGameArena(this.GameArena);

    // console.log(this.GameArena.Map);

    // setTimeout(() => {
    //   defTankAtt.Direction = MapElementDirection.East;
    // }, 2000);

    const commandService = this.applicationService.GetCommandService();
    commandService.EnqueueMoveCommands(defTankAtt, {
      X: defTankAtt.Location.X,
      Y: defTankAtt.Location.Y
    });

    const callback = () => {
      const command = commandService.MoveCommandExecutor.CommandsQueue.Dequeue();
      if (command) {
        commandService.ExecuteAcceptedCommand(command).then(() => {

          commandService.EnqueueMoveCommands(defTankAtt, {
            X: defTankAtt.Location.X - 1,
            Y: defTankAtt.Location.Y
          });

          //console.log(commandService.MoveCommandExecutor.CommandsQueue);
          setTimeout(callback, 100);

        });
      }

    };

    callback();
  }

  ngOnInit(): void {}
}
