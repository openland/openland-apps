import { parseSpans } from './parseSpans';

describe('parseSpans (nested: false)', () => {
    it('should find no spans', () => {
        let res = parseSpans('hello!');

        expect(res.length).toBe(0);
    });

    it('should find one bold span', () => {
        let res = parseSpans('*123*');

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("Bold");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(5);
    });

    it('should find one bold and one insane span', () => {
        let res = parseSpans('*123* 123 🌈123🌈');

        expect(res.length).toBe(2);

        expect(res[0].type).toBe("Bold");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(5);

        expect(res[1].type).toBe("Insane");
        expect(res[1].offset).toBe(10);
        expect(res[1].length).toBe(7);
    });

    it('should ignore any spans in codeblock span', () => {
        let res = parseSpans('123 ```*123* 123 🌈123🌈``` 123');

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("CodeBlock");
        expect(res[0].offset).toBe(4);
        expect(res[0].length).toBe(23);
    });

    it('should check whitelisted symbols before and after span', () => {
        let res = parseSpans('_123_ 123 *123*123 🌈123🌈 123 _123_');

        expect(res.length).toBe(3);

        expect(res[0].type).toBe("Italic");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(5);

        expect(res[1].type).toBe("Insane");
        expect(res[1].offset).toBe(19);
        expect(res[1].length).toBe(7);

        expect(res[2].type).toBe("Italic");
        expect(res[2].offset).toBe(31);
        expect(res[2].length).toBe(5);
    });

    it('should ignore links', () => {
        let res = parseSpans('https://openland.com/123_123_123');

        expect(res.length).toBe(0);
    });

    it('should respect line-break', () => {
        let res = parseSpans('*123\n123*');

        expect(res.length).toBe(0);
    });

    it('should ignore close-backet', () => {
        let res = parseSpans(')*123123*');

        expect(res.length).toBe(0);
    });

    it('should ignore stupid users', () => {
        let res = parseSpans('```123 *123* _123_');

        expect(res.length).toBe(0);
    });

    it('should ignore "!" before, but not after', () => {
        let res = parseSpans('!*123* _123_!');

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("Italic");
        expect(res[0].offset).toBe(7);
        expect(res[0].length).toBe(5);
    });
});

describe('parseSpans (nested: true)', () => {
    it('should ignore any spans in master span', () => {
        let res = parseSpans('123 ```*123* 123 🌈123🌈``` 123', true);

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("CodeBlock");
        expect(res[0].offset).toBe(4);
        expect(res[0].length).toBe(23);
    });

    it('should find nested spans', () => {
        let res = parseSpans('`a _bc_ *def :ghi: 123* _456_ 7`', true);

        expect(res.length).toBe(5);

        expect(res[0].type).toBe("InlineCode");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(32);

        expect(res[1].type).toBe("Italic");
        expect(res[1].offset).toBe(3);
        expect(res[1].length).toBe(4);

        expect(res[2].type).toBe("Bold");
        expect(res[2].offset).toBe(8);
        expect(res[2].length).toBe(15);

        expect(res[3].type).toBe("Loud");
        expect(res[3].offset).toBe(13);
        expect(res[3].length).toBe(5);

        expect(res[4].type).toBe("Italic");
        expect(res[4].offset).toBe(24);
        expect(res[4].length).toBe(5);
    });
});