import { InMemoryKeyValueStore } from 'openland-y-utils/InMemoryKeyValueStore';
import { MainSequenceState } from './MainSequenceState';
import { Persistence } from '../../persistence/Persistence';

describe('MainSequenceState', () => {
    it('should perform init', async () => {
        let persistence = new Persistence(new InMemoryKeyValueStore());
        let state = await MainSequenceState.open<number>(persistence);
        expect(state.seq).toBeNull();
        expect(state.checkpoint).toBeNull();
        expect(state.invalid).toBe(true);
        expect(() => state.lock()).toThrowError();
        await persistence.inTx(async (tx) => {
            expect(() => state.onDifferenceReceived(tx, 0, '')).toThrowError();
            expect(() => state.onCheckpointReceived(tx, 0, '')).toThrowError();
        });
    });
});