import { ICommandQueue } from './app.core.interfaces.client.commandsQueue';

export interface ICommandExecutor {

    CommandsQueue: ICommandQueue;
    RelatedElementId: string;

}