import { FullMessage_GeneralMessage_reactions } from 'openland-api/spacex.types';
import { ReactionReduced } from './types';

export const reduceReactions = (reactions: FullMessage_GeneralMessage_reactions[], myID: string) => {
    let reactionsReduced = reactions.reduce(
        (res, r) => {
            let data = res.get(r.reaction) || { reaction: r.reaction, count: 0, my: false, users: [] };
            data.count++;
            data.my = data.my || r.user.id === myID;
            data.users.push({
                id: r.user.id,
                name: r.user.id === myID ? 'You' : r.user.name,
            });
            res.set(r.reaction, data);
            return res;
        },
        new Map<string, ReactionReduced>()
    );
    let reactionsSorted = [...reactionsReduced.values()].sort((a, b) => a.count - b.count);

    return reactionsSorted;
};