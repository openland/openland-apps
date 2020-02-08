import { FullMessage_GeneralMessage_reactions } from 'openland-api/spacex.types';
import { ReactionUser } from './types';

export const extractReactionsUsers = (reactions: FullMessage_GeneralMessage_reactions[], myID: string): ReactionUser[] => {
    return reactions
        .reduce(
            (res, r) => res.find(u => u.id === r.user.id) ? res : [...res, r.user],
            [] as { id: string; name: string; }[]
        )
        // 'You' first
        .sort((a, b) => a.id === myID ? -1 : 1)
        // replace user name to 'You';
        .map(u => {
            return {
                id: u.id,
                name: u.id === myID ? 'You' : u.name,
            };
        });
};