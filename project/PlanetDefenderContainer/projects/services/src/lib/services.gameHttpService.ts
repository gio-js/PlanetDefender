import { Injectable } from "@angular/core";
import { IGameService, Building, GameArena, Tank, Command } from "planet-defender-core";

@Injectable()
export class GameHttpService implements IGameService {

    /**
     * Base menu commands
     */

    JoinArena(channelId: string): Promise<GameArena> {
        throw new Error("Method not implemented.");
    }

    CreateArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    SearchArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    NotifyCommand(command: Command) {
      throw new Error("Method not implemented.");
    }

    OnCommandAccepted(command: Command): any {
        throw new Error("Not implemented");
    }

    OnCommandRejected(command: Command) {
      throw new Error("Method not implemented.");
    }
}
