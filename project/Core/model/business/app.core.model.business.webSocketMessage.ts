import { Command } from "../game/app.core.model.game.command";

export class WebSocketMessage {
    public SenderUserId: string;
    public Command: Command;
}