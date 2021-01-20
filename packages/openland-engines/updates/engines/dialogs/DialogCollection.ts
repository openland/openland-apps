import { DialogsEngine } from './../DialogsEngine';
import { UsersEngine } from './../UsersEngine';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';
import { DialogDataSourceItem, DialogDataSourceItemStored } from './../../../messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { SortedArray } from './../counters/utils/SortedArray';
import { defaultQualifier } from './qualifiers';
import { DialogState } from './DialogState';
import { DialogQualifier } from './DialogQualifier';
import { TypingType } from 'openland-api/spacex.types';
import { Transaction } from 'openland-engines/persistence/Persistence';

function convertToLegacy(me: string, src: DialogState, users: UsersEngine): DialogDataSourceItem {
    const isOut = src.topMessage ? src.topMessage.sender.id === me : false;
    const isService = src.topMessage ? src.topMessage.__typename === 'ServiceMessage' : false;
    const sender: string | undefined = isOut ? 'You' : src.topMessage ? users.getUser(src.topMessage.sender.id).firstName : undefined;
    return {
        key: src.key,
        flexibleId: src.key,
        title: src.title,
        photo: src.photo ? src.photo : undefined,
        kind: src.kind === 'private' ? 'PRIVATE' : src.kind === 'group-secret' ? 'GROUP' : 'PUBLIC',
        isPremium: src.premium,
        isChannel: src.channel,
        featured: src.featured,
        isMuted: src.muted,
        hasActiveCall: src.activeCall,

        // Content
        fallback: src.topMessage ? src.topMessage.fallback : '',
        message: src.topMessage ? src.topMessage.message ? src.topMessage.message : undefined : undefined,
        date: src.topMessage ? parseInt(src.topMessage.date, 10) : undefined,
        isOut,
        isService,
        forward: src.topMessage ? src.topMessage.__typename === 'GeneralMessage' && !!src.topMessage.quotedMessages.length && !src.topMessage.message : false,
        sender,
        showSenderName: !!(src.topMessage && (isOut || src.kind !== 'private') && sender) && !isService,

        // Counters
        unread: src.counter,
        haveMention: src.mentions > 0,

        // Compatibility
        membership: 'NONE'
    };
}

const BATCH_SIZE = 20;

export class DialogCollection {
    readonly key: string;
    readonly qualifier: DialogQualifier;
    readonly dialogs: DialogsEngine;

    private index!: { key: string, sortKey: number }[];
    private completed!: boolean;

    source: DataSource<DialogState>;
    private sourceLimit: number = BATCH_SIZE;
    private sourceLoaded = false;
    private sourceLoadingNext = false;

    // Convert legacy
    legacyBase: DataSource<DialogDataSourceItem>;
    typingsAugmentator: DataSourceAugmentor<DialogDataSourceItem, { typing: string, typingType?: TypingType }>;
    onlineAugmentator: DataSourceAugmentor<DialogDataSourceItem & { typing?: string, typingType?: TypingType }, { online: boolean }>;
    legacy: DataSource<DialogDataSourceItemStored>;

    constructor(key: string, qualifier: DialogQualifier, dialogs: DialogsEngine) {
        this.key = key;
        this.qualifier = (src) => defaultQualifier(src) && qualifier(src);
        this.dialogs = dialogs;

        this.source = new DataSource(this._loadNext);
        this.legacyBase = this.source.map((s) => convertToLegacy(dialogs.me, s, dialogs.users));
        this.typingsAugmentator = new DataSourceAugmentor<DialogDataSourceItem, { typing: string, typingType?: TypingType }>(this.legacyBase);
        this.onlineAugmentator = new DataSourceAugmentor<DialogDataSourceItem & { typing?: string, typingType?: TypingType }, { online: boolean }>(this.typingsAugmentator.dataSource);
        this.legacy = this.onlineAugmentator.dataSource;
    }

    async init(tx: Transaction) {
        await this._loadIfNeeded(tx);
    }

    async onDialogAdded(tx: Transaction, src: DialogState) {
        await this._loadIfNeeded(tx);

        if (this.qualifier(src)) {
            await this._doAdd(tx, src);
        }
    }

    async onDialogRemoved(tx: Transaction, src: DialogState) {
        await this._loadIfNeeded(tx);

        if (this.qualifier(src)) {
            await this._doRemove(tx, src);
        }
    }

    async onDialogUpdated(tx: Transaction, old: DialogState, updated: DialogState) {
        await this._loadIfNeeded(tx);

        let oldQualified = this.qualifier(old);
        let updatedQualified = this.qualifier(updated);
        if (oldQualified && updatedQualified) {
            await this._doUpdate(tx, old, updated);
        } else if (!oldQualified && updatedQualified) {
            await this._doAdd(tx, updated);
        } else if (oldQualified && !updatedQualified) {
            await this._doRemove(tx, old);
        }
    }

