import { Injectable } from "@angular/core";
import { IGameService, Building, GameArena, Tank, Command } from "planet-defender-core";
import { HttpService } from "./services.httpService";

@Injectable()
export class GameHttpService implements IGameService {

    constructor(private http: HttpService) { }

    JoinArena(arenaId: string): Promise<GameArena> {
      return this.http.Get("/game/joinArena/" + arenaId, "");
    }

    CreateArena(currentUserId: string): Promise<GameArena> {
      return this.http.Get("/game/createArena/" + currentUserId, "");
    }

    SearchArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    NotifyCommand(command: Command): Promise<any> {
      return this.http.Post("/game/notifyCommand", command);
    }

    OnCommandAccepted(command: Command): any {
        throw new Error("Not implemented");
    }

    OnCommandRejected(command: Command) {
      throw new Error("Method not implemented.");
    }
}
