import { PendingMessage } from './../PendingMessage';
import { HybridMessage } from './HybridMessage';
import { WireMessage } from '../WireMessage';
import { MessagesRepository } from './MessagesRepository';
import { Persistence, Transaction } from '../persistence/Persistence';

function convertStoredMessage(key: string, message: WireMessage): HybridMessage {
    return {
        key: key,
        type: 'sent',
        id: message.id,
        seq: message.seq,
        sender: message.sender,
        date: message.date,
        text: message.text,
        fallback: message.fallback,
    };
}

function convertPendingMessage(key: string, message: PendingMessage): HybridMessage {
    return {
        key,
        type: 'pending',
        sender: message.sender,
        date: Date.now(),
        text: message.text,
        fallback: message.fallback
    };
}

/**
 * Repository for persisted and pending messages
 */
export class HybridRepository {
    static open(id: string, persistence: Persistence) {
        let repo = MessagesRepository.open(id, persistence);
        return new HybridRepository(id, persistence, repo);
    }

    readonly id: string;
    readonly persistence: Persistence;
    private readonly repo: MessagesRepository;

    // Keys
    private nextKeyNumber: number = 0;
    private readonly keyToId = new Map<string, string>();
    private readonly idToKey = new Map<string, string>();
    private readonly repeatToKey = new Map<string, string>();
    private readonly keyToRepeat = new Map<string, string>();

    // Cache
    private readonly deletedIds = new Set<string>();
    private readonly cache = new Map<string, HybridMessage>();

    // Latest values
    private readonly latest: string[] = [];
    private readonly latestSet = new Set<string>();

    private constructor(id: string, persistence: Persistence, repo: MessagesRepository) {
        this.id = id;
        this.persistence = persistence;
        this.repo = repo;
    }

    //
    // Read
    //

    readById = async (id: string, tx: Transaction) => {

        // Ignore deleted
        if (this.deletedIds.has(id)) {
            return null;
        }

        // Resolve Key
        let key = this.resolveKey(id);

        // Find in cache
        let cached = this.cache.get(key);
        if (cached) {
            return cached;
        }

        // Read from repo
        let res = await this.repo.readById(id, tx);
        if (res) {
            let hybrid = convertStoredMessage(key, res);
            this.cache.set(key, hybrid);
            return hybrid;
        } else {
            return null;
        }
    }

    readBefore = async (args: { before: number }, tx: Transaction) => {
        let read = await this.repo.readBefore({ before: args.before, limit: 20 }, tx);
        if (!read) {
            return {
                items: [],
                partial: true,
                minSeq: args.before,
                completed: false
            };
        } else {
            let minSeq = args.before;
            let res: HybridMessage[] = [];
            for (let i of read.items) {
                let key = this.resolveKey(i.id);
                let cached = this.cache.get(key);
                minSeq = Math.min(minSeq, i.seq);
                if (cached) {
                    res.push(cached);
                } else {
                    let hybrid = convertStoredMessage(key, i);
                    this.cache.set(key, hybrid);
                    res.push(hybrid);
                }
            }
            return {
                items: res,
                partial: !read.completed && res.length < 20,
                minSeq,
                completed: read.completed
            };
        }
    }

    readAfter = async (args: { after: number }, tx: Transaction) => {
        let read = await this.repo.readAfter({ after: args.after, limit: 20 }, tx);
        if (!read) {
            return {
                items: [],
                partial: true,
                maxSeq: args.after,
                completed: false
            };
        } else {

            let res: HybridMessage[] = [];
            let maxSeq: number = args.after;
            let hasLatest = false;

            // Process all items
            for (let i of read.items) {

                // Update Max Seq
                maxSeq = Math.max(maxSeq, i.seq);

                // Resolve item key
                let key = this.resolveKey(i.id);
                
                // Filter out latest
                if (this.latestSet.has(key)) {
                    hasLatest = true;
                    continue;
                }

                // Handle cache
                let cached = this.cache.get(key);
                if (cached) {
                    res.push(cached);
                } else {
                    let hybrid = convertStoredMessage(key, i);
                    this.cache.set(key, hybrid);
                    res.push(hybrid);
                }
            }

            // Append latest if needed
            if (read.completed || hasLatest) {
                for (let l of this.latest) {
                    let hybrid = this.cache.get(l)!;
                    res.push(hybrid);
                }
            }

            return {
                items: res,
                maxSeq,
                partial: !read.completed && !hasLatest && read.items.length < 20,
                completed: read.completed || hasLatest
            };
        }
    }

    //
    // Write
    //

    writeBatch = async (args: {
        minSeq: number | null,
        maxSeq: number | null,
        messages: WireMessage[]
    }, tx: Transaction) => {

        // Write to repo
        await this.repo.writeBatch(args, tx);

        // NOTE: We are not applying values to the cache since this operation have lowest priority 
        //       and would never overwrite existing values
    }

