import { MessageReactionType } from 'openland-api/spacex.types';

export interface ReactionUser {
    id: string;
    name: string;
}

export interface ReactionReduced {
    count: number;
    my: boolean;
    reaction: MessageReactionType;
    users: ReactionUser[];
}