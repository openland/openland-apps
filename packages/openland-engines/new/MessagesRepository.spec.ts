import { SparseIndex } from './SparseIndex';
import { StoredMessage } from './StoredMessage';
import { PersistenceProviderInMemory } from './PersistenceProviderInMemory';
import { MessagesRepository } from './MessagesRepository';
import { Persistence } from './Persistence';

function createMessage(seq: number): StoredMessage {
    return {
        id: '' + seq,
        seq,
        sender: 'user_id'
    };
}

describe('MessagesRepository', () => {
    it('should write and read batches', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messagesStore = MessagesRepository.open('1', persistence);

        // Write Simple Batch
        persistence.startTransaction();
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
        });
        await persistence.commitTransaction();

        // Reload store
        messagesStore = MessagesRepository.open('1', persistence);

        // Check read after
        let read = await messagesStore.readAfter({ after: 15, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(16),
                createMessage(17),
                createMessage(18)
            ],
            completed: false
        });

        // Check continuity of read after
        read = await messagesStore.readAfter({ after: 18, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(19),
                createMessage(20)
            ],
            completed: false
        });

        // Check read before
        read = await messagesStore.readBefore({ before: 15, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(12),
                createMessage(13),
                createMessage(14),
            ],
            completed: false
        });

        // Check continuity of read before
        read = await messagesStore.readBefore({ before: 12, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(10),
                createMessage(11),
            ],
            completed: false
        });

        // Check read from end
        read = await messagesStore.readBefore({ before: SparseIndex.MAX, limit: 3 });
        expect(read).toBeNull();

        // Check read from begining
        read = await messagesStore.readAfter({ after: SparseIndex.MIN, limit: 3 });
        expect(read).toBeNull();
    });

    it('should handle appends', async () => {
        let persistenceProvider = new PersistenceProviderInMemory();
        let persistence = new Persistence(persistenceProvider);
        let messagesStore = MessagesRepository.open('1', persistence);

        // Write data
        persistence.startTransaction();
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
        });
        await messagesStore.writeBatch({
            minSeq: 20,
            maxSeq: null,
            messages: []
        });
        await persistence.commitTransaction();

        // Reload store
        messagesStore = MessagesRepository.open('1', persistence);

        // Check read after
        let read = await messagesStore.readAfter({ after: 15, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(16),
                createMessage(17),
                createMessage(18)
            ],
            completed: false
        });

        // Check continuity of read after
        read = await messagesStore.readAfter({ after: 18, limit: 3 });
        expect(read).toMatchObject({
            items: [
                createMessage(19),
                createMessage(20)
            ],
            completed: true
        });

        // Append
        persistence.startTransaction();
        await messagesStore.handleMessageReceived(createMessage(21));
        await persistence.commitTransaction();

        read = await messagesStore.readAfter({ after: 18, limit: 3 });
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