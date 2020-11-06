import { CollapsableSequencer } from './CollapsableSequencer';
describe('CollapsableSequencer', () => {
    it('should sequence', () => {
        let seq = new CollapsableSequencer<string>();

        seq.reset(10);
        seq.put(10, '1');
        seq.put(11, '3');
        seq.put(13, '5');
        seq.put(12, '4');

        expect(seq.pick()).toMatchObject({ pts: 11, event: '3' });
        expect(seq.pick()).toMatchObject({ pts: 12, event: '4' });
        expect(seq.pick()).toMatchObject({ pts: 13, event: '5' });

        seq.putCollapsed(12, 14, [{ pts: 13, event: '5' }, { pts: 14, event: '6' }]);
        expect(seq.pick()).toMatchObject({ pts: 14, event: '6' });
    });
});