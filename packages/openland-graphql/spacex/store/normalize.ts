import { Selector, OutputType } from './../types';
import { OutputTypeObject } from '../types';
import { RecordValue, RecordSet, RecordValueReference } from './RecordStore';
import { selectorKey } from './selectorKey';

type RecordCollection = { [key: string]: { [key: string]: RecordValue } };

function buildSet(collection: RecordCollection): RecordSet {
    let keys = Object.keys(collection);
    let res: RecordSet = {};
    for (let k of keys) {
        res[k] = { key: k, fields: collection[k] };
    }
    return res;
}

function normalizeValue(parentCacheKey: string | null, collection: RecordCollection, value: OutputType, queryArguments: any, data: any): RecordValue | null {
    if (value.type === 'notNull') {
        let res = normalizeValue(parentCacheKey, collection, value.inner, queryArguments, data);
        if (res && res.type === 'null') {
            throw Error('Unexpected null value');
        } else {
            return res;
        }
    }
    if (data === null || data === undefined) {
        return { type: 'null' };
    }
    if (value.type === 'scalar') {
        if (parentCacheKey !== null) {
            if (value.name === 'String' || value.name === 'ID' || value.name === 'Date') {
                return { type: 'string', value: data + '' };
            } else if (value.name === 'Int' || value.name === 'Float') {
                if (typeof data === 'number') {
                    return { type: 'number', value: data };
                } else {
                    throw Error('Unexpected value for ' + value.name + ': ' + data);
                }
            } else if (value.name === 'Boolean') {
                if (typeof data === 'boolean') {
                    return { type: 'boolean', value: data };
                } else {
                    throw Error('Unexpected value for ' + value.name + ': ' + data);
                }
            } else {
                throw Error('Unsupported Scalar: ' + value.name);
            }
        } else {
            return null;
        }
    } else if (value.type === 'list') {
        if (!Array.isArray(data)) {
            throw Error('Invalid array');
        }
        if (parentCacheKey !== null) {
            let items: RecordValue[] = [];
            for (let i = 0; i < data.length; i++) {
                items.push(normalizeValue(`${parentCacheKey}.${i}`, collection, value.inner, queryArguments, data[i])!);
            }
            return { type: 'list', values: items };
        } else {
            for (let i = 0; i < data.length; i++) {
                normalizeValue(null, collection, value.inner, queryArguments, data[i]);
            }
            return null;
        }
    } else if (value.type === 'object') {
        return normalizeSelector(parentCacheKey, collection, value.selectors, queryArguments, data);
    }

    throw Error('Unreachable code');
}

function normalizeSelector(parentCacheKey: string | null, collection: RecordCollection, selectors: Selector[], queryArguments: any, data: any): RecordValueReference | null {
    let map: { [key: string]: RecordValue } | undefined = undefined;
    let id: string | null = null;
    if (data.id !== null && data.id !== undefined) {
        let v = data.id;
        id = '' + v;
    } else {
        id = parentCacheKey;
    }
    if (id !== null) {
        let ex = collection[id];
        if (ex) {
            map = ex;
        } else {
            map = {};
            collection[id] = map;
        }
    }

    for (let f of selectors) {
        if (f.type === 'field') {
            if (map) {
                let key = selectorKey(f.name, f.arguments, queryArguments);
                map[key] = normalizeValue(id! + '.' + key, collection, f.fieldType, queryArguments, data[f.alias])!;
            } else {
                normalizeValue(null, collection, f.fieldType, queryArguments, data[f.alias]);
            }
        } else if (f.type === 'type-condition') {
            if (data.__typename === f.name) {
                normalizeSelector(parentCacheKey, collection, f.fragmentType.selectors, queryArguments, data);
            }
        } else if (f.type === 'fragment') {
            normalizeSelector(parentCacheKey, collection, f.fragmentType.selectors, queryArguments, data);
        } else {
            throw Error('Unreachable code');
        }
    }

    if (id !== null) {
        return { type: 'reference', key: id };
    } else {
        return null;
    }
}

function normalizeRootSelector(rootCacheKey: string | null, collection: RecordCollection, selectors: Selector[], queryArguments: any, data: any) {
    if (rootCacheKey !== null) {
        for (let f of selectors) {
            if (f.type !== 'field') {
                throw Error('Root query cant\'t contain fragments');
            }
            let key = selectorKey(f.name, f.arguments, queryArguments);
            let id = `${rootCacheKey}.${key}`;
            let refId = `${rootCacheKey}.\$ref.${key}`;
            let ex = collection[refId];
            let map: { [key: string]: RecordValue };
            if (!ex) {
                map = {};
                collection[refId] = map;
            } else {
                map = ex;
            }
            map.data = normalizeValue(id, collection, f.fieldType, queryArguments, data[f.alias])!;
        }
    } else {
        normalizeSelector(null, collection, selectors, queryArguments, data);
    }
}

export function normalizeData(id: string, type: OutputTypeObject, queryArguments: any, data: any): RecordSet {
    let collection: RecordCollection = {};
    normalizeSelector(id, collection, type.selectors, queryArguments, data);
    return buildSet(collection);
}

export function normalizeResponse(rootCacheKey: string | null, type: OutputTypeObject, queryArguments: any, data: any): RecordSet {
    let collection: RecordCollection = {};
    normalizeRootSelector(rootCacheKey, collection, type.selectors, queryArguments, data);
    return buildSet(collection);
}