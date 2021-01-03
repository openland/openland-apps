import { sortedArrayAdd } from './utils/sortedArrayAdd';
import { sortedArrayFind } from './utils/sortedArrayFind';

export type ChatCounterStateGeneric = {
    type: 'generic',
    readSeq: number;
    counter: number;

    serverMaxSeq: number;
    serverCounter: number;
    serverReadSeq: number;
    serverUnreadMessages: number[];
};

export type ChatCounterStateEmpty = {
    type: 'empty'
};

export type ChatCounterState =
    | ChatCounterStateGeneric
    | ChatCounterStateEmpty;

export type ChatCounterAction =
    | { type: 'message-add', seq: number }
    | { type: 'message-remove', seq: number }
    | { type: 'message-load', seqs: number[] }
    | { type: 'server-state', seq: number, readSeq: number, counter: number }
    | { type: 'optimistic-read', readSeq: number }
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

                serverCounter: 1,
                serverReadSeq: 0,
                serverUnreadMessages: [action.seq]
            };
        } else if (action.type === 'message-remove') {
            return src; // Throw error?
        } else if (action.type === 'optimistic-read') {
            return src; // Throw error?
        } else if (action.type === 'server-state') {
            return {
                type: 'generic',
                readSeq: action.readSeq,
                counter: action.counter,

                serverMaxSeq: action.seq,
                serverCounter: action.counter,
                serverReadSeq: action.readSeq,
                serverUnreadMessages: []
            };
        } else if (action.type === 'message-load') {
            return src; // Throw error?
        } else {
            throw Error('Unknown action');
        }
    }

    // Handle generic
    let { readSeq, counter, serverMaxSeq, serverCounter, serverReadSeq, serverUnreadMessages } = src;

    // Message add
    if (action.type === 'message-add') {
        serverMaxSeq = Math.max(action.seq, serverMaxSeq);

        // Increment counters
        if (action.seq > serverReadSeq && sortedArrayFind(src.serverUnreadMessages, action.seq) < 0) {
            serverUnreadMessages = sortedArrayAdd(serverUnreadMessages, action.seq);
            serverCounter++;

            // Increment optimistic counter
            if (action.seq > readSeq) {
                counter++;
            }
        }
    }

    // Message remove
    if (action.type === 'message-remove') {
        serverMaxSeq = Math.max(action.seq, serverMaxSeq);

        if (action.seq > serverReadSeq && sortedArrayFind(src.serverUnreadMessages, action.seq) >= 0) {
            serverUnreadMessages = src.serverUnreadMessages.filter((v) => v !== action.seq); // TODO: Speedup?
            serverCounter--;

            // Decrement optimistic counter
            if (action.seq > readSeq) {
                counter--;
            }
        }
    }

    // Message load
    if (action.type === 'message-load') {
        for (let s of action.seqs) {
            serverMaxSeq = Math.max(serverMaxSeq, s);

            if (s > serverReadSeq && sortedArrayFind(src.serverUnreadMessages, s) >= 0) {
                serverUnreadMessages = sortedArrayAdd(serverUnreadMessages, s);

                // NOTE: Not updating counter since it is simply history loading
                // serverCounter++;

                // Decrement optimistic counter if we inserted new message before readSeq
                if (s <= readSeq) {
                    counter--;
                }
            }
        }
    }

    // Optimistic update
    if (action.type === 'optimistic-read') {
        if (action.readSeq > readSeq) {
            if (action.readSeq === serverMaxSeq) {
                // Reset counter on end reached
                counter = 0;
                readSeq = action.readSeq;
            } else {
                // Update optimistic
                let coounterDelta = serverUnreadMessages.filter((v) => readSeq < v && v <= action.readSeq).length;
                readSeq = action.readSeq;
                counter -= coounterDelta;
            }
        }
    }

    // Server state
    if (action.type === 'server-state') {
        serverMaxSeq = Math.max(serverMaxSeq, action.seq);

        if (action.readSeq > serverReadSeq) {

            // Update optimistic counter
            if (action.readSeq >= readSeq) {
                let optimisticRead = serverUnreadMessages.filter((v) => action.readSeq < v && v <= readSeq).length;
                readSeq = action.readSeq;
                counter = action.counter - optimisticRead;
            }

            // Update server state
            serverReadSeq = action.readSeq;
            serverUnreadMessages = serverUnreadMessages.filter((v) => serverReadSeq < v);
            serverCounter = action.counter;
        }
    }

    return {
        type: 'generic',
        counter,
        readSeq,
        serverMaxSeq,
        serverCounter,
        serverReadSeq,
        serverUnreadMessages
    };
}