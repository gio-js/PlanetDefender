import { Command } from "../game/app.core.model.game.command";
import { MessageOutcomeType } from "../../enums/app.core.enum.messageOutcomeType";

export class WebSocketMessage {
    public MessageOutcome: MessageOutcomeType;
    public SenderUserId: string;
    public Command: Command;
}