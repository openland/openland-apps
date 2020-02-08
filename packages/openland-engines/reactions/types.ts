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

export interface ReactionUserEmojify {
    id: string;
    name: string | JSX.Element;
}

export interface ReactionReducedEmojify {
    count: number;
    my: boolean;
    reaction: MessageReactionType;
    users: ReactionUserEmojify[];
}