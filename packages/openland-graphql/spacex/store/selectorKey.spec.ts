import { selectorKey } from './selectorKey';

describe('selectorKey', () => {
    it('should return name for empty arguments', () => {
        let selector1 = selectorKey('name', {}, {});
        expect(selector1).toBe('name');
        let selector2 = selectorKey('nameonetwothre12', {}, {});
        expect(selector2).toBe('nameonetwothre12');
    });
});