import { emojiChecker } from './checkSpanRootSize';
describe('emojiChecker', () => {
    it('should return true for emoji symbols', () => {
        expect(emojiChecker(' 🦄 ')).toBe(true);
        expect(emojiChecker('😀\t 😀')).toBe(true);
        expect(emojiChecker('🤝\n 🤝')).toBe(true);
        expect(emojiChecker('🧘🏿‍♀️🧘🏿‍♀️🧘🏿‍♀️')).toBe(true);
        expect(emojiChecker('👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦')).toBe(true);
    });

    it('should return false for non emoji symbols', () => {
        expect(emojiChecker('ê')).toBe(false);
        expect(emojiChecker('ä')).toBe(false);
        expect(emojiChecker('ū')).toBe(false);
        expect(emojiChecker('hello')).toBe(false);
    });

    it('should return false for emoji with text', () => {
        expect(emojiChecker('😀 hi')).toBe(false);
        expect(emojiChecker('a 😀')).toBe(false);
    });
});
