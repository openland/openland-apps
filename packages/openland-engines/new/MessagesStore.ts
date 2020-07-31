import { backoff } from 'openland-y-utils/timer';
import { LockMap } from './utils/LockMap';
import { HybridMessage } from './storage/HybridMessage';
import { HybridRepository } from './storage/HybridRepository';
import { MessageViewSnapshot } from './MessageViewSnapshot';
import { MessageView } from './MessageView';
import { WireMessage, extractUsers } from './WireMessage';
import { randomKey } from 'openland-y-utils/randomKey';
import { MessagesApi } from './MessagesApi';
import { Persistence, Transaction } from './persistence/Persistence';
import { MessageUser, Message } from './Message';

function extractUsersFromHybrid(message: HybridMessage, to: Set<string>) {
    to.add(message.sender);
}

export class MessagesStore {

    static open(id: string, persistence: Persistence, api: MessagesApi) {
        let repo = HybridRepository.open(id, persistence);
        return new MessagesStore(repo, persistence, api);
    }

    readonly persistence: Persistence;
    readonly api: MessagesApi;
    private readonly repo: HybridRepository;
    private readonly views = new Map<string, MessageView>();
    private readonly users = new Map<string, MessageUser>();
    private readonly messages = new Map<string, Message>();
    private readonly usersLock = new LockMap<string>();

    // Latest Index
    private access: undefined | boolean = undefined;

    private constructor(repo: HybridRepository, persistence: Persistence, api: MessagesApi) {
        this.repo = repo;
        this.persistence = persistence;
        this.api = api;
    }

    //
    // Views
    //

    createSnapshotViewAt = (id: string): MessageViewSnapshot => {
        // Create View
        let viewId = randomKey();
        let view = new MessageViewSnapshot(this, { type: 'message', id }, () => {
            this.views.delete(viewId);
        });
        this.views.set(viewId, view);

        // Initialize access
        if (this.access === true) {
            view.onMessagesGotAccess();
        } else if (this.access === false) {
            view.onMessagesLostAccess();
        }

        return view;
    }

    createSnapshotViewAtLatest = (): MessageViewSnapshot => {
        // Create View
        let viewId = randomKey();
        let view = new MessageViewSnapshot(this, { type: 'latest' }, () => {
            this.views.delete(viewId);
        });
        this.views.set(viewId, view);

        // Initialize access
        if (this.access === true) {
            view.onMessagesGotAccess();
        } else if (this.access === false) {
            view.onMessagesLostAccess();
        }

        return view;
    }

    //
    // Operations
    //

    loadFromLatest = (handler: (args: { messages: Message[], hasBefore: boolean }) => void) => {
        let canceled = false;
        backoff(async () => {
            while (!canceled) {
                let res = await this.persistence.inTx(async (tx) => {

                    // Read messages
                    let latest = await this.repo.readLatest(tx);

                    if (canceled) {
                        return { type: 'ok' };
                    }

                    // No messages available
                    if (latest.items.length === 0 && !latest.completed) {
                        return { type: 'no-data' };
                    }

                    // Collect required users
                    let users = new Set<string>();
                    for (let i of latest.items) {
                        extractUsersFromHybrid(i, users);
                    }
                    let missing = new Set<string>();
                    for (let u of users) {
                        if (!this.users.has(u)) {
                            missing.add(u);
                        }
                    }
                    if (missing.size > 0) {
                        return { type: 'missing', missing };
                    }

                    // Convert and call handler
                    let converted: Message[] = [];
                    for (let i of latest.items) {
                        converted.push(this.loadHybrid(i));
                    }
                    // NOTE: Order is important
                    if (!canceled) {
                        canceled = true;
                        handler({ messages: converted, hasBefore: !latest.completed });
                    }

                    return { type: 'ok' };
                });

                // Load Users
                if (res.type === 'missing') {
                    for (let u of res.missing!) {
                        if (canceled) {
                            return;
                        }
                        await this.loadUserIfNeeded(u);
                    }
                    continue;
                }

                // Load latest message
                if (res.type === 'no-data') {
                    let lastMessage = await this.api.loadLastMessage(this.repo.id);
                    if (canceled) {
                        return;
                    }
                    if (lastMessage === null) {
                        await this.persistence.inTx(async (tx) => {
                            await this.repo.writeBatch({ minSeq: Number.MIN_SAFE_INTEGER, maxSeq: Number.MAX_SAFE_INTEGER, messages: [] }, tx);
                        });
                    } else {

                        // Load required users
                        await this.loadUsersFromMessagesIfNeeded([lastMessage]);

                        if (canceled) {
                            return;
                        }

                        // Write message to repo
                        await this.persistence.inTx(async (tx) => {
                            await this.repo.writeBatch({ minSeq: lastMessage!.seq, maxSeq: Number.MAX_SAFE_INTEGER, messages: [lastMessage!] }, tx);
                        });
                    }
                    continue;
                }

                // Completed
                if (res.type === 'ok') {
                    return;
                }
            }
        });
        return () => {
            canceled = true;
        };
    }