    async onDialogsLoaded(tx: Transaction) {
        await this._loadIfNeeded(tx);

        if (!this.completed) {
            this.completed = true;
            this.dialogs.dialogCollections.set(tx, this.key, { completed: this.completed, index: this.index });
            await this._handleCompleted(tx);
        }
    }

    //
    // Handler
    //

    private async _loadIfNeeded(tx: Transaction) {
        if (!this.index) {
            let state = await this.dialogs.dialogCollections.get(tx, this.key);
            if (state) {
                this.index = state.index;
                this.completed = state.completed;
            } else {
                this.index = [];
                this.completed = false;
            }
            if (this.completed) {
                await this._handleCompleted(tx);
            }
        }
    }

    private async _handleCompleted(tx: Transaction) {

        // If total number of dialogs is less than batch size
        if (this.index.length < BATCH_SIZE) {
            let data = await this._loadFromPersistence(tx, this.index);
            this.sourceLoaded = true;
            this.sourceLimit = 0;
            this.source.initialize(data, true, true);
        } else {
            let data = await this._loadFromPersistence(tx, this.index.slice(0, BATCH_SIZE));
            this.sourceLoaded = false;
            this.sourceLimit = BATCH_SIZE;
            this.source.initialize(data, false, true);
        }
    }

    private _loadNext = () => {
        if (this.sourceLoaded) {
            return;
        }
        if (this.sourceLoadingNext) {
            return;
        }
        this.sourceLoadingNext = true;
        this.dialogs.persistence.inTx(async (tx) => {
            if (this.index.length < this.sourceLimit + BATCH_SIZE) {
                let data = await this._loadFromPersistence(tx, this.index.slice(this.sourceLimit));
                this.sourceLimit = 0;
                this.sourceLoaded = true;
                this.source.loadedMore(data, true);
            } else {
                let data = await this._loadFromPersistence(tx, this.index.slice(this.sourceLimit, this.sourceLimit + BATCH_SIZE));
                this.sourceLimit += data.length;
                this.source.loadedMore(data, false);
            }
            this.sourceLoadingNext = false;
        });
    }

    private async _doAdd(tx: Transaction, src: DialogState) {
        let srcItm = { key: src.key, sortKey: src.sortKey! };
        let addAt = SortedArray.dialogsIndex.addIndex(this.index, srcItm);
        this.index = SortedArray.dialogsIndex.add(this.index, srcItm);
        this._flushState(tx);

        // If added in active window
        if (this.completed && (this.sourceLoaded || addAt < this.sourceLimit)) {
            this.source.addItem(src, addAt);
            if (!this.sourceLoaded) {
                this.sourceLimit++;
            }
        }
    }

    private async  _doRemove(tx: Transaction, src: DialogState) {
        let itm = { key: src.key, sortKey: src.sortKey! };
        let oldIndex = SortedArray.dialogsIndex.find(this.index, itm);
        this.index = SortedArray.dialogsIndex.remove(this.index, itm);
        this._flushState(tx);

        // If removed from active window
        if (this.completed && (this.sourceLoaded || oldIndex < this.sourceLimit)) {
            this.source.removeItem(src.key);
            if (!this.sourceLoaded) {
                this.sourceLimit--;
            }
        }
    }

    private async _doUpdate(tx: Transaction, old: DialogState, updated: DialogState) {
        let oldItem = { key: old.key, sortKey: old.sortKey! };
        let updatedItem = { key: updated.key, sortKey: updated.sortKey! };
        let oldIndex = SortedArray.dialogsIndex.find(this.index, oldItem);
        this.index = SortedArray.dialogsIndex.add(SortedArray.dialogsIndex.remove(this.index, oldItem), updatedItem);
        let toIndex = SortedArray.dialogsIndex.find(this.index, updatedItem);
        this._flushState(tx);

        // Update source
        if (this.completed) {
            // Update and move
            if (this.sourceLoaded || (oldIndex < this.sourceLimit && toIndex < this.sourceLimit)) {
                this.source.updateItem(updated);
                if (oldIndex !== toIndex) {
                    this.source.moveItem(old.key, toIndex);
                }
            } else if (oldIndex < this.sourceLimit) {
                this.source.removeItem(updated.key);
                this.sourceLimit--;
            } else if (toIndex < this.sourceLimit) {
                this.source.addItem(updated, toIndex);
                this.sourceLimit++;
            }
        }
    }

    private _flushState(tx: Transaction) {
        this.dialogs.dialogCollections.set(tx, this.key, { completed: this.completed, index: this.index });
    }

    private async _loadFromPersistence(tx: Transaction, src: { key: string; sortKey: number; }[]) {
        let res = await Promise.all(src.map((k) => this.dialogs.dialogs.getOrFail(tx, k.key)));
        for (let r of res) {
            if (r.topMessage) {
                await this.dialogs.users.getUserAsync(tx, r.topMessage.sender.id);
            }
        }
        return res;
    }
}