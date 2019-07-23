import { FullMessage_GeneralMessage_reactions, MessageReactionType } from 'openland-api/Types';

export const extractReactionsSorted = (reactions: FullMessage_GeneralMessage_reactions[], myID: string) => {
    let reactionsReduced = reactions.reduce(
        (res, r) => {
            let data = res.get(r.reaction) || { reaction: r.reaction, count: 0, my: false };
            data.count++;
            data.my = data.my || r.user.id === myID;
            res.set(r.reaction, data);
            return res;
        },
        new Map<string, { count: number, my: boolean, reaction: MessageReactionType }>()
    );
    let reactionsSorted = [...reactionsReduced.values()].sort((a, b) => a.count - b.count);
    let hasYou = false;
    let users = reactions
        .reduce(
            (res, r) => res.find(u => u.id === r.user.id) ? res : [...res, r.user],
            [] as { id: string, name: string }[]
        )
        // 'You' first
        .sort((a, b) => a.id === myID ? -1 : 1)
        // replace user name to 'You';
        .map(u => {
            hasYou = true;

            if (u.id === myID) {
                return { ...u, name: 'You' };
            }
            
            return u;
        });

    let usersString = '';
    if (users.length > 0) {
        if (users.length === 1) {
            usersString = users[0].name;
        } else if (users.length === 2) {
            usersString = users[0].name + ' and ' + users[1].name;
        } else {
            const othersCount = users.length - 1;
            usersString = users[0].name + ` and ${othersCount} others`;
        }
    }

    return { reactionsSorted, usersString };
};