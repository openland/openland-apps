import { SortedArray } from './SortedArray';

describe('sortedArrayAdd', () => {
    it('should add value to empty array', () => {
        expect(SortedArray.numbers.add([], 0)).toMatchObject([0]);
        expect(SortedArray.numbers.add([], 1)).toMatchObject([1]);
        expect(SortedArray.numbers.add([], 10)).toMatchObject([10]);
    });
    it('should add value to sorted array', () => {
        expect(SortedArray.numbers.add([1, 2, 3], 0)).toMatchObject([0, 1, 2, 3]);
        expect(SortedArray.numbers.add([1, 2, 3], 2.5)).toMatchObject([1, 2, 2.5, 3]);
        expect(SortedArray.numbers.add([1, 2, 3], 4)).toMatchObject([1, 2, 3, 4]);
    });

    it('should search in empty array', () => {
        expect(SortedArray.numbers.find([], 3)).toBe(-1);
        expect(SortedArray.numbers.find([], 0)).toBe(-1);
        expect(SortedArray.numbers.find([], -1)).toBe(-1);
    });
    it('should search values correctly', () => {
        expect(SortedArray.numbers.find([1, 2, 3, 4, 5], 3)).toBe(2);
        expect(SortedArray.numbers.find([1, 2, 3, 4, 5], -1)).toBe(-1);
        expect(SortedArray.numbers.find([1, 2, 3, 4, 5], 5)).toBe(4);
    });
});