    loadFromMessage = (id: string, handler: (args: { messages: Message[], hasBefore: boolean, hasAfter: boolean } | null) => void) => {
        let canceled = false;
        backoff(async () => {
            while (!canceled) {
                let res = await this.persistence.inTx(async (tx) => {
                    let message = await this.repo.readById(id, tx);

                    console.log(message);

                    // If message deleted
                    if (message === null) {
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return { type: 'ok' };
                    }
                    if (message === undefined) {
                        return { type: 'need-message' };
                    }
                    if (message.type !== 'sent') {
                        throw Error('Internal error');
                    }

                    // Read before
                    let before = await this.repo.readBefore({ before: message.seq }, tx);
                    if (canceled) {
                        return { type: 'ok' };
                    }
                    if (before.partial) {
                        let seq = message.seq;
                        let destId = message.id;
                        for (let i of before.items) {
                            if (i.type === 'sent') {
                                if (i.seq < seq) {
                                    seq = i.seq;
                                    destId = i.id;
                                }
                            }
                        }
                        return { type: 'need-before', seq, id: destId };
                    }

                    // Read after
                    let after = await this.repo.readAfter({ after: message.seq }, tx);
                    if (canceled) {
                        return { type: 'ok' };
                    }
                    if (after.partial) {
                        let seq = message.seq;
                        let destId = message.id;
                        for (let i of after.items) {
                            if (i.type === 'sent') {
                                if (i.seq > seq) {
                                    seq = i.seq;
                                    destId = i.id;
                                }
                            }
                        }
                        return { type: 'need-after', seq, id: destId };
                    }

                    // Collect required users
                    let users = new Set<string>();
                    extractUsersFromHybrid(message, users);
                    for (let i of before.items) {
                        extractUsersFromHybrid(i, users);
                    }
                    for (let i of after.items) {
                        extractUsersFromHybrid(i, users);
                    }
                    let missing = new Set<string>();
                    for (let u of users) {
                        if (!this.users.has(u)) {
                            missing.add(u);
                        }
                    }
                    if (missing.size > 0) {
                        return { type: 'missing', missing };
                    }

                    // Convert and call handler
                    let converted: Message[] = [];
                    for (let i of before.items) {
                        converted.push(this.loadHybrid(i));
                    }
                    converted.push(this.loadHybrid(message));
                    for (let i of after.items) {
                        converted.push(this.loadHybrid(i));
                    }

                    // NOTE: Order is important
                    if (!canceled) {
                        canceled = true;
                        handler({ messages: converted, hasBefore: !before.completed, hasAfter: !after.completed });
                    }

                    return { type: 'ok' };
                });
                if (canceled) {
                    return;
                }

                if (res.type === 'ok') {
                    return;
                }
                if (res.type === 'need-message') {
                    let msg = await this.api.loadMessage(id);
                    if (canceled) {
                        return;
                    }
                    if (!msg) {
                        // No message
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return;
                    } else {

                        // Load required users
                        await this.loadUsersFromMessagesIfNeeded([msg]);

                        if (canceled) {
                            return;
                        }

                        // Write message to repo
                        await this.persistence.inTx(async (tx) => {
                            await this.repo.writeBatch({ minSeq: msg!.seq, maxSeq: msg!.seq, messages: [msg!] }, tx);
                        });
                    }
                    continue;
                }
                if (res.type === 'need-after') {
                    let loaded = await this.api.loadMessagesAfter(this.repo.id, res.id!, 20);
                    if (canceled) {
                        return;
                    }

                    // No access
                    if (!loaded) {
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);

                    if (canceled) {
                        return;
                    }

                    // Resolve seq
                    let batchMaxSeq = res.seq!;
                    if (!loaded.hasMore) {
                        batchMaxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMaxSeq = Math.max(m.seq, batchMaxSeq);
                        }
                    }

                    // Note: minSeq is the seq of the message that we are using as cursor not the min seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: res.seq!, maxSeq: batchMaxSeq, messages: loaded!.messages }, tx);
                    });
                    continue;
                }
                if (res.type === 'need-before') {
                    let loaded = await this.api.loadMessagesBefore(this.repo.id, res.id!, 20);
                    // No access
                    if (!loaded) {
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);
                    if (canceled) {
                        return;
                    }

                    // Resolve seq
                    let batchMinSeq = res.seq!;
                    if (!loaded.hasMore) {
                        batchMinSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMinSeq = Math.min(m.seq, batchMinSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: batchMinSeq, maxSeq: res.seq!, messages: loaded!.messages }, tx);
                    });
                    continue;
                }

                // Load Users
                if (res.type === 'missing') {
                    for (let u of res.missing!) {
                        if (canceled) {
                            return;
                        }
                        await this.loadUserIfNeeded(u);
                    }
                    continue;
                }
            }
        });
        return () => {
            canceled = true;
        };
    }

    loadBefore = (cursor: { id: string, seq: number } | null, handler: (args: { messages: Message[], hasBefore: boolean } | null) => void) => {
        let canceled = false;

        backoff(async () => {
            while (!canceled) {
                // Resolve previous
                let res = await this.persistence.inTx(async (tx) => {
                    let before = await this.repo.readBefore({ before: cursor ? cursor.seq : null }, tx);
                    if (canceled) {
                        return { type: 'ok' };
                    }

                    if (before.partial) {
                        let dSeq: number | null = null;
                        let dId: string | null = null;
                        if (before.cursor) {
                            dSeq = before.cursor.seq;
                            dId = before.cursor.id;
                        } else if (cursor) {
                            dSeq = cursor.seq;
                            dId = cursor.id;
                        }

                        for (let i of before.items) {
                            if (i.type === 'sent') {
                                if (dSeq === null || i.seq < dSeq) {
                                    dSeq = i.seq;
                                    dId = i.id;
                                }
                            }
                        }
                        return { type: 'need-before', seq: dSeq, id: dId };
                    }

                    // Collect required users
                    let users = new Set<string>();
                    for (let i of before.items) {
                        extractUsersFromHybrid(i, users);
                    }
                    let missing = new Set<string>();
                    for (let u of users) {
                        if (!this.users.has(u)) {
                            missing.add(u);
                        }
                    }
                    if (missing.size > 0) {
                        return { type: 'missing', missing };
                    }

                    // Convert and call handler
                    let converted: Message[] = [];
                    for (let i of before.items) {
                        converted.push(this.loadHybrid(i));
                    }
                    // NOTE: Order is important
                    if (!canceled) {
                        canceled = true;
                        handler({ messages: converted, hasBefore: !before.completed });
                    }

                    return { type: 'ok' };
                });

                if (canceled) {
                    return;
                }

                if (res.type === 'ok') {
                    return;
                }

                if (res.type === 'need-before') {
                    let loaded = await this.api.loadMessagesBefore(this.repo.id, res.id!, 20);
                    // No access
                    if (!loaded) {
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);
                    if (canceled) {
                        return;
                    }

                    // Resolve seq
                    let batchMinSeq = res.seq!;
                    if (!loaded.hasMore) {
                        batchMinSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMinSeq = Math.min(m.seq, batchMinSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: batchMinSeq, maxSeq: res.seq!, messages: loaded!.messages }, tx);
                    });
                    continue;
                }

                // Load Users
                if (res.type === 'missing') {
                    for (let u of res.missing!) {
                        if (canceled) {
                            return;
                        }
                        await this.loadUserIfNeeded(u);
                    }
                    continue;
                }
            }
        });

        return () => {
            canceled = true;
        };
    }

    loadAfter = (cursor: { id: string, seq: number }, handler: (args: { messages: Message[], hasAfter: boolean } | null) => void) => {
        let canceled = false;

        backoff(async () => {
            while (!canceled) {
                let res = await this.persistence.inTx(async (tx) => {
                    // Read after
                    let after = await this.repo.readAfter({ after: cursor.seq }, tx);
                    if (canceled) {
                        return { type: 'ok' };
                    }
                    if (after.partial) {
                        let seq = cursor.seq;
                        let destId = cursor.id;
                        for (let i of after.items) {
                            if (i.type === 'sent') {
                                if (i.seq < seq) {
                                    seq = i.seq;
                                    destId = i.id;
                                }
                            }
                        }
                        return { type: 'need-after', seq, id: destId };
                    }

                     // Collect required users
                     let users = new Set<string>();
                     for (let i of after.items) {
                         extractUsersFromHybrid(i, users);
                     }
                     let missing = new Set<string>();
                     for (let u of users) {
                         if (!this.users.has(u)) {
                             missing.add(u);
                         }
                     }
                     if (missing.size > 0) {
                         return { type: 'missing', missing };
                     }
 
                     // Convert and call handler
                     let converted: Message[] = [];
                     for (let i of after.items) {
                         converted.push(this.loadHybrid(i));
                     }
                     // NOTE: Order is important
                     if (!canceled) {
                         canceled = true;
                         handler({ messages: converted, hasAfter: !after.completed });
                     }
 
                     return { type: 'ok' };
                });
                
                if (canceled) {
                    return;
                }

                if (res.type === 'ok') {
                    return;
                }

                if (res.type === 'need-after') {
                    let loaded = await this.api.loadMessagesAfter(this.repo.id, res.id!, 20);

                    // No access
                    if (!loaded) {
                        // NOTE: Order is important
                        if (!canceled) {
                            canceled = true;
                            handler(null);
                        }
                        return;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);
                    if (canceled) {
                        return;
                    }

                    // Resolve seq
                    let batchMaxSeq = res.seq!;
                    if (!loaded.hasMore) {
                        batchMaxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMaxSeq = Math.max(m.seq, batchMaxSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: res.seq!, maxSeq: batchMaxSeq, messages: loaded!.messages }, tx);
                    });
                    continue;
                }

                // Load Users
                if (res.type === 'missing') {
                    for (let u of res.missing!) {
                        if (canceled) {
                            return;
                        }
                        await this.loadUserIfNeeded(u);
                    }
                    continue;
                }
            }
        });

        return () => {
            canceled = true;
        };
    }

    //
    // Handle Updates
    //

    onMessagesLostAccess = async (tx: Transaction) => {
        if (this.access !== false) {
            this.access = false;
            tx.afterTransaction(() => {
                for (let v of this.views) {
                    v[1].onMessagesLostAccess();
                }
            });
        }
    }

    onMessagesGotAccess = async (tx: Transaction) => {
        if (this.access !== true) {
            this.access = true;
            tx.afterTransaction(() => {
                for (let v of this.views) {
                    v[1].onMessagesGotAccess();
                }
            });
        }
    }

    onMessagesReceived = async (messages: { repeatKey: string | null, message: WireMessage }[], tx: Transaction) => {
        // Load required users if missing in cache
        await this.loadUsersFromMessagesIfNeeded(messages.map((v) => v.message));

        // Apply updates
        let received: Message[] = [];
        for (let m of messages) {
            let r = await this.repo.handleMessageReceived(m.message, m.repeatKey, tx);
            if (r) {
                let conv = this.convertHybrid(r);
                this.messages.set(conv.key, conv);
                received.push(conv);
            }
        }

        // Notify views
        if (received.length > 0) {
            tx.afterTransaction(() => {
                for (let v of this.views) {
                    v[1].onMessagesReceived(received);
                }
            });
        }
    }

    onMessagesUpdated = async (messages: WireMessage[], tx: Transaction) => {

        // Load required users if missing in cache
        await this.loadUsersFromMessagesIfNeeded(messages);

        // Apply updates
        let updated: Message[] = [];
        for (let m of messages) {
            let u = await this.repo.handleMessageUpdated(m, tx);
            if (u !== null) {
                let converted = this.convertHybrid(u);
                this.messages.set(converted.key, converted);
                updated.push(converted);
            }
        }

        // Notify views
        tx.afterTransaction(() => {
            for (let v of this.views) {
                v[1].onMessagesUpdated(updated);
            }
        });
    }

    onMessagesDeleted = async (messages: string[], tx: Transaction) => {
        let deleted: string[] = [];
        for (let m of messages) {
            let key = await this.repo.handleMessageDeleted(m, tx);
            if (key !== null) {
                deleted.push(key);
            }
        }
        if (deleted.length > 0) {
            tx.afterTransaction(() => {
                for (let v of this.views) {
                    v[1].onMessagesDeleted(deleted);
                }
            });
        }
    }

    //
    // Utils
    //

    private loadHybrid(src: HybridMessage): Message {
        if (this.messages.has(src.key)) {
            return this.messages.get(src.key)!;
        } else {
            let conv = this.convertHybrid(src);
            this.messages.set(src.key, conv);
            return conv;
        }
    }

    private convertHybrid(src: HybridMessage): Message {
        return {
            // Header
            key: src.key,
            sender: this.users.get(src.sender)!,
            date: src.date,

            // Content
            fallback: src.fallback,
            text: src.text,

            // State
            ...(src.type === 'pending' ? { state: 'sending' } : { state: 'sent', id: src.id, seq: src.seq })
        };
    }

    //
    // Users
    //

    private loadUsersFromMessagesIfNeeded = async (messages: WireMessage[]) => {
        let users = new Set<string>();
        for (let m of messages) {
            extractUsers(m, users);
        }
        for (let u of users) {
            await this.loadUserIfNeeded(u);
        }
    }

    private loadUserIfNeeded = async (id: string) => {
        if (this.users.has(id)) {
            return;
        }
        await this.usersLock.inLock(id, async () => {
            if (this.users.has(id)) {
                return;
            }
            let user = await this.api.loadUser(id);
            if (this.users.has(id)) {
                return;
            }
            this.users.set(id, user);
        });
    }
}