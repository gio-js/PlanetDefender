import { PlayerMessageType } from "../../enums/app.core.enum.playerMessageType";
import { Point } from "../cache/app.core.model.cache.point";

export class PlayerMessage {
    public Uid: string;
    public IdSender: string;
    public IdReceiver: string;
    public MessageType: PlayerMessageType;
    public TargetElementId: string;
    public TargetLocation: Point;
}