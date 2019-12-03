import { RecordValueList } from './RecordStore';
import { obj, field, scalar, notNull, fragment, inline, list } from '../types';
import { normalizeData } from './normalize';

describe('normalize', () => {
    it('should parse String fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("String")),
            field("field2", "field2_alias", {}, notNull(scalar("String"))),
            field("field3", "field3_alias", {}, scalar("String"))
        );
        let cases = [
            '{"field1_alias":"1","field2_alias":"2","field3_alias":null}',
            '{"field1_alias":"1","field2_alias":"2"}'
        ];
        for (let c of cases) {
            let normalized = normalizeData('1', type, {}, JSON.parse(c));
            expect(Object.keys(normalized).length).toBe(1);
            expect(normalized['1']).not.toBeFalsy();

            let nr = normalized['1'];
            expect(Object.keys(nr.fields).length).toBe(3);
            expect(nr.fields.field1).not.toBeFalsy();
            expect(nr.fields.field2).not.toBeFalsy();
            expect(nr.fields.field3).not.toBeFalsy();

            expect(nr.fields.field1.type).toBe('string');
            expect((nr.fields.field1 as any).value).toBe('1');
            expect(nr.fields.field2.type).toBe('string');
            expect((nr.fields.field2 as any).value).toBe('2');
            expect(nr.fields.field3.type).toBe('null');
        }
    });
    it('should parse String fields from float', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("String")),
            field("field2", "field2_alias", {}, notNull(scalar("String"))),
            field("field3", "field3_alias", {}, scalar("String"))
        );
        let floatCase = '{"field1_alias":1.0,"field2_alias":2.0}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(3);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('string');
        expect((nr.fields.field1 as any).value).toBe('1');
        expect(nr.fields.field2.type).toBe('string');
        expect((nr.fields.field2 as any).value).toBe('2');
        expect(nr.fields.field3.type).toBe('null');
    });
    it('should parse String fields from integers', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("String")),
            field("field2", "field2_alias", {}, notNull(scalar("String"))),
            field("field3", "field3_alias", {}, scalar("String"))
        );
        let floatCase = '{"field1_alias":1,"field2_alias":2}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(3);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('string');
        expect((nr.fields.field1 as any).value).toBe('1');
        expect(nr.fields.field2.type).toBe('string');
        expect((nr.fields.field2 as any).value).toBe('2');
        expect(nr.fields.field3.type).toBe('null');
    });
    it('should parse String fields from booleans', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("String")),
            field("field2", "field2_alias", {}, notNull(scalar("String"))),
            field("field3", "field3_alias", {}, scalar("String"))
        );
        let floatCase = '{"field1_alias":true,"field2_alias":false}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(3);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('string');
        expect((nr.fields.field1 as any).value).toBe('true');
        expect(nr.fields.field2.type).toBe('string');
        expect((nr.fields.field2 as any).value).toBe('false');
        expect(nr.fields.field3.type).toBe('null');
    });

    it('should parse Boolean fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("Boolean")),
            field("field2", "field2_alias", {}, notNull(scalar("Boolean"))),
            field("field3", "field3_alias", {}, scalar("Boolean")),
            field("field4", "field4_alias", {}, scalar("Boolean"))
        );
        let floatCase = '{"field1_alias":true,"field2_alias":false,"field3_alias":null}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(4);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();
        expect(nr.fields.field4).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('boolean');
        expect((nr.fields.field1 as any).value).toBe(true);
        expect(nr.fields.field2.type).toBe('boolean');
        expect((nr.fields.field2 as any).value).toBe(false);
        expect(nr.fields.field3.type).toBe('null');
        expect(nr.fields.field4.type).toBe('null');
    });
    it('should parse Int fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("Int")),
            field("field2", "field2_alias", {}, notNull(scalar("Int"))),
            field("field3", "field3_alias", {}, scalar("Int")),
            field("field4", "field4_alias", {}, scalar("Int"))
        );
        let floatCase = '{"field1_alias":1,"field2_alias":2,"field3_alias":null}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(4);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();
        expect(nr.fields.field4).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('number');
        expect((nr.fields.field1 as any).value).toBe(1);
        expect(nr.fields.field2.type).toBe('number');
        expect((nr.fields.field2 as any).value).toBe(2);
        expect(nr.fields.field3.type).toBe('null');
        expect(nr.fields.field4.type).toBe('null');
    });

    it('should parse Float fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("Float")),
            field("field2", "field2_alias", {}, notNull(scalar("Float"))),
            field("field3", "field3_alias", {}, scalar("Float")),
            field("field4", "field4_alias", {}, scalar("Float"))
        );
        let floatCase = '{"field1_alias":1,"field2_alias":2,"field3_alias":null}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(4);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();
        expect(nr.fields.field4).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('number');
        expect((nr.fields.field1 as any).value).toBe(1);
        expect(nr.fields.field2.type).toBe('number');
        expect((nr.fields.field2 as any).value).toBe(2);
        expect(nr.fields.field3.type).toBe('null');
        expect(nr.fields.field4.type).toBe('null');
    });

    it('should parse ID fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("ID")),
            field("field2", "field2_alias", {}, notNull(scalar("ID"))),
            field("field3", "field3_alias", {}, scalar("ID")),
            field("field4", "field4_alias", {}, scalar("ID"))
        );
        let floatCase = '{"field1_alias":1,"field2_alias":"2","field3_alias":null}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(4);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();
        expect(nr.fields.field4).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('string');
        expect((nr.fields.field1 as any).value).toBe('1');
        expect(nr.fields.field2.type).toBe('string');
        expect((nr.fields.field2 as any).value).toBe('2');
        expect(nr.fields.field3.type).toBe('null');
        expect(nr.fields.field4.type).toBe('null');
    });

    it('should parse Date fields', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("Date")),
            field("field2", "field2_alias", {}, notNull(scalar("Date"))),
            field("field3", "field3_alias", {}, scalar("Date")),
            field("field4", "field4_alias", {}, scalar("Date"))
        );
        let floatCase = '{"field1_alias":1,"field2_alias":"2","field3_alias":null}';
        let normalized = normalizeData('1', type, {}, JSON.parse(floatCase));

        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(4);
        expect(nr.fields.field1).not.toBeFalsy();
        expect(nr.fields.field2).not.toBeFalsy();
        expect(nr.fields.field3).not.toBeFalsy();
        expect(nr.fields.field4).not.toBeFalsy();

        expect(nr.fields.field1.type).toBe('string');
        expect((nr.fields.field1 as any).value).toBe('1');
        expect(nr.fields.field2.type).toBe('string');
        expect((nr.fields.field2 as any).value).toBe('2');
        expect(nr.fields.field3.type).toBe('null');
        expect(nr.fields.field4.type).toBe('null');
    });
    it('should crash on invalid scalar name', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("DateTime")),
            field("field2", "field2_alias", {}, notNull(scalar("DateTime"))),
            field("field3", "field3_alias", {}, scalar("DateTime")),
            field("field4", "field4_alias", {}, scalar("DateTime"))
        );
        let cs = '{"field1_alias":1,"field2_alias":"2","field3_alias":null}';
        expect(() => normalizeData("1", type, {}, JSON.parse(cs))).toThrowError();
    });
    it('should crash on missing non-nullable value', () => {
        let type = obj(
            field("field1", "field1_alias", {}, scalar("String")),
            field("field2", "field2_alias", {}, notNull(scalar("String"))),
            field("field3", "field3_alias", {}, scalar("String")),
            field("field4", "field4_alias", {}, scalar("String"))
        );
        let cs = '{"field1_alias":1,"field2_alias":null,"field3_alias":null}';
        expect(() => normalizeData("1", type, {}, JSON.parse(cs))).toThrowError();
    });
    it('should detect correct ids', () => {
        let type = obj(
            field("id", "id", {}, scalar("ID")),
            field("value", "value", {}, scalar("String"))
        );
        let cases = ['{"id":"1","value":null}', '{"id":1,"value":null}'];
        for (let cs of cases) {
            let normalized = normalizeData("some-parent-id", type, {}, JSON.parse(cs));
            expect(Object.keys(normalized).length).toBe(1);
            expect(normalized['1']).not.toBeFalsy();
        }
    });
    it('should parse fragments', () => {
        let type = obj(
            field("id", "id", {}, scalar("ID")),
            field("value", "value", {}, scalar("String")),
            fragment("SomeValue", obj(
                field("value2", "value2", {}, scalar("String"))
            ))
        );

        let cases = [
            '{"id":"1","value":null,"value2":"2"}',
            '{"id":1,"value":null,"value2":"2"}',
            '{"__typename": "SomeType", "id":1,"value":null,"value2":"2"}', // Invalid __typename MUST NOT crash parsers
            '{"__typename": "SomeValue", "id":1,"value":null,"value2":"2"}'
        ];
        for (let cs of cases) {
            let normalized = normalizeData("some-parent-id", type, {}, JSON.parse(cs));
            expect(Object.keys(normalized).length).toBe(1);
            expect(normalized['1']).not.toBeFalsy();
            expect(Object.keys(normalized['1'].fields).length).toBe(3);
        }
    });
    it('should parse inline fragments', () => {
        let type = obj(
            field("id", "id", {}, scalar("ID")),
            field("value", "value", {}, scalar("String")),
            inline("SomeType", obj(
                field("value2", "value2", {}, scalar("String"))
            ))
        );
        let cases = ['{"__typename":"SomeType","id":"1","value":null,"value2":"2"}', '{"__typename":"SomeType","id":1,"value":null,"value2":"2"}'];
        let negativeCases = ['{"__typename":"SomeType2","id":"1","value":null,"value2":"2"}', '{"__typename":"SomeType2","id":1,"value":null,"value2":"2"}'];
        for (let cs of cases) {
            let normalized = normalizeData('some-parent-id', type, {}, JSON.parse(cs));
            expect(Object.keys(normalized).length).toBe(1);
            expect(normalized['1']).not.toBeFalsy();
            expect(Object.keys(normalized['1'].fields).length).toBe(3);
        }
        for (let cs of negativeCases) {
            let normalized = normalizeData('some-parent-id', type, {}, JSON.parse(cs));
            expect(Object.keys(normalized).length).toBe(1);
            expect(normalized['1']).not.toBeFalsy();
            expect(Object.keys(normalized['1'].fields).length).toBe(2);
        }
    });
    it('should parse lists', () => {
        let type = obj(
            field("list", "list", {}, list(list(scalar("String"))))
        );
        let cs = '{"list":[["1",null,"3"]]}';
        let normalized = normalizeData('1', type, {}, JSON.parse(cs));
        expect(Object.keys(normalized).length).toBe(1);
        expect(normalized['1']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(1);
        expect(nr.fields.list).not.toBeFalsy();
        expect(nr.fields.list.type).toBe('list');
        let lst = nr.fields.list as RecordValueList;
        expect(lst.values.length).toBe(1);
        let lst2 = lst.values[0] as RecordValueList;
        expect(lst2.values.length).toBe(3);
        expect(lst2.values[0].type).toBe('string');
        expect((lst2.values[0] as any).value).toBe('1');
        expect(lst2.values[1].type).toBe('null');
        expect((lst2.values[2] as any).value).toBe('3');
    });
    it('should parse lists of objects', () => {
        let type = obj(
            field("list", "list", {},
                list(obj(
                    field("value", "value", {}, scalar("String"))
                ))
            )
        );
        let cs = '{"list":[{"value":"1"},null,{"value":"3"}]}';
        let normalized = normalizeData('1', type, {}, JSON.parse(cs));
        expect(Object.keys(normalized).length).toBe(3);
        expect(normalized['1']).not.toBeFalsy();
        expect(normalized['1.list.0']).not.toBeFalsy();
        expect(normalized['1.list.1']).toBeFalsy();
        expect(normalized['1.list.2']).not.toBeFalsy();

        let nr = normalized['1'];
        expect(Object.keys(nr.fields).length).toBe(1);
        expect(nr.fields.list).not.toBeFalsy();
        expect(nr.fields.list.type).toBe('list');
        let lst = nr.fields.list as RecordValueList;
        expect(lst.values.length).toBe(3);
        expect(lst.values[0].type).toBe('reference');
        expect((lst.values[0] as any).key).toBe('1.list.0');
        expect(lst.values[1].type).toBe('null');
        expect(lst.values[2].type).toBe('reference');
        expect((lst.values[2] as any).key).toBe('1.list.2');
    });
});