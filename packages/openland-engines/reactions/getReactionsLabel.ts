import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/spacex.types';
import { extractReactionsUsers } from './extractReactionsUsers';

export const getReactionsLabel = (reactions: FullMessage_GeneralMessage_reactions[], myID: string) => {
    const users = extractReactionsUsers(reactions, myID);

    return TextRenderProccessor.processReactionsLabel(users);
};