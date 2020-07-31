import { PendingMessage } from './../PendingMessage';
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

function createPendingMessage(repeat: string): PendingMessage {
    return {
        sender: 'user_id',
        text: 'text',
        fallback: '!',
        date: 0,
        repeatKey: repeat
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
        expect(readBefore.items).toMatchObject([
            createHybridMessage('0', 1),
            createHybridMessage('1', 2),
            createHybridMessage('2', 3),
            createHybridMessage('3', 4),
            createHybridMessage('4', 5),
        ]);
    });

    it('should maintain latest messages', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let repo = HybridRepository.open('1', persistence);

        // Inital messages
        await persistence.inTx(async (tx) => {
            await repo.handleMessageReceived(createMessage(1), null, tx);
            await repo.handleMessageReceived(createMessage(2), null, tx);
            await repo.handleMessageReceived(createMessage(3), null, tx);
            await repo.handleMessageReceived(createMessage(4), null, tx);
            await repo.handleMessageReceived(createMessage(5), null, tx);
            await repo.handleMessageReceived(createMessage(6), null, tx);
            await repo.handleMessageReceived(createMessage(7), null, tx);
            await repo.handleMessageReceived(createMessage(8), null, tx);
            await repo.handleMessageReceived(createMessage(9), null, tx);
            await repo.handleMessageReceived(createMessage(10), null, tx);
            await repo.handleMessageReceived(createMessage(11), null, tx);
        });

        // Append pending message
        let appended = await persistence.inTx(async (tx) => {
            return await repo.handlePendingMessageCreated(createPendingMessage('repeat1'), tx);
        });
        expect(appended).toMatchObject(createHybridPendingMessage('11'));

        // Check readAfter
        let read = await persistence.inTx(async (tx) => {
            return await repo.readAfter({ after: 6 }, tx);
        });
        expect(read.completed).toBe(true);
        expect(read.partial).toBe(false);
        expect(read.items).toMatchObject([
            createHybridMessage('6', 7),
            createHybridMessage('7', 8),
            createHybridMessage('8', 9),
            createHybridMessage('9', 10),
            createHybridMessage('10', 11),
            createHybridPendingMessage('11')
        ]);

        // Append new message
        let received = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(12), null, tx);
        });
        expect(received).not.toBe(null);

        // Check readAfter
        read = await persistence.inTx(async (tx) => {
            return await repo.readAfter({ after: 6 }, tx);
        });
        expect(read.completed).toBe(true);
        expect(read.partial).toBe(false);
        expect(read.items).toMatchObject([
            createHybridMessage('6', 7),
            createHybridMessage('7', 8),
            createHybridMessage('8', 9),
            createHybridMessage('9', 10),
            createHybridMessage('10', 11),
            createHybridPendingMessage('11'),
            createHybridMessage('12', 12),
        ]);

        // Mark as sent
        let sent = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(13), 'repeat1', tx);
        });
        expect(sent.key).toBe(appended.key);

        // Check readAfter
        read = await persistence.inTx(async (tx) => {
            return await repo.readAfter({ after: 6 }, tx);
        });
        expect(read.completed).toBe(true);
        expect(read.partial).toBe(false);
        expect(read.items).toMatchObject([
            createHybridMessage('6', 7),
            createHybridMessage('7', 8),
            createHybridMessage('8', 9),
            createHybridMessage('9', 10),
            createHybridMessage('10', 11),
            createHybridMessage('12', 12),
            createHybridMessage('13', 13),
        ]);
    });

    it('should handle receive in inconsistent order', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let repo = HybridRepository.open('1', persistence);

        // Inital messages
        await persistence.inTx(async (tx) => {
            await repo.handleMessageReceived(createMessage(1), null, tx);
            await repo.handleMessageReceived(createMessage(2), null, tx);
            await repo.handleMessageReceived(createMessage(3), null, tx);
            await repo.handleMessageReceived(createMessage(4), null, tx);
            await repo.handleMessageReceived(createMessage(5), null, tx);
            await repo.handleMessageReceived(createMessage(6), null, tx);
            await repo.handleMessageReceived(createMessage(7), null, tx);
            await repo.handleMessageReceived(createMessage(8), null, tx);
            await repo.handleMessageReceived(createMessage(9), null, tx);
            await repo.handleMessageReceived(createMessage(10), null, tx);
            await repo.handleMessageReceived(createMessage(11), null, tx);
        });

        // Mixed order receive
        let received1 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(14), null, tx);
        });
        let received2 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(12), null, tx);
        });
        let received3 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(13), null, tx);
        });
        expect(received1).toMatchObject(createHybridMessage('11', 14));
        expect(received2).toMatchObject(createHybridMessage('12', 12));
        expect(received3).toMatchObject(createHybridMessage('13', 13));

        // Check read after
        let readAfter = await persistence.inTx(async (tx) => {
            return await repo.readAfter({ after: 11 }, tx);
        });
        expect(readAfter.completed).toBe(true);
        expect(readAfter.partial).toBe(false);
        expect(readAfter.items).toMatchObject([
            createHybridMessage('12', 12),
            createHybridMessage('13', 13),
            createHybridMessage('11', 14)
        ]);

        // Check read before
        let readBefore = await persistence.inTx(async (tx) => {
            return await repo.readBefore({ before: 14 }, tx);
        });
        expect(readBefore.completed).toBe(false);
        expect(readBefore.partial).toBe(true);
        expect(readBefore.items).toMatchObject([
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
            createHybridMessage('10', 11),
            createHybridMessage('12', 12),
            createHybridMessage('13', 13)
        ]);

        // Check latest
        let latest = await persistence.inTx(async (tx) => {
            return await repo.readLatest(tx);
        });
        expect(latest.completed).toBe(false);
        expect(latest.partial).toBe(true);
        expect(latest.items).toMatchObject([
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
            createHybridMessage('10', 11),
            createHybridMessage('12', 12),
            createHybridMessage('13', 13),
            createHybridMessage('11', 14)
        ]);
    });

    it('should handle receive in inconsistent order with pending messages', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let repo = HybridRepository.open('1', persistence);

        // Inital messages
        await persistence.inTx(async (tx) => {
            await repo.handleMessageReceived(createMessage(1), null, tx);
            await repo.handleMessageReceived(createMessage(2), null, tx);
            await repo.handleMessageReceived(createMessage(3), null, tx);
            await repo.handleMessageReceived(createMessage(4), null, tx);
            await repo.handleMessageReceived(createMessage(5), null, tx);
            await repo.handleMessageReceived(createMessage(6), null, tx);
            await repo.handleMessageReceived(createMessage(7), null, tx);
            await repo.handleMessageReceived(createMessage(8), null, tx);
            await repo.handleMessageReceived(createMessage(9), null, tx);
            await repo.handleMessageReceived(createMessage(10), null, tx);
            await repo.handleMessageReceived(createMessage(11), null, tx);
        });

        let received1 = await persistence.inTx(async (tx) => {
            return await repo.handlePendingMessageCreated(createPendingMessage('repeat1'), tx);
        });
        let received2 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(13), null, tx);
        });
        let received3 = await persistence.inTx(async (tx) => {
            return await repo.handlePendingMessageCreated(createPendingMessage('repeat2'), tx);
        });
        let received4 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(12), null, tx);
        });
        let received5 = await persistence.inTx(async (tx) => {
            return await repo.handleMessageReceived(createMessage(14), null, tx);
        });
        let received6 = await persistence.inTx(async (tx) => {
            return await repo.handlePendingMessageCreated(createPendingMessage('repeat3'), tx);
        });

        // Check latest
        let latest = await persistence.inTx(async (tx) => {
            return await repo.readLatest(tx);
        });
        expect(latest.completed).toBe(false);
        expect(latest.partial).toBe(true);
        expect(latest.items).toMatchObject([
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
            createHybridMessage('10', 11),
            received4,
            received1,
            received2,
            received3,
            received5,
            received6
        ]);
    });
});