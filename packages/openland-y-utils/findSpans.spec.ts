import { findSpans } from './findSpans';

describe('Spans Parser', () => {
    it('should find no spans', () => {
        let res = findSpans('hello!');

        expect(res.length).toBe(0);
    });

    it('should find one bold span', () => {
        let res = findSpans('*123*');

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("Bold");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(5);
    });

    it('should find one bold and one insane span', () => {
        let res = findSpans('*123* 123 🌈123🌈');

        expect(res.length).toBe(2);

        expect(res[0].type).toBe("Bold");
        expect(res[0].offset).toBe(0);
        expect(res[0].length).toBe(5);

        expect(res[1].type).toBe("Insane");
        expect(res[1].offset).toBe(10);
        expect(res[1].length).toBe(7);
    });

    it('should ignore any spans in codeblock span', () => {
        let res = findSpans('123 ```*123* 123 🌈123🌈``` 123');

        expect(res.length).toBe(1);

        expect(res[0].type).toBe("CodeBlock");
        expect(res[0].offset).toBe(4);
        expect(res[0].length).toBe(23);
    });

    it('should check whitelisted symbols before and after span', () => {
        let res = findSpans('_123_ 123 *123*123 🌈123🌈 123 _123_');

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
        let res = findSpans('https://openland.com/123_123_123');

        expect(res.length).toBe(0);
    });

    it('should ignore stupid users', () => {
        let res = findSpans('```123 *123* _123_');

        expect(res.length).toBe(0);
    });
});