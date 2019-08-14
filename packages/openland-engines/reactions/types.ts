import { MessageReactionType } from 'openland-api/Types';

export interface ReactionUser {
    id: string;
    name: string;
    nameProcessed: string | JSX.Element;
}

export interface ReactionReduced {
    count: number;
    my: boolean;
    reaction: MessageReactionType;
    users: ReactionUser[];
}