import { RecordStore, Record } from './RecordStore';
describe('RecordStore', () => {
    it('should merge', () => {
        let store = new RecordStore();
        let record1: Record = {
            key: 'key1',
            fields: {
                field1: { type: 'string', value: 'value1' },
                field2: { type: 'boolean', value: true },
                field3: { type: 'boolean', value: false },
                field4: { type: 'string', value: 'value3' },
                field5: { type: 'number', value: 0 },
                field6: { type: 'null' },
            }
        };
        let record2: Record = {
            key: 'key1',
            fields: {
                field1: { type: 'string', value: 'value2' },
            }
        };
        let record3: Record = {
            key: 'key1',
            fields: {
                field1: { type: 'null' },
            }
        };

        // Initial merge
        store.loadedRecord({ key: 'key1', fields: {} });
        let changes = store.mergeRecord(record1);
        expect(Object.keys(changes).length)
            .toBe(1);
        // XCTAssertTrue(Set<String>(["field1", "field2", "field3", "field4", "field5", "field6"]) == changes["key1"]!.fields)

        // Double merge
        changes = store.mergeRecord(record1);
        expect(Object.keys(changes).length)
            .toBe(0);

        // Update string
        changes = store.mergeRecord(record2);
        expect(Object.keys(changes).length)
            .toBe(1);
        // XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields) 

        // Update string to null
        changes = store.mergeRecord(record3);
        expect(Object.keys(changes).length)
            .toBe(1);
        // XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields) 

        changes = store.mergeRecord(record1);
        expect(Object.keys(changes).length)
            .toBe(1);
        // XCTAssertTrue(Set<String>(["field1"]) == changes["key1"]!.fields) 
    });
});