    //
    // Sequence Updates
    //

    handleMessageReceived = async (message: WireMessage, repeatKey: string | null, tx: Transaction) => {

        // Write to repo
        await this.repo.handleMessageReceived(message, tx);

        // Handle repeat key
        if (repeatKey) {
            let targetKey = this.repeatToKey.get(repeatKey);
            if (targetKey) {

                // What if message already deleted
                if (this.deletedIds.has(message.id)) {

                    // Unregister repeat key
                    this.repeatToKey.delete(repeatKey);
                    this.keyToRepeat.delete(targetKey);

                    return null;
                } else {

                    // Unregister repeat key
                    this.repeatToKey.delete(repeatKey);
                    this.keyToRepeat.delete(targetKey);

                    // Assign id
                    this.keyToId.set(targetKey, message.id);

                    // Put to cache
                    let result = convertStoredMessage(targetKey, message);
                    this.cache.set(targetKey, result);

                    // Clamp latest
                    this.clampLatest();

                    return result;
                }
            }
        }

        // Ignore if already deleted
        if (this.deletedIds.has(message.id)) {
            return;
        }

        // Resolve key
        let key = this.resolveKey(message.id);

        // Convert message put to cache
        let hybrid = convertStoredMessage(key, message);
        this.cache.set(key, hybrid);

        // If we are tracking latest messages: append to latest list
        if (this.latest.length > 0) {
            this.latest.push(key);
            this.latestSet.add(key);
        }

        return hybrid;
    }

    handleMessageUpdated = async (message: WireMessage, tx: Transaction) => {

        // Write to repo
        await this.repo.handleMessageUpdated(message, tx);

        // Ignore deleted
        if (this.deletedIds.has(message.id)) {
            return null;
        }

        // Resovle key
        let key = this.idToKey.get(message.id);

        // Update cache if needed
        if (key) {
            let converted = convertStoredMessage(key, message);
            this.cache.set(key, converted);
            return converted;
        } else {
            // We are returning null since there are no need to propagate update
            // for messages that has not been read (since they are not in cache)
            return null;
        }
    }

    handleMessageDeleted = async (id: string, tx: Transaction) => {

        // Write to repo
        await this.repo.handleMessageDeleted(id, tx);

        // TODO: Handle

        // let key = this.idToKey.get(id);
        // if (key) {
        // }
        // Delete from latest
        // let key = this.lastestIds.get(id);
        // if (key) {
        //     this.lastestIds.delete(key);
        //     this.latestValues.delete(key);
        //     let ex = this.latest.findIndex((v) => v.key === key);
        //     if (ex >= 0) {
        //         this.latest.splice(ex, 1);
        //     }
        //     return key;
        // } else {
        //     return id;
        // }
    }

    //
    // Pending Updates
    //

    handlePendingMessageCanceled = async (key: string, tx: Transaction) => {
        let repeatKey = this.keyToRepeat.get(key);
        if (!repeatKey) {
            // Ignore invalid values
            return;
        }

        // Remove from latest
        this.latestSet.delete(key);
        let index = this.latest.findIndex((v) => v === key);
        if (index >= 0) {
            this.latest.splice(index, 1);
        }
        this.clampLatest();

        // Delete message
        this.cache.delete(key);

        // Unregister repeat key
        this.repeatToKey.delete(repeatKey);
        this.keyToRepeat.delete(key);
    }

    handlePendingMessageCreated = async (message: PendingMessage, tx: Transaction) => {

        // Ignore messages with same repeatKey
        if (this.repeatToKey.has(message.repeatKey)) {
            return;
        }

        // Create message
        let key = this.allocateKey();
        let hybrid = convertPendingMessage(key, message);
        this.cache.set(key, hybrid);

        // Add to latest collection
        this.latest.push(key);
        this.latestSet.add(key);

        // Register repeat key
        this.repeatToKey.set(message.repeatKey, key);
        this.keyToRepeat.set(key, message.repeatKey);

        return hybrid;
    }

    //
    // Utils
    //

    private clampLatest = () => {
        while (this.latest.length > 0) {
            let key = this.latest[0];
            let cached = this.cache.get(key)!;
            if (cached.type === 'pending') {
                break;
            } else {
                this.latest.splice(0, 1);
                this.latestSet.delete(key);
            }
        }
    }

    private resolveKey = (id: string) => {
        let res = this.idToKey.get(id);
        if (res) {
            return res;
        } else {
            res = this.allocateKey();
            this.idToKey.set(id, res);
            this.keyToId.set(res, id);
            return res;
        }
    }

    private allocateKey = () => {
        return (this.nextKeyNumber++) + '';
    }
}