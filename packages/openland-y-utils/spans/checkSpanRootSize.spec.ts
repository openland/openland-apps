import { emojiChecker } from './checkSpanRootSize';
describe('emojiChecker', () => {
    it('should return true for equal or less than 3 emojis', () => {
        expect(emojiChecker('🦄')).toBe(true);
        expect(emojiChecker('😀 😀')).toBe(true);
        expect(emojiChecker('🤝\n 🤝')).toBe(true);
        expect(emojiChecker('🧘🏿‍♀️🧘🏿‍♀️🧘🏿‍♀️')).toBe(true);
        expect(emojiChecker('👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦')).toBe(true);
    });

    it('should return false for non emoji symbols', () => {
        expect(emojiChecker('ê')).toBe(false);
        expect(emojiChecker('ä')).toBe(false);
        expect(emojiChecker('ū')).toBe(false);
    });

    it('should return false for more than 3 emojis', () => {
        expect(emojiChecker('😀 😀 😀 😀')).toBe(false);
        expect(emojiChecker('🧘🏿‍♀️🧘🏿‍♀️🧘🏿‍♀️🧘🏿‍♀️')).toBe(false);
        expect(emojiChecker('👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦👨‍👩‍👦‍👦')).toBe(false);
    });

    it('should return false for emoji with text', () => {
        expect(emojiChecker('😀 hi')).toBe(false);
        expect(emojiChecker('a 😀')).toBe(false);
    });
});
