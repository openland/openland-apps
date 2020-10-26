import { Transaction } from './../../persistence/Persistence';
import { Sequencer } from './Sequencer';
import { Persistence } from 'openland-engines/persistence/Persistence';

export class SequencesState<T> {
    static async open<T>(persistence: Persistence) {
        let ids = await persistence.readJson<string[]>('updates.invalid') || [];
        let invalid: { id: string, pts: number }[] = [];
        for (let i of ids) {
            let pts = (await persistence.readInt('updates.sequence.' + i))!;
            invalid.push({ pts, id: i });
        }
        return new SequencesState<T>(invalid);
    }

    private invalid = new Set<string>();
    private sequences = new Map<string, Sequencer<T> | null>();

    private constructor(invalid: { id: string, pts: number }[]) {
        for (let i of invalid) {
            this.invalid.add(i.id);
            let s = new Sequencer<T>();
            s.reset(i.pts);
            this.sequences.set(i.id, s);
        }
    }

    async onSequenceLoaded(tx: Transaction, id: string, pts: number) {
        await this.loadSequenceIfNeeded(tx, id);
        let s = this.sequences.get(id);
        if (s) {
            throw Error('Sequence already exists');
        }
        s = new Sequencer<T>();
        s.reset(pts);
        this.sequences.set(id, s);
    }

    async hasSequence(tx: Transaction, id: string) {
        if (!!this.sequences.get(id)) {
            return true;
        }
        await this.loadSequenceIfNeeded(tx, id);
        return !!this.sequences.get(id);
    }

    private async loadSequenceIfNeeded(tx: Transaction, id: string) {
        if (this.sequences.has(id)) {
            return;
        }
        let pts = (await tx.readInt('updates.sequence.' + id));
        if (pts !== null) {
            let s = new Sequencer<T>();
            s.reset(pts);
            this.sequences.set(id, s);
        } else {
            this.sequences.set(id, null);
        }
    }
}