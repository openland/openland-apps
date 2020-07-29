import { SparseIndex } from './SparseIndex';
import { WireMessage } from '../WireMessage';
import { PersistenceProviderInMemory } from '../persistence/PersistenceProviderInMemory';
import { MessagesRepository } from './MessagesRepository';
import { Persistence } from '../persistence/Persistence';

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

describe('MessagesRepository', () => {
    it('should write and read batches', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messagesStore = MessagesRepository.open('1', persistence);

        // Write Simple Batch
        await persistence.inTx(async (tx) => {
            await messagesStore.writeBatch({
                minSeq: 10,
                maxSeq: 20,
                messages: [
                    createMessage(10),
                    createMessage(11),
                    createMessage(12),
                    createMessage(13),
                    createMessage(14),
                    createMessage(15),
                    createMessage(16),
                    createMessage(17),
                    createMessage(18),
                    createMessage(19),
                    createMessage(20)
                ]
            }, tx);
        });

        // Reload store
        messagesStore = MessagesRepository.open('1', persistence);

        // Check read after
        let read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: 15, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(16),
                createMessage(17),
                createMessage(18)
            ],
            completed: false
        });

        // Check continuity of read after
        read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: 18, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(19),
                createMessage(20)
            ],
            completed: false
        });

        // Check read before
        read = await persistence.inTx(async (tx) => await messagesStore.readBefore({ before: 15, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(12),
                createMessage(13),
                createMessage(14),
            ],
            completed: false
        });

        // Check continuity of read before
        read = await persistence.inTx(async (tx) => await messagesStore.readBefore({ before: 12, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(10),
                createMessage(11),
            ],
            completed: false
        });

        // Check read from end
        read = await persistence.inTx(async (tx) => await messagesStore.readBefore({ before: SparseIndex.MAX, limit: 3 }, tx));
        expect(read).toBeNull();

        // Check read from begining
        read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: SparseIndex.MIN, limit: 3 }, tx));
        expect(read).toBeNull();
    });

    it('should handle appends', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messagesStore = MessagesRepository.open('1', persistence);

        // Write data

        persistence.inTx(async (tx) => {
            await messagesStore.writeBatch({
                minSeq: 10,
                maxSeq: 20,
                messages: [
                    createMessage(10),
                    createMessage(11),
                    createMessage(12),
                    createMessage(13),
                    createMessage(14),
                    createMessage(15),
                    createMessage(16),
                    createMessage(17),
                    createMessage(18),
                    createMessage(19),
                    createMessage(20)
                ]
            }, tx);
            await messagesStore.writeBatch({
                minSeq: 20,
                maxSeq: null,
                messages: []
            }, tx);
        });

        // Reload store
        messagesStore = MessagesRepository.open('1', persistence);

        // Check read after
        let read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: 15, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(16),
                createMessage(17),
                createMessage(18)
            ],
            completed: false
        });

        // Check continuity of read after
        read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: 18, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(19),
                createMessage(20)
            ],
            completed: true
        });

        // Append
        await persistence.inTx(async (tx) => {
            await messagesStore.handleMessageReceived(createMessage(21), tx);
        });

        read = await persistence.inTx(async (tx) => await messagesStore.readAfter({ after: 18, limit: 3 }, tx));
        expect(read).toMatchObject({
            items: [
                createMessage(19),
                createMessage(20),
                createMessage(21)
            ],
            completed: true
        });
    });
});