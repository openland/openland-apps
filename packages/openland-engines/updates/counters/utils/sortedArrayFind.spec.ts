import { sortedArrayFind } from './sortedArrayFind';

describe('sortedArrayFind', () => {
    it('should search in empty array', () => {
        expect(sortedArrayFind([], 3)).toBe(-1);
        expect(sortedArrayFind([], 0)).toBe(-1);
        expect(sortedArrayFind([], -1)).toBe(-1);
    });
    it('should search values correctly', () => {
        expect(sortedArrayFind([1, 2, 3, 4, 5], 3)).toBe(2);
        expect(sortedArrayFind([1, 2, 3, 4, 5], -1)).toBe(-1);
        expect(sortedArrayFind([1, 2, 3, 4, 5], 5)).toBe(4);
    });
});