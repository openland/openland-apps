import { Selector, OutputType } from './../types';
import { RecordStore, Record, RecordValue } from './RecordStore';
import { OutputTypeObject } from '../types';
import { selectorKey } from './selectorKey';

function readValue(value: RecordValue, type: OutputType, store: RecordStore, variables: any): { result: boolean, value?: any } {
    if (type.type === 'scalar') {
        if (value.type === 'null') {
            return { result: true, value: null };
        } else if (type.name === 'String' || type.name === 'Date' || type.name === 'ID') {
            if (value.type === 'string') {
                return { result: true, value: value.value };
            } else {
                return { result: false };
            }
        } else if (type.name === 'Int' || type.name === 'Float') {
            if (value.type === 'number') {
                return { result: true, value: value.value };
            } else {
                return { result: false };
            }
        } else if (type.name === 'Boolean') {
            if (value.type === 'boolean') {
                return { result: true, value: value.value };
            } else {
                return { result: false };
            }
        } else {
            throw Error('Unknown scalar type: ' + type.name);
        }
    } else if (type.type === 'notNull') {
        if (value.type === 'null') {
            return { result: false };
        } else {
            return readValue(value, type.inner, store, variables);
        }
    } else if (type.type === 'list') {
        if (value.type === 'null') {
            return { result: true, value: null };
        } else if (value.type === 'list') {
            let rv: any[] = [];
            for (let v of value.values) {
                let r = readValue(v, type.inner, store, variables);
                if (!r.result) {
                    return { result: false };
                }
                rv.push(r.value!);
            }
            return { result: true, value: rv };
        } else {
            throw Error('Invalid record value');
        }
    } else if (type.type === 'object') {
        if (value.type === 'null') {
            return { result: true, value: null };
        } else if (value.type === 'reference') {
            return readSelectors(value.key, store, type.selectors, variables);
        } else {
            throw Error('Invalid record value');
        }
    }

    return { result: false };
}

function doReadSelectors(record: Record, fields: { [key: string]: any }, store: RecordStore, selectors: Selector[], variables: any): boolean {
    for (let f of selectors) {
        if (f.type === 'field') {
            let key = selectorKey(f.name, f.arguments, variables);
            if (record.fields[key] !== undefined) {
                let rv = readValue(record.fields[key], f.fieldType, store, variables);
                if (!rv.result) {
                    return false;
                }
                fields[f.alias] = rv.value;
            } else {
                return false;
            }
        } else if (f.type === 'type-condition') {
            if (record.fields.__typename && record.fields.__typename.type === 'string' && record.fields.__typename.value === f.name) {
                if (!doReadSelectors(record, fields, store, f.fragmentType.selectors, variables)) {
                    return false;
                }
            }
        } else if (f.type === 'fragment') {
            if (!doReadSelectors(record, fields, store, f.fragmentType.selectors, variables)) {
                return false;
            }
        }
    }
    return true;
}

function readSelectors(cacheKey: string, store: RecordStore, selectors: Selector[], variables: any): { result: boolean, value?: any } {
    let value = store.read(cacheKey);
    if (Object.keys(value.fields).length === 0) {
        return { result: false };
    }
    let fields: { [key: string]: any } = {};
    if (!doReadSelectors(value, fields, store, selectors, variables)) {
        return { result: false };
    }
    return { result: true, value: fields };
}

export function readFromStore(cacheKey: string, store: RecordStore, type: OutputTypeObject, variables: any): { result: boolean, value?: any } {
    return readSelectors(cacheKey, store, type.selectors, variables);
}

export function readRootFromStore(cacheKey: string, store: RecordStore, type: OutputTypeObject, variables: any): { result: boolean, value?: any } {
    let fields: { [key: string]: any } = {};
    for (let f of type.selectors) {
        if (f.type !== 'field') {
            throw Error('Root query cant\'t contain fragments');
        }
        let key = selectorKey(f.name, f.arguments, variables);
        let refId = cacheKey + '.$ref.' + key;
        let value = store.read(refId);
        if (value.fields.data === undefined) {
            return { result: false };
        }
        let rv = readValue(value.fields.data, f.fieldType, store, variables);
        if (!rv.result) {
            return { result: false };
        }
        fields[f.alias] = rv.value;
    }
    return { result: true, value: fields };
}