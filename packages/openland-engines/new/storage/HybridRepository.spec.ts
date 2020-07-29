import { HybridMessage } from './HybridMessage';
import { WireMessage } from './../WireMessage';
import { HybridRepository } from './HybridRepository';
import { PersistenceProviderInMemory } from './../persistence/PersistenceProviderInMemory';
import { Persistence } from './../persistence/Persistence';

function createMessage(seq: number): WireMessage {
    return {
        id: '' + seq,
        seq,
        sender: 'user_id',
        text: 'text',
        fallback: '!',
        date: 0
    };
}

function createHybridMessage(key: string, seq: number): HybridMessage {
    return {
        key,
        seq,
        sender: 'user_id',
        text: 'text',
        fallback: '!',
        date: 0,
        type: 'sent',
        id: '' + seq
    };
}

function createHybridPendingMessage(key: string): HybridMessage {
    return {
        key,
        sender: 'user_id',
        text: 'text',
        fallback: '!',
        date: 0,
        type: 'pending'
    };
}

describe('HybridRepository', () => {
    it('should append messages', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let repo = HybridRepository.open('1', persistence);

        // Initial read should be null
        let read = await persistence.inTx(async (tx) => {
            return await repo.readById('1', tx);
        });
        expect(read).toBeNull();

        // Append message
        let initialAppended = await persistence.inTx(async (tx) => {
            let appended: HybridMessage[] = [];
            appended.push(await repo.handleMessageReceived(createMessage(1), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(2), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(3), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(4), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(5), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(6), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(7), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(8), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(9), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(10), null, tx));
            appended.push(await repo.handleMessageReceived(createMessage(11), null, tx));
            return appended;
        });

        expect(initialAppended).toMatchObject([
            createHybridMessage('0', 1),
            createHybridMessage('1', 2),
            createHybridMessage('2', 3),
            createHybridMessage('3', 4),
            createHybridMessage('4', 5),
            createHybridMessage('5', 6),
            createHybridMessage('6', 7),
            createHybridMessage('7', 8),
            createHybridMessage('8', 9),
            createHybridMessage('9', 10),
            createHybridMessage('10', 11)
        ]);

        // Should match
        read = await persistence.inTx(async (tx) => {
            return await repo.readById('1', tx);
        });
        expect(read).toMatchObject(createHybridMessage('0', 1));

        // Should read after
        let readAfter = await persistence.inTx(async (tx) => {
            return await repo.readAfter({ after: 6 }, tx);
        });
        expect(readAfter.completed).toBe(true);
        expect(readAfter.partial).toBe(false);
        expect(readAfter.maxSeq).toBe(11);
        expect(readAfter.items).toMatchObject([
            createHybridMessage('6', 7),
            createHybridMessage('7', 8),
            createHybridMessage('8', 9),
            createHybridMessage('9', 10),
            createHybridMessage('10', 11)
        ]);

        // Should read before
        let readBefore = await persistence.inTx(async (tx) => {
            return await repo.readBefore({ before: 6 }, tx);
        });
        expect(readBefore.completed).toBe(false);
        expect(readBefore.partial).toBe(true);
        expect(readBefore.minSeq).toBe(1);
        expect(readBefore.items).toMatchObject([
            createHybridMessage('0', 1),
            createHybridMessage('1', 2),
            createHybridMessage('2', 3),
            createHybridMessage('3', 4),
            createHybridMessage('4', 5),
        ]);
    });
});