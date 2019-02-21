import { isEmoji } from './isEmoji';
describe('isEmoji', () => {
    it('should handle unicode emoji', () => {
        expect(isEmoji('🦄')).toBe(true);
        expect(isEmoji('😀')).toBe(true);
        expect(isEmoji('🤝')).toBe(true);
        expect(isEmoji('🙋🏽‍♀️')).toBe(true);
    });
});
