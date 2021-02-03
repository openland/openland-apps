import { LOG } from './../../LOG';
import { DialogState } from 'openland-engines/updates/engines/dialogs/DialogState';
import { DialogCounterQualifier } from './DialogCounterQualifier';
import { Transaction } from 'openland-engines/persistence/Persistence';

export class DialogCollectionCounter {
    readonly key: string;
    readonly qualifier: DialogCounterQualifier;
    private _value!: number;

    constructor(key: string, qualifier: DialogCounterQualifier) {
        this.key = key;
        this.qualifier = qualifier;
    }

    async init(tx: Transaction) {
        await this._loadIfNeeded(tx);
    }

    async onDialogAdded(tx: Transaction, src: DialogState) {
        await this._loadIfNeeded(tx);

        let counter = this.qualifier(src);
        if (counter > 0) {
            this._value += counter;
            tx.writeInt('counters.' + this.key, this._value);
            if (LOG) {
                console.log('[updates]: counters: updated: counters.' + this.key + ': ' + this._value);
            }
        }
    }

    async onDialogRemoved(tx: Transaction, src: DialogState) {
        await this._loadIfNeeded(tx);

        let counter = this.qualifier(src);
        if (counter > 0) {
            this._value -= counter;
            tx.writeInt('counters.' + this.key, this._value);
            if (LOG) {
                console.log('[updates]: counters: updated: counters.' + this.key + ': ' + this._value);
            }
        }
    }

    async onDialogUpdated(tx: Transaction, old: DialogState, updated: DialogState) {
        await this._loadIfNeeded(tx);
        let delta = this.qualifier(updated) - this.qualifier(old);
        if (delta > 0) {
            this._value += delta;
            tx.writeInt('counters.' + this.key, this._value);
            if (LOG) {
                console.log('[updates]: counters: updated: counters.' + this.key + ': ' + this._value);
            }
        }
    }

    private async _loadIfNeeded(tx: Transaction) {
        if (this._value === undefined) {
            let ex = await tx.readInt('counters.' + this.key);
            if (ex !== null) {
                this._value = ex;
            } else {
                this._value = 0;
            }
            if (LOG) {
                console.log('[updates]: counters: loaded: counters.' + this.key + ': ' + this._value);
            }
        }
    }
}