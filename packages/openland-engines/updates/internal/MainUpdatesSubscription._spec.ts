// import { delay } from 'openland-y-utils/timer';
// import { MainUpdatesSubscription, MainUpdatesSubscriptionHandler, MainUpdatesSubscriptionEvent } from './MainUpdatesSubscription';
// import { UpdatesSubscriptionMock } from './UpdatesSubscriptionMock';
// import { UpdatesApiMock } from './UpdatesApiMock';
// describe('MainUpdatesSubscription', () => {

//     it('should subscribe and receive update', async () => {
//         let handler = jest.fn<MainUpdatesSubscriptionHandler<number, { id: string }, { id: string }>>();
//         let mockApi = new UpdatesApiMock<number, { id: string }, { id: string }>();
//         let mockSubscription = new UpdatesSubscriptionMock<number>();
//         let subscription = new MainUpdatesSubscription<number, { id: string }, { id: string }>(mockApi, mockSubscription, async () => { /* */ });
//         mockApi.setState({ seq: 1, vt: 'vt1', sequences: [] });
//         subscription.start(null, handler);

//         // Start sequence from the same seq
//         mockSubscription.push({ type: 'started', seq: 1 });

//         // Send old events (must be ignored)
//         mockSubscription.push({ type: 'event', seq: 1, sequence: 'se-1', pts: 1, event: 1 });

//         // Send new events
//         mockSubscription.push({ type: 'event', seq: 2, sequence: 'se-1', pts: 2, event: 2 });
//         mockSubscription.push({ type: 'event', seq: 5, sequence: 'se-1', pts: 6, event: 3 });
//         mockSubscription.push({ type: 'event', seq: 3, sequence: 'se-1', pts: 4, event: 4 });
//         mockSubscription.push({ type: 'event', seq: 4, sequence: 'se-1', pts: 2, event: 5 });

//         await delay(100);

//         let expected: MainUpdatesSubscriptionEvent<number, { id: string }, { id: string }>[] = [
//             { type: 'state', state: 'starting' },
//             { type: 'state', state: 'connecting' },
//             { type: 'state', state: 'connected' },
//             { type: 'inited', vt: 'vt1' },
//             { type: 'event', vt: 'vt1', id: 'se-1', pts: 2, event: 2 },
//             { type: 'event', vt: 'vt1', id: 'se-1', pts: 4, event: 4 },
//             { type: 'event', vt: 'vt1', id: 'se-1', pts: 2, event: 5 },
//             { type: 'event', vt: 'vt1', id: 'se-1', pts: 6, event: 3 }
//         ];
//         expect(handler.mock.calls.map((v) => v[0])).toMatchObject(expected);
//     });
// });