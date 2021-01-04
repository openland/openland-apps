import { counterReducer, ChatCounterState } from './ChatCounterState';

function expectToMatch(src: ChatCounterState, expected: ChatCounterState) {
    expect(src).toMatchObject(expected);
}

describe('ChatCounterState', () => {
    it('should add and remove messages', () => {
        let state: ChatCounterState = { type: 'empty' };

        // Initial add
        state = counterReducer(state, { type: 'message-add', seq: 1 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,

            serverMaxSeq: 1,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverCounter: 1
        });

        // Double adding
        state = counterReducer(state, { type: 'message-add', seq: 1 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,

            serverMaxSeq: 1,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverCounter: 1
        });

        // Second add
        state = counterReducer(state, { type: 'message-add', seq: 2 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 2,

            serverMaxSeq: 2,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2],
            serverCounter: 2
        });

        // Remove
        state = counterReducer(state, { type: 'message-remove', seq: 2 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 1,

            serverMaxSeq: 2,
            serverReadSeq: 0,
            serverUnreadMessages: [1],
            serverCounter: 1
        });

        // Third add
        state = counterReducer(state, { type: 'message-add', seq: 3 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 2,

            serverMaxSeq: 3,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 3],
            serverCounter: 2
        });

        // Third add
        state = counterReducer(state, { type: 'message-add', seq: 4 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 3,

            serverMaxSeq: 4,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 3, 4],
            serverCounter: 3
        });
    });

    it('should perform optimistic reads', () => {
        let state: ChatCounterState = { type: 'empty' };
        state = counterReducer(state, { type: 'message-add', seq: 1 });
        state = counterReducer(state, { type: 'message-add', seq: 2 });
        state = counterReducer(state, { type: 'message-add', seq: 3 });
        state = counterReducer(state, { type: 'message-add', seq: 4 });
        state = counterReducer(state, { type: 'message-add', seq: 5 });
        state = counterReducer(state, { type: 'message-add', seq: 6 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 0,
            counter: 6,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverCounter: 6
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 1 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 1,
            counter: 5,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverCounter: 6
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 3 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 3,
            counter: 3,

            serverMaxSeq: 6,
            serverReadSeq: 0,
            serverUnreadMessages: [1, 2, 3, 4, 5, 6],
            serverCounter: 6
        });

        state = counterReducer(state, { type: 'server-state', seq: 6, counter: 3, readSeq: 3 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 3,
            counter: 3,

            serverMaxSeq: 6,
            serverReadSeq: 3,
            serverUnreadMessages: [4, 5, 6],
            serverCounter: 3
        });

        state = counterReducer(state, { type: 'read-optimistic', readSeq: 4 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 4,
            counter: 2,

            serverMaxSeq: 6,
            serverReadSeq: 3,
            serverUnreadMessages: [4, 5, 6],
            serverCounter: 3
        });

        state = counterReducer(state, { type: 'server-state', seq: 6, counter: 1, readSeq: 5 });
        expectToMatch(state, {
            type: 'generic',
            readSeq: 5,
            counter: 1,

            serverMaxSeq: 6,
            serverReadSeq: 5,
            serverUnreadMessages: [6],
            serverCounter: 1
        });
    });
});