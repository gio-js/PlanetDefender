import { Injectable } from "@angular/core";
import {
  IGameService, Building, GameArena, Tank, Command,
  PRIMARY_SERVICE_ENDPOINT, ICommandService,
  MessageOutcomeType,
  UserStatistics, GameArenaFactory,
  WEBSOCKET_SERVICE_ENDPOINT, WEBSOCKET_EVENT_NEW_PLAYER_JOINED,
  WEBSOCKET_COMMAND_ACCEPTED, WEBSOCKET_COMMAND_REJECTED } from "planet-defender-core";
import { HttpService } from "./services.httpService";
import * as socketIOClient from 'socket.io-client';
import { Subject, Observable } from "rxjs";

@Injectable()
export class GameHttpService implements IGameService {

    /**
     * Web socket instance
     */
    private socket = null;

    /**
     * Received new player joined event
     */
    public OnPlayerJoined: Subject<GameArena> = new Subject<GameArena>();

    constructor(private http: HttpService, private commandService: ICommandService) { }

    private createWebSocketListener(channelId: string) {
      if (this.socket) {
        this.socket.close();
        this.socket.disconnect();
        this.socket = null;
      }

      // if (this.OnPlayerJoined) {
      //   this.OnPlayerJoined.unsubscribe();
      //   this.OnPlayerJoined = null;
      // }

      this.socket = socketIOClient.connect(WEBSOCKET_SERVICE_ENDPOINT + "/" + channelId);

      this.socket.on(WEBSOCKET_EVENT_NEW_PLAYER_JOINED, (arena) => {
        console.log("Received message, join player" + JSON.stringify(arena));

        // regenerate arena object
        const arenaInstance = GameArenaFactory.Create(JSON.parse(arena));

        // raise on player joined event
        this.OnPlayerJoined.next(arenaInstance);
      });

      this.socket.on(WEBSOCKET_COMMAND_ACCEPTED, (command) => {
        console.log("Received message, accepted command" + JSON.stringify(command));

        // regenerate arena object
        this.OnCommandAccepted(command);
      });

      this.socket.on(WEBSOCKET_COMMAND_REJECTED, (command) => {
        console.log("Received message, rejected command" + JSON.stringify(command));

        // regenerate arena object
        this.OnCommandRejected(command);
      });
    }

    JoinArena(attackerUserId: string): Promise<GameArena> {
      return this.http.Get("/game/joinArena/" + attackerUserId, "").then(arena => {

        // create web socket commands listener
        this.createWebSocketListener(arena.Uid);
        return GameArenaFactory.Create(arena);

      });
    }

    CreateArena(currentUserId: string): Promise<GameArena> {
      return this.http.Get("/game/createArena/" + currentUserId, "").then(arena => {

        // create web socket commands listener
        this.createWebSocketListener(arena.Uid);
        return GameArenaFactory.Create(arena);

      });
    }

    GetStatistics(currentUserId: string): Promise<UserStatistics> {
      return this.http.Get("/game/userStatistics/" + currentUserId, "");
    }

    SearchArena(): Promise<GameArena> {
        throw new Error("Not implemented");
    }

    NotifyCommand(command: Command): Promise<any> {
      return this.http.Post("/game/notifyCommand", {
        command: command
      });
    }

    OnCommandAccepted(command: Command): any {
      this.commandService.ExecuteAcceptedCommand(command);
    }

    OnCommandRejected(command: Command) {
      this.commandService.ClearCommandsQueue(command.RelatedElementId);
    }
}
