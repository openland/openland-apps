import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import { MessageUsersReactions, MessageCounterReactions } from 'openland-api/spacex.types';
import { extractReactionsUsers } from './extractReactionsUsers';

export const getReactionsLabel = (reactions: MessageUsersReactions[], myID: string) => {
    const users = extractReactionsUsers(reactions, myID);
    return users;
};

export const getReactionFullCounter = (reactions: MessageCounterReactions[]) => {
    return TextRenderProccessor.processReactionCounters(reactions);
};