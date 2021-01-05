export type HistoryTracker = {
    pts: number;
    lastMessagesSeq: number;
};

export type HistoryTrackerAction =
    | { type: 'reset', pts: number, seq: number }
    | { type: 'update', pts: number };

export function historyTrackerReducer(src: HistoryTracker, action: HistoryTrackerAction): HistoryTracker {
    if (action.type === 'reset') {
        // Ignore if new pts is too old
        if (action.pts <= src.pts) {
            return src;
        }

        return {
            pts: action.pts,
            lastMessagesSeq: action.seq
        };
    } else if (action.type === 'update') {
        return {
            ...src,
            pts: action.pts
        };
    }

    throw Error('Unknwon');
}

export function historyTrackerIsWithinKnown(src: HistoryTracker, diff: { from: number, to: number }) {
    return src.lastMessagesSeq <= diff.from && src.lastMessagesSeq < diff.to;
}