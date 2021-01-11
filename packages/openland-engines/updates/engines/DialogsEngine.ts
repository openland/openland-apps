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

    private dialogs = new Map<string, DialogState>();
    private userDialogs = new Map<string, string>();
    readonly dialogsAll = new DialogCollection(defaultQualifier);
    readonly dialogsUnread = new DialogCollection(unreadQualifier);
    readonly dialogsGroups = new DialogCollection(groupQualifier);
    readonly dialogsPrivate = new DialogCollection(privateQualifier);
    private allDialogs = [this.dialogsAll, this.dialogsUnread, this.dialogsGroups, this.dialogsPrivate];

    constructor() {
        //
    }

    //
    // Basic Updates
    //

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
        if (state.room) {
            let muted = state.room.settings.mute || false;
            let title = state.room.__typename === 'PrivateRoom' ? state.room.user.name : state.room.title;
            let photo = state.room.__typename === 'PrivateRoom' ? state.room.user.photo : state.room.photo;
            let featured = state.room.__typename === 'SharedRoom' && state.room.featured;

            if (this.dialogs.has(state.room.id)) {
                let ex = this.dialogs.get(state.room.id)!;
                let updated: DialogState = {
                    ...ex,
                    title,
                    photo,
                    muted,
                    featured
                };

                for (let d of this.allDialogs) {
                    d.onDialogUpdated(ex, updated);
                }

                this.dialogs.set(state.room.id, updated);
            } else {
                let added: DialogState = {
                    key: state.room.id,
                    title,
                    photo,
                    muted,
                    featured,
                    // NOTE: Coutners are set from CountersEngine within same transaction
                    counter: 0,
                    mentions: 0,
                    premium: state.room.__typename === 'SharedRoom' && state.room.isPremium,
                    channel: state.room.__typename === 'SharedRoom' && state.room.isChannel,
                    kind: state.room.__typename === 'PrivateRoom' ? 'private' : (state.room.kind === SharedRoomKind.GROUP ? 'group-secret' : 'group-shared'),
                    draft: null,
                    topMessage: null,
                    sortKey: null
                };
                for (let d of this.allDialogs) {
                    d.onDialogAdded(added);
                }
                this.dialogs.set(state.room.id, added);
                if (state.room.__typename === 'PrivateRoom') {
                    this.userDialogs.set(state.room.user.id, state.cid);
                }
            }
        } else {
            for (let d of this.allDialogs) {
                d.onDialogRemoved(this.dialogs.get(state.cid)!);
            }
            this.dialogs.delete(state.cid);
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        if (update.__typename === 'UpdateRoomChanged') {
            let muted = update.room.settings.mute || false;
            let title = update.room.__typename === 'PrivateRoom' ? update.room.user.name : update.room.title;
            let photo = update.room.__typename === 'PrivateRoom' ? update.room.user.photo : update.room.photo;
            let featured = update.room.__typename === 'SharedRoom' && update.room.featured;

            if (this.dialogs.has(update.room.id)) {
                let ex = this.dialogs.get(update.room.id)!;
                let updated: DialogState = {
                    ...ex,
                    title,
                    photo,
                    muted,
                    featured
                };
                for (let d of this.allDialogs) {
                    d.onDialogUpdated(ex, updated);
                }
                this.dialogs.set(update.room.id, updated);
            }
        }
    }

    //
    // External updates
    //

    async onTopMessageUpdate(tx: Transaction, cid: string, message: UpdateMessage | null) {
        if (this.dialogs.has(cid)) {
            let ex = this.dialogs.get(cid)!;
            let updated: DialogState = {
                ...ex,
                topMessage: message,
                sortKey: resolveSortKey(message, ex.draft)
            };
            for (let d of this.allDialogs) {
                d.onDialogUpdated(ex, updated);
            }
            this.dialogs.set(cid, updated);
        }
    }

    async onDraftUpdate(tx: Transaction, cid: string, draft: { message: string, date: number } | null) {
        if (this.dialogs.has(cid)) {
            let ex = this.dialogs.get(cid)!;
            let updated: DialogState = {
                ...ex,
                draft,
                sortKey: resolveSortKey(ex.topMessage, draft)
            };
            for (let d of this.allDialogs) {
                d.onDialogUpdated(ex, updated);
            }
            this.dialogs.set(cid, updated);
        }
    }

    async onCounterUpdate(tx: Transaction, cid: string, counters: { unread: number, mentions: number }) {
        if (this.dialogs.has(cid)) {
            let ex = this.dialogs.get(cid)!;
            let updated: DialogState = {
                ...ex,
                counter: counters.unread,
                mentions: counters.mentions
            };
            for (let d of this.allDialogs) {
                d.onDialogUpdated(ex, updated);
            }
            this.dialogs.set(cid, updated);
        }
    }

    async onDialogsLoaded(tx: Transaction) {
        for (let d of this.allDialogs) {
            d.onDialogsLoaded();
        }
    }
}