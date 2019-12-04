import { RecordStore } from './RecordStore';
import { obj, field, notNull, scalar } from '../types';
import { readFromStore } from './readFromStore';

describe('readFromStore', () => {
    it('should read simple scalars', () => {
        let type = obj(
            field("field1", "alias1", {}, notNull(scalar("String"))),
            field("field2", "alias2", {}, notNull(scalar("Int"))),
            field("field3", "alias3", {}, scalar("Float")),
            field("field4", "alias4", {}, scalar("Float")),
            field("field5", "alias5", {}, scalar("ID")),
            field("field6", "alias6", {}, scalar("Date")),
            field("field7", "alias7", {}, scalar("Boolean")),
            field("field8", "alias8", {}, scalar("Boolean"))
        );

        let store = new RecordStore();
        store.loaded({
            "1": {
                "key": '1',
                fields: {
                    "field1": { type: 'string', value: 'value1' },
                    "field2": { type: 'number', value: 1 },
                    "field3": { type: 'null' },
                    "field4": { type: 'number', value: 1 },
                    "field5": { type: 'string', value: '1' },
                    "field6": { type: 'string', value: '123123' },
                    "field7": { type: 'boolean', value: true },
                    "field8": { type: 'boolean', value: false }
                }
            }
        });

        let res = readFromStore('1', store, type, {});
        expect(res.result).toBe(true);
        expect(res.value).not.toBeFalsy();

        let v = res.value!;
        expect(Object.keys(v).length).toBe(8);
        expect(v.alias1).toBe('value1');
        expect(v.alias2).toBe(1);
        expect(v.alias3).toBe(null);
        expect(v.alias4).toBe(1);
        expect(v.alias5).toBe('1');
        expect(v.alias6).toBe('123123');
        expect(v.alias7).toBe(true);
        expect(v.alias8).toBe(false);
    });
});