import { Injectable } from "@angular/core";
import { IGameService, Building, GameArena, Tank, PlayerMessage } from "planet-defender-core";

@Injectable()
export class GameService implements IGameService {
    JoinArena(channelId: string): Promise<GameArena> {
        throw new Error("Method not implemented.");
    }

    CreateArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    SearchArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    NotifyAttack(target: Tank | Building, attacker: Tank): any {
        throw new Error("Not implemented");
    }

    NotifyMove(target: Tank, offsetX: number, offsetY: number): any {
        throw new Error("Not implemented");
    }

    OnMessageAccepted(message: PlayerMessage): any {
        throw new Error("Not implemented");
    }

}