import { Component, OnInit } from "@angular/core";
import { GameArena, Map, ArenaPlayer, UserType, Tank, MapElementDirection, MapElementType } from "planet-defender-core";

@Component({
  selector: "web-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public GameArena = new GameArena();

  constructor() {
    const defender = new ArenaPlayer();
    defender.Email = "c@d.it";
    defender.UserType = UserType.Defender;
    defender.Tanks = [];
    defender.Buildings = [];

    const defTank = new Tank();
    defTank.Direction = MapElementDirection.East;
    defTank.ElementType = MapElementType.Tank;
    defTank.Location = {
      X: 0,
      Y: 0
    };
    defTank.Lives = 3;
    defTank.Uid = "aaaa";

    defender.Tanks = [ defTank ];



    this.GameArena.Defender = defender;

    const attacker = new ArenaPlayer();
    attacker.Email = "c@d.it";
    attacker.UserType = UserType.Attacker;
    attacker.Tanks = [];
    attacker.Buildings = [];

    this.GameArena.Attacker = attacker;

    this.GameArena.Uid = "uid";
    this.GameArena.Map = new Map(attacker, defender);
  }

  ngOnInit(): void { }
}
