import { storeMerge } from './storeMerge';

describe('storeMerge', () => {
    it('Should merge objects correctly', () => {
        let left: any = {
            a: 1
        };
        let right: any = {
            b: 2
        };
        let merged = storeMerge(left, right);
        expect(merged.a).toBe(1);
        expect(merged.b).toBe(2);
    });
    it('Should owerwrite objects correctly', () => {
        let left: any = {
            a: 1
        };
        let right: any = {
            a: 2
        };
        let merged = storeMerge(left, right);
        expect(merged.a).toBe(2);
    });
});