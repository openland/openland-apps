import { sortedArrayAdd } from './sortedArrayAdd';

describe('sortedArrayAdd', () => {
    it('should add value to empty array', () => {
        expect(sortedArrayAdd([], 0)).toMatchObject([0]);
        expect(sortedArrayAdd([], 1)).toMatchObject([1]);
        expect(sortedArrayAdd([], 10)).toMatchObject([10]);
    });
    it('should add value to sorted array', () => {
        expect(sortedArrayAdd([1, 2, 3], 0)).toMatchObject([0, 1, 2, 3]);
        expect(sortedArrayAdd([1, 2, 3], 2.5)).toMatchObject([1, 2, 2.5, 3]);
        expect(sortedArrayAdd([1, 2, 3], 4)).toMatchObject([1, 2, 3, 4]);
    });
});