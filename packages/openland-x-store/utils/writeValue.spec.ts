import { writeValue } from './writeValue';

describe('writeValue', () => {
    it('Should write value correctly', () => {
        let src: any = {};
        writeValue(src, 'something', 'value');
        expect(src.something).toBe('value');
    });
    it('Should create empty object correctly', () => {
        let src: any = {};
        writeValue(src, 'something.hey', 'value');
        expect(src.something.hey).toBe('value');
    });
    it('Should create empty array correctly', () => {
        let src: any = {};
        writeValue(src, 'something.0.val', 'value');
        expect(src.something[0].val).toBe('value');
    });
    it('Should create inner empty array correctly', () => {
        let src: any = {};
        writeValue(src, 'something.0.0.val', 'value');
        expect(src.something[0][0].val).toBe('value');
    });
    it('Should crash trying to write structured value to array', () => {
        let src: any = {};
        writeValue(src, 'something.0.val', 'value');
        expect(() => writeValue(src, 'something.hey', 'value2')).toThrow('Trying to write struct value to the array');
    });
    it('Should handle primite arrays', () => {
        let src: any = {};
        writeValue(src, 'something.0', 'value');
        expect(src.something[0]).toBe('value');
    });
    it('Should crash trying to write structured value to array', () => {
        let src: any = {};
        writeValue(src, 'something.val', 'value');
        expect(() => writeValue(src, 'something.0', 'value2')).toThrow('Trying to write array value to the struct');
    });
    it('Should convert undefined to null', () => {
        let src: any = {};
        writeValue(src, 'something', undefined);
        expect(src.something).toBe(null);
    });
});