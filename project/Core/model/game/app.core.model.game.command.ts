import { CommandType } from "../../enums/app.core.enum.commandType";
import { Point } from "./app.core.model.game.point";

export class Command {
    public MessageType: CommandType;
    public TargetElementId: string;
    public TargetLocation: Point;
}
    