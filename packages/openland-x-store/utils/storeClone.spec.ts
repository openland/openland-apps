import { writeValue } from './writeValue';
import { storeClone } from './storeClone';

describe('storeClone', () => {
    it('Should copy objects correctly', () => {
        let src: any = {};
        writeValue(src, 'some.thin.g', 'value');
        let cloned = storeClone(src);
        expect(cloned.some.thin.g).toBe('value');
    });
    it('Should copy arrays correctly', () => {
        let src: any = {};
        writeValue(src, 'some.thin.0.g', 'value');
        let cloned = storeClone(src);
        expect(cloned.some.thin[0].g).toBe('value');
    });
});