import { preprocessMentions } from './preprocessMentions';
describe('preprocessMentions', () => {
    it('should handle empty case', () => {
        let res = preprocessMentions('text', undefined, undefined);
        expect(res.length).toBe(1);
        const [mentionSpan] = res;
        expect(mentionSpan.type).toBe('text');
        expect(mentionSpan.text).toBe('text');
        res = preprocessMentions('text', [], undefined);
        expect(res.length).toBe(1);
        expect(mentionSpan.type).toBe('text');
        expect(mentionSpan.text).toBe('text');
        res = preprocessMentions('text', undefined, []);
        expect(res.length).toBe(1);
        expect(mentionSpan.type).toBe('text');
        expect(mentionSpan.text).toBe('text');
        res = preprocessMentions('text', [], []);
        expect(res.length).toBe(1);
        expect(mentionSpan.type).toBe('text');
        expect(mentionSpan.text).toBe('text');
    });

    it('should find mentions (just mention)', () => {
        let res = preprocessMentions('@Yury Lifshits', [{ name: 'Yury Lifshits' }], undefined);
        expect(res.length).toBe(1);
        const [mentionSpan] = res;
        expect(mentionSpan.type).toBe('user');
        expect(mentionSpan.text).toBe('Yury Lifshits');
        expect((mentionSpan as any).user.name).toBe('Yury Lifshits');
    });

    it('should find mentions (mention in surrounded text)', () => {
        let res = preprocessMentions(
            'Hello @Yury Lifshits and bye!',
            [{ name: 'Yury Lifshits' }],
            undefined,
        );
        expect(res.length).toBe(3);
        const [mentionSpan1, mentionSpan2, mentionSpan3] = res;
        expect(mentionSpan1.type).toBe('text');
        expect(mentionSpan1.text).toBe('Hello ');
        expect(mentionSpan2.type).toBe('user');
        expect(mentionSpan2.text).toBe('Yury Lifshits');
        expect((mentionSpan2 as any).user.name).toBe('Yury Lifshits');
        expect(mentionSpan3.type).toBe('text');
        expect(mentionSpan3.text).toBe(' and bye!');
    });

    it('should process two mentions', () => {
        let res = preprocessMentions(
            '@Yury Lifshits @Yury Lifshits',
            [{ name: 'Yury Lifshits' }, { name: 'Yury Lifshits' }],
            undefined,
        );
        expect(res.length).toBe(3);

        const [mentionSpan1, mentionSpan2, mentionSpan3] = res;

        expect(mentionSpan1.type).toBe('user');
        expect((mentionSpan1 as any).user.name).toBe('Yury Lifshits');
        expect(mentionSpan2.type).toBe('text');
        expect(mentionSpan2.text).toBe(' ');
        expect(mentionSpan3.type).toBe('user');
        expect((mentionSpan3 as any).user.name).toBe('Yury Lifshits');
    });

    it('should process two different mentions', () => {
        let res = preprocessMentions(
            '@Steve Kite @Yury Lifshits',
            [{ name: 'Steve Kite' }, { name: 'Yury Lifshits' }],
            undefined,
        );
        expect(res.length).toBe(3);

        const [mentionSpan1, mentionSpan2, mentionSpan3] = res;

        expect(mentionSpan1.type).toBe('user');
        expect((mentionSpan1 as any).user.name).toBe('Steve Kite');
        expect(mentionSpan2.type).toBe('text');
        expect(mentionSpan2.text).toBe(' ');
        expect(mentionSpan3.type).toBe('user');
        expect((mentionSpan3 as any).user.name).toBe('Yury Lifshits');
    });
});
