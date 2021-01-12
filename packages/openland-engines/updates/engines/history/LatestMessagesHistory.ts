export type LatestMessagesHistory =
    | {
        type: 'generic'
        pts: number;
        seqFrom: number;
        seqTo: number;
        lastMessages: string[];
    }
    | {
        type: 'empty',
        pts: number;
    };

export type LatestMessagesHistoryAction =
    | { type: 'reset', pts: number, seq: number, topMessage: string | null }
    | { type: 'message', pts: number, seq: number, message: string }
    | { type: 'message-delete', pts: number, seq: number, message: string };

export function messagesHistoryReducer(src: LatestMessagesHistory, action: LatestMessagesHistoryAction): LatestMessagesHistory {

    //
    // Empty state
    //

    if (src.type === 'empty') {
        if (action.type === 'reset') {
            if (!action.topMessage) {
                return {
                    type: 'empty',
                    pts: action.pts
                };
            } else {
                return {
                    type: 'generic',
                    pts: action.pts,
                    seqFrom: action.seq,
                    seqTo: action.seq,
                    lastMessages: [action.topMessage]
                };
            }
        } else if (action.type === 'message') {
            return {
                type: 'generic',
                pts: action.pts,
                seqFrom: action.seq,
                seqTo: action.seq,
                lastMessages: [action.message]
            };
        } else if (action.type === 'message-delete') {
            return src;
        } else {
            throw Error('Unknown action');
        }
    }

    //
    // Generic State
    //

    // Reset
    if (action.type === 'reset') {
        // Ignore if pts is too old
        if (action.pts <= src.pts) {
            return src;
        }

        if (!action.topMessage) {
            return {
                type: 'empty',
                pts: action.pts
            };
        } else {
            return {
                type: 'generic',
                pts: action.pts,
                seqFrom: action.seq,
                seqTo: action.seq,
                lastMessages: [action.topMessage]
            };
        }
    }

    // New message
    if (action.type === 'message') {
        if (src.seqFrom <= action.seq) {
            if (src.lastMessages.find((v) => v === action.message)) {
                return {
                    ...src,
                    pts: action.pts
                };
            } else {
                if (action.seq >= src.seqFrom) {
                    return {
                        ...src,
                        pts: action.pts,
                        seqTo: Math.max(action.seq, src.seqTo),
                        lastMessages: [...src.lastMessages, action.message]
                    };
                } else {
                    return {
                        ...src,
                        pts: action.pts
                    };
                }
            }
        } else {
            return {
                ...src,
                pts: action.pts
            };
        }
    }

    if (action.type === 'message-delete') {
        if (src.seqFrom <= action.seq) {
            if (!src.lastMessages.find((v) => v === action.message)) {
                return {
                    ...src,
                    pts: action.pts
                };
            } else {
                let lastMessages = src.lastMessages.filter((v) => v !== action.message);
                if (lastMessages.length === 0) {
                    return {
                        type: 'empty',
                        pts: action.pts
                    };
                }
                return {
                    ...src,
                    pts: action.pts,
                    seqTo: Math.max(action.seq, src.seqTo),
                    lastMessages
                };
            }
        } else {
            return {
                ...src,
                pts: action.pts
            };
        }
    }

    throw Error('Unknown action');
}