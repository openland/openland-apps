import { SortedArray } from './utils/SortedArray';

export type ChatCounterStateGeneric = {
    type: 'generic',
    readSeq: number;
    counter: number;
    mentions: number;

    serverMaxSeq: number;
    serverCounter: number;
    serverMentions: number;
    serverReadSeq: number;
    serverUnreadMessages: number[];
    serverUnreadMentions: number[];
};

export type ChatCounterStateEmpty = {
    type: 'empty'
};

export type ChatCounterState =
    | ChatCounterStateGeneric
    | ChatCounterStateEmpty;

export type ChatCounterAction =
    | { type: 'message-add', seq: number, hasMention: boolean }
    | { type: 'message-remove', seq: number }
    | { type: 'message-load', seqs: number[] }
    | { type: 'server-state', seq: number, readSeq: number, counter: number, mentions: number, lost: boolean }
    | { type: 'read-optimistic', readSeq: number }
    | { type: 'read', readSeq: number }
    ;

export function counterReducer(src: ChatCounterState, action: ChatCounterAction): ChatCounterState {

    // Initial state
    if (src.type === 'empty') {
        if (action.type === 'message-add') {
            return {
                type: 'generic',
                readSeq: 0,
                serverMaxSeq: action.seq,
                counter: 1,
                mentions: action.hasMention ? 1 : 0,

                serverCounter: 1,
                serverMentions: action.hasMention ? 1 : 0,
                serverReadSeq: 0,
                serverUnreadMessages: [action.seq],
                serverUnreadMentions: action.hasMention ? [action.seq] : []
            };
        } else if (action.type === 'message-remove') {
            return src; // Throw error?
        } else if (action.type === 'read-optimistic') {
            return src; // Throw error?
        } else if (action.type === 'read') {
            return src; // Throw error?
        } else if (action.type === 'server-state') {
            return {
                type: 'generic',
                readSeq: action.readSeq,
                counter: action.counter,
                mentions: action.mentions,

                serverMaxSeq: action.seq,
                serverCounter: action.counter,
                serverMentions: action.mentions,
                serverReadSeq: action.readSeq,
                serverUnreadMessages: [],
                serverUnreadMentions: []
            };
        } else if (action.type === 'message-load') {
            return src; // Throw error?
        } else {
            throw Error('Unknown action');
        }
    }

    // Handle generic
    let { readSeq, counter, mentions, serverMaxSeq, serverCounter, serverMentions, serverReadSeq, serverUnreadMessages, serverUnreadMentions } = src;

    // Message add
    if (action.type === 'message-add') {
        serverMaxSeq = Math.max(action.seq, serverMaxSeq);

        // Increment counters
        if (action.seq > serverReadSeq && SortedArray.numbers.find(src.serverUnreadMessages, action.seq) < 0) {
            serverUnreadMessages = SortedArray.numbers.add(serverUnreadMessages, action.seq);
            serverCounter++;

            // Increment optimistic counter
            if (action.seq > readSeq) {
                counter++;
            }

            // Update mentions
            if (action.hasMention && SortedArray.numbers.find(src.serverUnreadMentions, action.seq) < 0) {
                serverUnreadMentions = SortedArray.numbers.add(serverUnreadMentions, action.seq);
                serverMentions++;

                // Increment optimistic counter
                if (action.seq > readSeq) {
                    mentions++;
                }
            }
        }
    }

    // Message remove
    if (action.type === 'message-remove') {
        serverMaxSeq = Math.max(action.seq, serverMaxSeq);

        if (action.seq > serverReadSeq && SortedArray.numbers.find(src.serverUnreadMessages, action.seq) >= 0) {
            serverUnreadMessages = src.serverUnreadMessages.filter((v) => v !== action.seq); // TODO: Speedup?
            serverCounter--;

            // Decrement optimistic counter
            if (action.seq > readSeq) {
                counter--;
            }

            // Update mentions
            if (SortedArray.numbers.find(src.serverUnreadMentions, action.seq) >= 0) {
                serverUnreadMentions = src.serverUnreadMentions.filter((v) => v !== action.seq); // TODO: Speedup?
                serverMentions--;

                // Decrement optimistic counter
                if (action.seq > readSeq) {
                    mentions--;
                }
            }
        }
    }

    // Message load
    if (action.type === 'message-load') {
        for (let s of action.seqs) {
            serverMaxSeq = Math.max(serverMaxSeq, s);

            if (s > serverReadSeq && SortedArray.numbers.find(src.serverUnreadMessages, s) >= 0) {
                serverUnreadMessages = SortedArray.numbers.add(serverUnreadMessages, s);

                // NOTE: Not updating counter since it is simply history loading
                // serverCounter++;

                // Decrement optimistic counter if we inserted new message before readSeq
                if (s <= readSeq) {
                    counter--;
                }

                // Update mentions
                if (SortedArray.numbers.find(src.serverUnreadMentions, s) >= 0) {
                    if (s <= readSeq) {
                        mentions--;
                    }
                }
            }
        }
    }

    // Optimistic update
    if (action.type === 'read-optimistic') {
        if (action.readSeq > readSeq) {
            if (action.readSeq === serverMaxSeq) {
                // Reset counter on end reached
                counter = 0;
                mentions = 0;
                readSeq = action.readSeq;
            } else {
                // Update optimistic
                let counterDelta = serverUnreadMessages.filter((v) => readSeq < v && v <= action.readSeq).length;
                let mentionsDelta = serverUnreadMentions.filter((v) => readSeq < v && v <= action.readSeq).length;
                readSeq = action.readSeq;
                counter -= counterDelta;
                mentions -= mentionsDelta;
            }
        }
    }

    // Read
    if (action.type === 'read') {
        if (action.readSeq > readSeq) {
            if (action.readSeq === serverMaxSeq) {
                // Reset counter on end reached
                counter = 0;
                mentions = 0;
                readSeq = action.readSeq;
                serverReadSeq = action.readSeq;
                serverUnreadMessages = [];
                serverUnreadMentions = [];
            } else {
                // Update optimistic
                let counterDelta = serverUnreadMessages.filter((v) => readSeq < v && v <= action.readSeq).length;
                let mentionsDelta = serverUnreadMentions.filter((v) => readSeq < v && v <= action.readSeq).length;
                readSeq = action.readSeq;
                serverReadSeq = action.readSeq;
                serverUnreadMessages = serverUnreadMessages.filter((v) => readSeq < v);
                serverUnreadMentions = serverUnreadMentions.filter((v) => readSeq < v);
                counter -= counterDelta;
                mentions -= mentionsDelta;
            }
        }
    }

    // Server state
    if (action.type === 'server-state') {
        serverMaxSeq = Math.max(serverMaxSeq, action.seq);

        if (action.readSeq > serverReadSeq) {

            if (action.lost) {
                // Reset state on lost
                readSeq = action.readSeq;
                serverReadSeq = action.readSeq;
                counter = action.counter;
                mentions = action.mentions;
                serverUnreadMessages = [];
                serverUnreadMentions = [];
                serverCounter = action.counter;
                serverMentions = action.mentions;
            } else {

                // Update optimistic counter
                if (action.readSeq >= readSeq) {
                    let optimisticRead = serverUnreadMessages.filter((v) => action.readSeq < v && v <= readSeq).length;
                    let optimisticMentionsRead = serverUnreadMentions.filter((v) => action.readSeq < v && v <= readSeq).length;
                    readSeq = action.readSeq;
                    counter = action.counter - optimisticRead;
                    mentions = action.mentions - optimisticMentionsRead;
                }

                // Update server state
                serverReadSeq = action.readSeq;
                serverUnreadMessages = serverUnreadMessages.filter((v) => serverReadSeq < v);
                serverUnreadMentions = serverUnreadMentions.filter((v) => serverReadSeq < v);
                serverCounter = action.counter;
                serverMentions = action.mentions;
            }
        }
    }

    return {
        type: 'generic',
        counter,
        mentions,
        readSeq,
        serverMaxSeq,
        serverCounter,
        serverMentions,
        serverReadSeq,
        serverUnreadMessages,
        serverUnreadMentions
    };
}