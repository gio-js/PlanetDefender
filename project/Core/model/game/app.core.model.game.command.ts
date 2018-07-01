import { CommandType } from "../../enums/app.core.enum.commandType";
import { Point } from "./app.core.model.game.point";

export class Command {
    public Uid: string;
    public CommandType: CommandType;
    public RelatedElementId: string;
    public TargetElementId: string;
    public TargetLocation: Point;
}
    