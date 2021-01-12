import { UsersEngine } from './../UsersEngine';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';
import { DialogDataSourceItem, DialogDataSourceItemStored } from './../../../messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { SortedArray } from './../counters/utils/SortedArray';
import { defaultQualifier } from './qualifiers';
import { DialogState } from './DialogState';
import { DialogQualifier } from './DialogQualifier';
import { TypingType } from 'openland-api/spacex.types';

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

export class DialogCollection {
    readonly qualifier: DialogQualifier;

    state: DialogState[] = [];
    source: DataSource<DialogState> = new DataSource(() => {/* Nothing to do */ });
    legacyConverted: DataSource<DialogDataSourceItem>;
    typingsAugmentator: DataSourceAugmentor<DialogDataSourceItem, { typing: string, typingType?: TypingType }>;
    onlineAugmentator: DataSourceAugmentor<DialogDataSourceItem & { typing?: string, typingType?: TypingType }, { online: boolean }>;
    legacy: DataSource<DialogDataSourceItemStored>;

    private inited = false;

    constructor(me: string, qualifier: DialogQualifier, users: UsersEngine) {
        this.qualifier = (src) => defaultQualifier(src) && qualifier(src);
        this.legacyConverted = this.source.map((s) => convertToLegacy(me, s, users));
        this.typingsAugmentator = new DataSourceAugmentor<DialogDataSourceItem, { typing: string, typingType?: TypingType }>(this.legacyConverted);
        this.onlineAugmentator = new DataSourceAugmentor<DialogDataSourceItem & { typing?: string, typingType?: TypingType }, { online: boolean }>(this.typingsAugmentator.dataSource);
        this.legacy = this.onlineAugmentator.dataSource;
    }

    onDialogAdded(src: DialogState) {
        if (this.qualifier(src)) {
            this._doAdd(src);
        }
    }

    onDialogRemoved(src: DialogState) {
        if (this.qualifier(src)) {
            this._doRemove(src);
        }
    }

    onDialogUpdated(old: DialogState, updated: DialogState) {
        let oldQualified = this.qualifier(old);
        let updatedQualified = this.qualifier(updated);
        if (oldQualified && updatedQualified) {
            this._doUpdate(old, updated);
        } else if (!oldQualified && updatedQualified) {
            this._doAdd(updated);
        } else if (oldQualified && !updatedQualified) {
            this._doRemove(old);
        }
    }

    onDialogsLoaded() {
        this.inited = true;
        this.source.initialize(this.state, true, true);
    }

    //
    // Handler
    //

    private _doAdd(src: DialogState) {
        let index = SortedArray.dialogs.addIndex(this.state, src);

        // Update state and source
        if (this.inited) {
            this.source.addItem(src, index);
        }
        this.state = SortedArray.dialogs.add(this.state, src);
    }

    private _doRemove(src: DialogState) {
        let index = SortedArray.dialogs.find(this.state, src);

        // Update state and source
        if (this.inited) {
            this.source.removeItem(this.state[index].key);
        }
        this.state = SortedArray.dialogs.remove(this.state, src);
    }

    private _doUpdate(old: DialogState, updated: DialogState) {
        let oldIndex = SortedArray.dialogs.find(this.state, old);
        this.state = SortedArray.dialogs.add(SortedArray.dialogs.remove(this.state, old), updated);
        let toIndex = SortedArray.dialogs.find(this.state, updated);

        // Update source
        if (this.inited) {
            this.source.updateItem(updated);
            if (oldIndex !== toIndex) {
                this.source.moveItem(old.key, toIndex);
            }
        }
    }
}