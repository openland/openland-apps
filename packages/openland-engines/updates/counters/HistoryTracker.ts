import { sortedArrayFind } from './utils/sortedArrayFind';
import { sortedArrayAdd } from './utils/sortedArrayAdd';

export type HistoryTracker = {
    pts: number;
    lastMessagesSeq: number;
    lastMessages: number[];
};

export type HistoryTrackerAction =
    | { type: 'reset', pts: number, seq: number }
    | { type: 'message-add', pts: number, seq: number }
    | { type: 'message-remove', pts: number, seq: number };

export function historyTrackerReducer(src: HistoryTracker, action: HistoryTrackerAction): HistoryTracker {
    if (action.type === 'reset') {
        // Ignore if new pts is too old
        if (action.pts <= src.pts) {
            return src;
        }

        return {
            pts: action.pts,
            lastMessagesSeq: action.seq,
            lastMessages: []
        };
    } else if (action.type === 'message-add') {
        if (action.seq > src.lastMessagesSeq) {
            if (sortedArrayFind(src.lastMessages, action.seq) >= 0) {
                return {
                    ...src,
                    pts: action.pts
                };
            }
            return {
                pts: action.pts,
                lastMessagesSeq: src.lastMessagesSeq,
                lastMessages: sortedArrayAdd(src.lastMessages, action.seq)
            };
        } else {
            return {
                ...src,
                pts: action.pts
            };
        }
    } else if (action.type === 'message-remove') {
        if (action.seq > src.lastMessagesSeq) {
            if (sortedArrayFind(src.lastMessages, action.seq) < 0) {
                return {
                    ...src,
                    pts: action.pts
                };
            }
            return {
                pts: action.pts,
                lastMessagesSeq: src.lastMessagesSeq,
                lastMessages: src.lastMessages.filter((v) => v !== action.seq)
            };
        } else {
            return {
                ...src,
                pts: action.pts
            };
        }
    }

    throw Error('Unknwon');
}

export function historyTrackerIsWithinKnown(src: HistoryTracker, diff: { from: number, to: number }) {
    return src.lastMessagesSeq <= diff.from && src.lastMessagesSeq < diff.to;
}