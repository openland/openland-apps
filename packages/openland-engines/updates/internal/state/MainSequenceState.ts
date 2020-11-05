import { Transaction } from '../../../persistence/Persistence';
import { Sequencer } from './Sequencer';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class MainSequenceState<T> {

    static async open<T>(persistence: Persistence) {
        let [seq, state] = await Promise.all([persistence.readInt('updates.seq'), persistence.read('updates.state')]);
        if (seq !== null && state !== null) {
            return new MainSequenceState<T>({ seq, state });
        } else {
            return new MainSequenceState<T>(null);
        }
    }

    private _checkpoint: { seq: number, state: string } | null;
    private _invalid: boolean;
    private _sequencer = new Sequencer<T>();
    private _locked = false;

    private constructor(state: { seq: number, state: string } | null) {
        this._checkpoint = state;
        this._invalid = !state;
        if (this._checkpoint) {
            this._sequencer.reset(this._checkpoint.seq);
            this._locked = this._invalid;
        } else {
            this._locked = true;
        }
    }

    get invalid() {
        return this._invalid;
    }

    get checkpoint() {
        return this._checkpoint;
    }

    get seq() {
        return this._sequencer.counter;
    }

    onStateReceived(tx: Transaction, seq: number, state: string) {
        if (this._checkpoint) {
            throw Error('Already inited');
        }
        if (!this._locked) {
            throw Error('Not locked');
        }
        this._checkpoint = { seq, state };
        this._sequencer.reset(this._checkpoint.seq);
        this._locked = false;
        tx.writeInt('updates.seq', seq);
        tx.write('updates.state', state);
        let drained = this._sequencer.drain();
        this._invalid = this._sequencer.hasPending;
        return drained;
    }

    lock() {
        if (this._locked) {
            throw Error('Already locked');
        }
        if (!this._checkpoint) {
            throw Error('Not inited');
        }
        this._locked = true;
    }

    onDifferenceReceived(tx: Transaction, seq: number, state: string) {
        if (!this._checkpoint) {
            throw Error('Not inited');
        }
        if (!this._locked) {
            throw Error('Not locked');
        }
        this._checkpoint = { seq, state };
        this._sequencer.reset(this._checkpoint.seq);
        this._locked = false;
        tx.writeInt('updates.seq', seq);
        tx.write('updates.state', state);
        let drained = this._sequencer.drain();
        this._invalid = this._sequencer.hasPending;
        return drained;
    }

    onCheckpointReceived(tx: Transaction, seq: number, state: string) {
        if (!this._checkpoint) {
            throw Error('Not inited');
        }
        if (this._locked) {
            return;
        }

        if (this._checkpoint.seq < seq && this._sequencer.counter! >= seq) {
            this._checkpoint = { seq, state };
            tx.writeInt('updates.seq', seq);
            tx.write('updates.state', state);
        }
    }

    onReceive(seq: number, event: T) {
        this._sequencer.receive(seq, event);
        let drained = this._locked ? [] : this._sequencer.drain();
        this._invalid = this._sequencer.hasPending;
        return drained;
    }
}