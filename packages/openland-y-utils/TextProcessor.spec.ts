import { preprocessText } from './TextProcessor';

describe('Text Processor', () => {
    it('should handle no links', () => {
        let res = preprocessText('hello!');
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello!');
    });
    it('should handle empty string', () => {
        let res = preprocessText('');
        expect(res.length).toBe(1);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('');
    });
    it('should parse links', () => {
        let res = preprocessText('hello #tag https://openland.com');
        expect(res.length).toBe(5);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('hashtag');
        expect(res[2].text).toBe('#tag');
        expect(res[2].hashtag).toBe('#tag');
        expect(res[4].type).toBe('link');
        expect(res[4].text).toBe('https://openland.com');
        expect(res[4].link).toBe('https://openland.com');
    });

    it('should parse links without schema', () => {
        let res = preprocessText('hello openland.com');
        expect(res.length).toBe(3);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('link');
        expect(res[2].text).toBe('openland.com');
        expect(res[2].link).toBe('http://openland.com');
    });

    it('should parse emails', () => {
        let res = preprocessText('hello steve@openland.com');
        expect(res.length).toBe(3);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('link');
        expect(res[2].text).toBe('steve@openland.com');
        expect(res[2].link).toBe('mailto:steve@openland.com');
    });

    it('should parse text after links', () => {
        let res = preprocessText('hello openland.com world');
        expect(res.length).toBe(5);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('link');
        expect(res[2].text).toBe('openland.com');
        expect(res[2].link).toBe('http://openland.com');
        expect(res[4].type).toBe('text');
        expect(res[4].text).toBe('world');
    });

    it('should parse comma after link', () => {
        let res = preprocessText('hello openland.com, world');
        expect(res.length).toBe(6);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('link');
        expect(res[2].text).toBe('openland.com');
        expect(res[2].link).toBe('http://openland.com');
        expect(res[3].type).toBe('text');
        expect(res[3].text).toBe(',');
        expect(res[5].type).toBe('text');
        expect(res[5].text).toBe('world');
    });

    it('should parse new lines', () => {
        let res = preprocessText('hello\nworld');
        expect(res.length).toBe(4);
        expect(res[0].type).toBe('text');
        expect(res[0].text).toBe('hello');
        expect(res[2].type).toBe('new_line');
        expect(res[3].type).toBe('text');
        expect(res[3].text).toBe('world');
    });
});