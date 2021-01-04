import { Transaction } from '../../persistence/Persistence';
import { ShortSequenceChat, ShortUpdate } from 'openland-api/spacex.types';

interface DialogState {
    id: string;
    title: string;
    photo: string | null;
    muted: boolean;

    counter: number;
    mentions: number;
}

export class DialogsEngine {

    private dialogs = new Map<string, DialogState>();

    constructor() {
        //
    }

    async onSequenceRestart(tx: Transaction, state: ShortSequenceChat) {
        if (state.room) {
            let muted = state.room.settings.mute || false;
            let title = state.room.__typename === 'PrivateRoom' ? state.room.user.name : state.room.title;
            let photo = state.room.__typename === 'PrivateRoom' ? state.room.user.photo : state.room.photo;

            if (this.dialogs.has(state.room.id)) {
                let ex = this.dialogs.get(state.room.id)!;
                this.dialogs.set(state.room.id, {
                    ...ex,
                    title,
                    photo,
                    muted
                });
            } else {
                this.dialogs.set(state.room.id, {
                    id: state.room.id,
                    title,
                    photo,
                    muted,
                    counter: 0,
                    mentions: 0
                });
            }
        } else {
            this.dialogs.delete(state.cid);
        }
    }

    async onUpdate(tx: Transaction, update: ShortUpdate) {
        // TODO: Handle
    }

    async onCounterUpdate(tx: Transaction, cid: string, counters: { unread: number, mentions: number }) {
        if (this.dialogs.has(cid)) {
            let ex = this.dialogs.get(cid)!;
            this.dialogs.set(cid, {
                ...ex,
                counter: counters.unread,
                mentions: counters.mentions
            });
        }
    }

    async onDialogsLoaded(tx: Transaction) {
        console.warn(Array.from(this.dialogs.values()));
    }
}