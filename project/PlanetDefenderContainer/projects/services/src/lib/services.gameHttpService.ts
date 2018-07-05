import { Injectable } from "@angular/core";
import {
  IGameService, Building, GameArena, Tank, Command,
  PRIMARY_SERVICE_ENDPOINT, WebSocketMessage, ICommandService,
  MessageOutcomeType,
  UserStatistics, GameArenaFactory } from "planet-defender-core";
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
     * The web socket rxjs observer
     */
    private webSocketObserver: Subject<MessageEvent>;

    constructor(private http: HttpService, private commandService: ICommandService) {

    }

    private createWebSocketListener(channelId: string): Subject<MessageEvent> {
      if (this.socket) {
        this.socket.close();
        this.socket.disconnect();
        this.socket = null;
      }

      if (this.webSocketObserver) {
        this.webSocketObserver.unsubscribe();
        this.webSocketObserver = null;
      }

      this.socket = socketIOClient.connect(PRIMARY_SERVICE_ENDPOINT);

      // observable creation
      const observable = new Observable(observer => {

        this.socket.on('message', (data) => {
          console.log("Received message" + JSON.stringify(data));
          observer.next(data);
        });

        return () => {
          this.socket.disconnect();
        };

      });

      // the observer management
      const resultObserver = {
        next: (data: Object) => {
            // this.socket.emit('message', JSON.stringify(data));

          console.log("resultObserver message" + JSON.stringify(data));
          const message = data as WebSocketMessage;
          switch (message.MessageOutcome) {
            case MessageOutcomeType.Accepted :
            this.OnCommandAccepted(message.Command);
            break;
            case MessageOutcomeType.Rejected :
            this.OnCommandRejected(message.Command);
            break;
          }
        },
      };

      // observer definition return in order to get any update by websocket
      this.webSocketObserver = Subject.create(resultObserver, observable);
      return this.webSocketObserver;
    }

    JoinArena(): Promise<GameArena> {
      return this.http.Get("/game/joinArena", "").then(arena => {

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
      return this.http.Post("/game/notifyCommand", command);
    }

    OnCommandAccepted(command: Command): any {
      this.commandService.ExecuteAcceptedCommand(command);
    }

    OnCommandRejected(command: Command) {
      this.commandService.ClearCommandsQueue(command.RelatedElementId);
    }
}
