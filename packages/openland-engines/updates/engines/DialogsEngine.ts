import { DialogState } from './dialogs/DialogState';
import { DialogCollection } from './dialogs/DialogCollection';
import { defaultQualifier, unreadQualifier, groupQualifier, privateQualifier } from './dialogs/qualifiers';
import { Transaction } from '../../persistence/Persistence';
import { ShortSequenceChat, FullMessage, SharedRoomKind, ShortUpdate } from 'openland-api/spacex.types';

function resolveSortKey(src: FullMessage | null, draft: { message: string, date: number } | null): number | null {
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

            if (this.dialogs.has(state.room.id)) {
                let ex = this.dialogs.get(state.room.id)!;
                let updated: DialogState = {
                    ...ex,
                    title,
                    photo,
                    muted
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
                    counter: 0,
                    mentions: 0,
                    kind: state.room.__typename === 'PrivateRoom' ? 'private' : (state.room.kind === SharedRoomKind.GROUP ? 'group-secret' : 'group-shared'),
                    draft: null,
                    topMessage: null,
                    sortKey: null
                };
                for (let d of this.allDialogs) {
                    d.onDialogAdded(added);
                }
                this.dialogs.set(state.room.id, added);
            }
        } else {
            for (let d of this.allDialogs) {
                d.onDialogRemoved(this.dialogs.get(state.cid)!);
            }
            this.dialogs.delete(state.cid);
        }
    }

    async onUpdate(tx: Transaction, pts: number, update: ShortUpdate) {
        // TODO: Handle
    }

    //
    // External updates
    //

    async onTopMessageUpdate(tx: Transaction, cid: string, message: FullMessage | null) {
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
        console.warn(this.dialogsUnread.state);

        for (let d of this.allDialogs) {
            d.onDialogsLoaded();
        }
    }
}