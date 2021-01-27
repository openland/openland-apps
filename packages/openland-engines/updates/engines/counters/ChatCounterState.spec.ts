import { counterReducer, ChatCounterState } from './ChatCounterState';

function expectToMatch(src: ChatCounterState, expected: ChatCounterState) {
    expect(src).toMatchObject(expected);
}

describe('ChatCounterState', () => {
    it('should add and remove messages', () => {
        let state: ChatCounterState = { type: 'empty' };

        // Initial add
        state = counterReducer(state, { type: 'message-add', seq: 1, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,
            mentions: 0,

            serverMaxSeq: 1,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverUnreadMentions: [],
            serverCounter: 1,
            serverMentions: 0
        });

        // Double adding
        state = counterReducer(state, { type: 'message-add', seq: 1, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,
            mentions: 0,

            serverMaxSeq: 1,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverUnreadMentions: [],
            serverCounter: 1,
            serverMentions: 0
        });

        // Second add
        state = counterReducer(state, { type: 'message-add', seq: 2, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 2,
            mentions: 0,

            serverMaxSeq: 2,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2],
            serverUnreadMentions: [],
            serverCounter: 2,
            serverMentions: 0,
        });

        // Remove
        state = counterReducer(state, { type: 'message-remove', seq: 2 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,
            mentions: 0,

            serverMaxSeq: 2,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverUnreadMentions: [],
            serverCounter: 1,
            serverMentions: 0
        });

        // Third add
        state = counterReducer(state, { type: 'message-add', seq: 3, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 2,
            mentions: 0,

            serverMaxSeq: 3,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 3],
            serverUnreadMentions: [],
            serverCounter: 2,
            serverMentions: 0
        });

        // Third add
        state = counterReducer(state, { type: 'message-add', seq: 4, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 3,
            mentions: 0,

            serverMaxSeq: 4,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 3, 4],
            serverUnreadMentions: [],
            serverCounter: 3,
            serverMentions: 0
        });
    });

    it('should perform optimistic reads', () => {
        let state: ChatCounterState = { type: 'empty' };
        state = counterReducer(state, { type: 'message-add', seq: 1, hasMention: false });
        state = counterReducer(state, { type: 'message-add', seq: 2, hasMention: false });
        state = counterReducer(state, { type: 'message-add', seq: 3, hasMention: false });
        state = counterReducer(state, { type: 'message-add', seq: 4, hasMention: false });
        state = counterReducer(state, { type: 'message-add', seq: 5, hasMention: false });
        state = counterReducer(state, { type: 'message-add', seq: 6, hasMention: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 6,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverUnreadMentions: [],
            serverCounter: 6,
            serverMentions: 0
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 1 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 1,
            counter: 5,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverUnreadMentions: [],
            serverCounter: 6,
            serverMentions: 0
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 3 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 3,
            counter: 3,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverUnreadMentions: [],
            serverCounter: 6,
            serverMentions: 0
        });

        state = counterReducer(state, { type: 'server-state', seq: 6, counter: 3, mentions: 0, readSeq: 3, lost: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 3,
            counter: 3,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 3,
            serverUnreadMessages: [4, 5, 6],
            serverUnreadMentions: [],
            serverCounter: 3,
            serverMentions: 0
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 4 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 4,
            counter: 2,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 3,
            serverUnreadMessages: [4, 5, 6],
            serverUnreadMentions: [],
            serverCounter: 3,
            serverMentions: 0
        });

        state = counterReducer(state, { type: 'server-state', seq: 6, counter: 1, mentions: 0, readSeq: 5, lost: false });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 5,
            counter: 1,
            mentions: 0,

            serverMaxSeq: 6,
            serverReadSeq: 5,
            serverUnreadMessages: [6],
            serverUnreadMentions: [],
            serverCounter: 1,
            serverMentions: 0
        });
    });
});