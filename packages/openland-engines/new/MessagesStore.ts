import { SparseIndex } from './storage/SparseIndex';
import { backoff } from 'openland-y-utils/timer';
import { MessageViewSnapshot } from './MessageViewSnapshot';
import { MessageView } from './MessageView';
import { WireMessage, extractUsers } from './WireMessage';
import { randomKey } from 'openland-y-utils/randomKey';
import { MessagesApi } from './MessagesApi';
import { Persistence, Transaction } from './persistence/Persistence';
import { MessagesRepository } from './storage/MessagesRepository';
import { MessageUser } from './Message';

export class MessagesStore {

    static open(id: string, persistence: Persistence, api: MessagesApi) {
        let repo = MessagesRepository.open(id, persistence);
        return new MessagesStore(repo, persistence, api);
    }

    readonly persistence: Persistence;
    readonly api: MessagesApi;
    private readonly repo: MessagesRepository;
    private readonly views = new Map<string, MessageView>();
    private readonly users = new Map<string, MessageUser>();
    
    // Latest Index
    private readonly latestIndex = new SparseIndex({ windows: [] });
    private latestIndexSeq = 0;

    private access: undefined | boolean = undefined;

    private constructor(repo: MessagesRepository, persistence: Persistence, api: MessagesApi) {
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

    loadCachedLatest = async (tx: Transaction) => {
        let latest = await this.repo.readBefore({ before: Number.MAX_SAFE_INTEGER, limit: 1 }, tx);
        if (!latest) {
            return undefined;
        }
        if (latest.items.length === 0) {
            return null;
        } else {
            return latest.items[0];
        }
    }

    loadLatest = async () => {
        return await backoff(async () => {
            while (true) {
                let message = await this.persistence.inTx(async (tx) => await this.loadCachedLatest(tx));
                if (message !== undefined) {
                    return message;
                }

                // Load latest
                let lastMessage = await this.api.loadLastMessage(this.repo.id);
                if (lastMessage === null) {
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: Number.MIN_SAFE_INTEGER, maxSeq: Number.MAX_SAFE_INTEGER, messages: [] }, tx);
                    });
                } else {
                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded([lastMessage]);

                    // Write message to repo
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: lastMessage!.seq, maxSeq: Number.MAX_SAFE_INTEGER, messages: [lastMessage!] }, tx);
                    });
                }
            }
        });
    }

    loadCachedMessage = async (id: string, tx: Transaction) => {
        return await this.repo.readById(id, tx);
    }

    loadMessage = async (id: string) => {
        return await backoff(async () => {
            while (true) {
                let message = await this.persistence.inTx(async (tx) => await this.repo.readById(id, tx));
                if (message) {
                    return message;
                }

                let msg = await this.api.loadMessage(id);
                if (!msg) {
                    return null;
                } else {

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded([msg]);

                    // Write message to repo
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: msg!.seq, maxSeq: msg!.seq, messages: [msg!] }, tx);
                    });
                }
            }
        });
    }

    loadCachedBefore = async (seq: number, tx: Transaction) => {
        return await this.repo.readBefore({ before: seq, limit: 20 }, tx);
    }

    loadBefore = async (id: string) => {
        let message = (await this.loadMessage(id))!;
        if (!message) {
            return null;
        }
        return await backoff(async () => {
            while (true) {
                // Resolve previous
                let before = await this.persistence.inTx(async (tx) => await this.repo.readBefore({ before: message.seq, limit: 20 }, tx));

                // If previous not loaded
                if (!before || (before.items.length < 20 && !before.completed)) {
                    let loaded = await this.api.loadMessagesBefore(this.repo.id, message.id, 20);
                    if (!loaded) {
                        return null;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);

                    // Resolve seq
                    let batchMinSeq = message.seq;
                    if (!loaded.hasMore) {
                        batchMinSeq = Number.MIN_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMinSeq = Math.min(m.seq, batchMinSeq);
                        }
                    }

                    // Note: maxSeq is the seq of the message that we are using as cursor not the max seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: batchMinSeq, maxSeq: message!.seq, messages: loaded!.messages }, tx);
                    });
                    continue;
                }

                return before;
            }
        });
    }

    loadCachedAfter = async (seq: number, tx: Transaction) => {
        return await this.repo.readAfter({ after: seq, limit: 20 }, tx);
    }

    loadAfter = async (id: string) => {
        let message = (await this.loadMessage(id))!;
        if (!message) {
            return null;
        }
        return await backoff(async () => {
            while (true) {
                // Resolve after
                let after = await this.persistence.inTx(async (tx) => await this.repo.readAfter({ after: message.seq, limit: 20 }, tx));

                // If previous not loaded
                if (!after || (after.items.length < 20 && !after.completed)) {
                    let loaded = await this.api.loadMessagesAfter(this.repo.id, message.id, 20);
                    if (!loaded) {
                        return null;
                    }

                    // Load required users
                    await this.loadUsersFromMessagesIfNeeded(loaded.messages);

                    // Resolve seq
                    let batchMaxSeq = message.seq;
                    if (!loaded.hasMore) {
                        batchMaxSeq = Number.MAX_SAFE_INTEGER;
                    } else {
                        for (let m of loaded.messages) {
                            batchMaxSeq = Math.max(m.seq, batchMaxSeq);
                        }
                    }

                    // Note: minSeq is the seq of the message that we are using as cursor not the min seq of batch
                    await this.persistence.inTx(async (tx) => {
                        await this.repo.writeBatch({ minSeq: message!.seq, maxSeq: batchMaxSeq, messages: loaded!.messages }, tx);
                    });
                    continue;
                }
                return after;
            }
        });
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
        for (let m of messages) {
            await this.repo.handleMessageReceived(m.message, tx);
        }

        // Notify views
        tx.afterTransaction(() => {
            for (let v of this.views) {
                v[1].onMessagesReceived(messages);
            }
        });
    }

    onMessagesUpdated = async (messages: WireMessage[], tx: Transaction) => {

        // Load required users if missing in cache
        await this.loadUsersFromMessagesIfNeeded(messages);

        // Apply updates
        for (let m of messages) {
            await this.repo.handleMessageUpdated(m, tx);
        }

        // Notify views
        tx.afterTransaction(() => {
            for (let v of this.views) {
                v[1].onMessagesUpdated(messages);
            }
        });
    }

    onMessagesDeleted = async (messages: string[], tx: Transaction) => {
        for (let m of messages) {
            await this.repo.handleMessageDeleted(m, tx);
        }
        tx.afterTransaction(() => {
            for (let v of this.views) {
                v[1].onMessagesDeleted(messages);
            }
        });
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
        let user = await this.api.loadUser(id);
        if (this.users.has(id)) {
            return;
        }
        this.users.set(id, user);
    }
}