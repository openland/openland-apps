import { preprocessMentions } from './preprocessMentions';
describe('preprocessMentions', () => {
    it('should handle empty case', () => {
        let res = preprocessMentions('text', undefined, undefined);
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('text');
        res = preprocessMentions('text', [], undefined);
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('text');
        res = preprocessMentions('text', undefined, []);
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('text');
        res = preprocessMentions('text', [], []);
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('text');
    });

    it('should find mentions', () => {
        let res = preprocessMentions('@Yury Lifshits', [{ name: 'Yury Lifshits' }], undefined);
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('user');
        expect(res[0].text).toBe('Yury Lifshits');
        expect((res[0] as any).user.name).toBe('Yury Lifshits');

        res = preprocessMentions('Hello @Yury Lifshits and bye!', [{ name: 'Yury Lifshits' }], undefined);
        expect(res.length).toBe(3);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('Hello ');
        expect(res[1].type).toBe('user');
        expect(res[1].text).toBe('Yury Lifshits');
        expect((res[1] as any).user.name).toBe('Yury Lifshits');
        expect(res[2].type).toBe('text');
        expect(res[2].text).toBe(' and bye!');
    });
})