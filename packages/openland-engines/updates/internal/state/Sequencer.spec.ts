import { Sequencer } from './Sequencer';
describe('Sequencer', () => {
    it('should persist messages before reset', () => {
        let sequencer = new Sequencer<number>();
        expect(sequencer.counter).toBeNull();
        expect(sequencer.hasPending).toBe(false);
        sequencer.receive(1, 1);
        sequencer.receive(2, 2);
        sequencer.receive(3, 3);
        sequencer.receive(3, 4);
        sequencer.receive(3, 5);
        sequencer.receive(4, 6);
        sequencer.receive(7, 8);
        sequencer.receive(8, 9);
        sequencer.receive(9, 10);
        expect(sequencer.counter).toBeNull();
        expect(sequencer.hasPending).toBe(true);
        sequencer.reset(2);
        expect(sequencer.hasPending).toBe(true);
        expect(sequencer.drain()).toMatchObject([3, 6]);
        expect(sequencer.hasPending).toBe(true);
        expect(sequencer.drain()).toMatchObject([]);
        expect(sequencer.hasPending).toBe(true);
        expect(sequencer.drainAllTo(8)).toMatchObject([8, 9]);
        expect(sequencer.hasPending).toBe(true);
        expect(sequencer.drain()).toMatchObject([10]);
        expect(sequencer.hasPending).toBe(false);
    });
});