import { Persistence } from 'openland-engines/persistence/Persistence';
import { StoredMap } from './storage/StoredMap';
import { UsersEngine } from './UsersEngine';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UpdateMessage } from './../../../openland-api/spacex.types';
import { DialogState } from './dialogs/DialogState';
import { DialogCollection } from './dialogs/DialogCollection';
import { defaultQualifier, unreadQualifier, groupQualifier, privateQualifier } from './dialogs/qualifiers';
import { Transaction } from '../../persistence/Persistence';
import { ShortSequenceChat, SharedRoomKind, ShortUpdate } from 'openland-api/spacex.types';

function resolveSortKey(src: UpdateMessage | null, draft: { message: string, date: number } | null): number | null {
    if (src && !draft) {
        return parseInt(src.date, 10);
    } else if (!src && draft) {
        return draft.date;
    } else if (src && draft) {
        let s = parseInt(src.date, 10);
        if (s < draft.date) {
            return draft.date;
        } else {
            return s;
        }
    }
    return null;
}

export class DialogsEngine {

    readonly persistence: Persistence;
    readonly me: string;
    readonly users: UsersEngine;
    readonly dialogs = new StoredMap<DialogState>('dialogs');
    readonly dialogCollections = new StoredMap<{ completed: boolean, index: { key: string, sortKey: number }[] }>('dialogCollections');
    readonly userDialogs = new StoredMap<string>('userDialogs');
    readonly dialogsAll: DialogCollection;
    readonly dialogsUnread: DialogCollection;
    readonly dialogsGroups: DialogCollection;
    readonly dialogsPrivate: DialogCollection;
    readonly allDialogs: DialogCollection[];

    constructor(me: string, messenger: MessengerEngine, users: UsersEngine, persistence: Persistence) {
        this.persistence = persistence;
        this.me = me;
        this.users = users;
        this.dialogsAll = new DialogCollection('generic-all', defaultQualifier, this);
        this.dialogsUnread = new DialogCollection('generic-unread', unreadQualifier, this);
        this.dialogsGroups = new DialogCollection('generic-groups', groupQualifier, this);
        this.dialogsPrivate = new DialogCollection('generic-private', privateQualifier, this);
        this.allDialogs = [this.dialogsAll, this.dialogsUnread, this.dialogsGroups, this.dialogsPrivate];

        // Augment online
        messenger.getOnlines().onSingleChange((user, online) => {
            this.persistence.inTx(async (tx) => {
                let conversationId = await this.userDialogs.get(tx, user);
                if (!conversationId) {
                    return;
                }
                for (let d of this.allDialogs) {
                    d.onlineAugmentator.setAugmentation(conversationId, { online });
                }
            });
        });

        // Augment typings
        messenger.getTypings().subcribe((typing, uids, typingType, conversationId) => {
            for (let d of this.allDialogs) {
                if (typing) {
                    d.typingsAugmentator.setAugmentation(conversationId, { typing, typingType });
                } else {
                    d.typingsAugmentator.removeAugmentation(conversationId);
                }
            }
        });

        // Load collections
        persistence.inTx(async (tx) => {
            for (let d of this.allDialogs) {
                await d.init(tx);
            }
        });
    }

    //
    // Basic Updates
    //

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
        let ex = await this.dialogs.get(tx, state.cid);

        if (state.room) {
            let muted = state.room.settings.mute || false;
            let title = state.room.__typename === 'PrivateRoom' ? state.room.user.name : state.room.title;
            let photo = state.room.__typename === 'PrivateRoom' ? state.room.user.photo : state.room.photo;
            let featured = state.room.__typename === 'SharedRoom' && state.room.featured;
            let activeCall = state.room.hasActiveCall;
            if (ex) {
                let updated: DialogState = {
                    ...ex,
                    title,
                    photo,
                    muted,
                    featured,
                    activeCall
                };
                this.dialogs.set(tx, state.room.id, updated);

                for (let d of this.allDialogs) {
                    await d.onDialogUpdated(tx, ex, updated);
                }
            } else {
                let added: DialogState = {
                    key: state.room.id,
                    title,
                    photo,
                    muted,
                    featured,
                    activeCall,
                    // NOTE: Coutners are set from CountersEngine within same transaction
                    counter: 0,
                    mentions: 0,
                    premium: state.room.__typename === 'SharedRoom' && state.room.isPremium,
                    channel: state.room.__typename === 'SharedRoom' && state.room.isChannel,
                    kind: state.room.__typename === 'PrivateRoom' ? 'private' : (state.room.kind === SharedRoomKind.GROUP ? 'group-secret' : 'group-shared'),
                    draft: null,
                    // NOTE: Top Message is set from HistoryEngine within same transaction
                    topMessage: null,
                    sortKey: null
                };
                this.dialogs.set(tx, state.room.id, added);
                if (state.room.__typename === 'PrivateRoom') {
                    this.userDialogs.set(tx, state.room.user.id, state.cid);
                }
                for (let d of this.allDialogs) {
                    await d.onDialogAdded(tx, added);
                }
            }
        } else {
            if (ex) {
                this.dialogs.delete(tx, state.cid);
                for (let d of this.allDialogs) {
                    await d.onDialogRemoved(tx, ex);
                }
            }
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        if (update.__typename === 'UpdateRoomChanged') {
            let muted = update.room.settings.mute || false;
            let title = update.room.__typename === 'PrivateRoom' ? update.room.user.name : update.room.title;
            let photo = update.room.__typename === 'PrivateRoom' ? update.room.user.photo : update.room.photo;
            let featured = update.room.__typename === 'SharedRoom' && update.room.featured;
            let activeCall = update.room.hasActiveCall;

            let ex = await this.dialogs.get(tx, update.room.id);
            if (ex) {
                let updated: DialogState = {
                    ...ex,
                    title,
                    photo,
                    muted,
                    featured,
                    activeCall
                };
                this.dialogs.set(tx, update.room.id, updated);
                for (let d of this.allDialogs) {
                    await d.onDialogUpdated(tx, ex, updated);
                }
            }
        }
    }

    //
    // External updates
    //

    async onTopMessageUpdate(tx: Transaction, cid: string, message: UpdateMessage | null) {
        let ex = await this.dialogs.get(tx, cid);
        if (ex) {
            let updated: DialogState = {
                ...ex,
                topMessage: message,
                sortKey: resolveSortKey(message, ex.draft)
            };
            this.dialogs.set(tx, cid, updated);
            for (let d of this.allDialogs) {
                await d.onDialogUpdated(tx, ex, updated);
            }
        }
    }

    async onDraftUpdate(tx: Transaction, cid: string, draft: { message: string, date: number } | null) {
        let ex = await this.dialogs.get(tx, cid);
        if (ex) {
            let updated: DialogState = {
                ...ex,
                draft,
                sortKey: resolveSortKey(ex.topMessage, draft)
            };
            this.dialogs.set(tx, cid, updated);
            for (let d of this.allDialogs) {
                await d.onDialogUpdated(tx, ex, updated);
            }
        }
    }

    async onCounterUpdate(tx: Transaction, cid: string, counters: { unread: number, mentions: number }) {
        let ex = await this.dialogs.get(tx, cid);
        if (ex) {
            let updated: DialogState = {
                ...ex,
                counter: counters.unread,
                mentions: counters.mentions
            };
            this.dialogs.set(tx, cid, updated);
            for (let d of this.allDialogs) {
                await d.onDialogUpdated(tx, ex, updated);
            }
        }
    }

    async onDialogsLoaded(tx: Transaction) {
        for (let d of this.allDialogs) {
            await d.onDialogsLoaded(tx);
        }
    }
}