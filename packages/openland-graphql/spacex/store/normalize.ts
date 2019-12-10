import { Selector, OutputType } from './../types';
import { OutputTypeObject } from '../types';
import { RecordValue, RecordSet, RecordValueReference } from './RecordStore';
import { selectorKey } from './selectorKey';

type RecordCollection = { [key: string]: { [key: string]: RecordValue } };

type NormalizeCtx = { collection: RecordCollection, queryArguments: any, root: any };

function buildSet(collection: RecordCollection): RecordSet {
    let keys = Object.keys(collection);
    let res: RecordSet = {};
    for (let k of keys) {
        res[k] = { key: k, fields: collection[k] };
    }
    return res;
}

function normalizeValue(parentCacheKey: string | null, value: OutputType, data: any, ctx: NormalizeCtx): RecordValue | null {
    if (value.type === 'notNull') {
        let res = normalizeValue(parentCacheKey, value.inner, data, ctx);
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
                items.push(normalizeValue(`${parentCacheKey}.${i}`, value.inner, data[i], ctx)!);
            }
            return { type: 'list', values: items };
        } else {
            for (let i = 0; i < data.length; i++) {
                normalizeValue(null, value.inner, data[i], ctx);
            }
            return null;
        }
    } else if (value.type === 'object') {
        return normalizeSelector(parentCacheKey, value.selectors, data, ctx);
    }

    throw Error('Unreachable code');
}

function normalizeSelector(parentCacheKey: string | null, selectors: Selector[], data: any, ctx: NormalizeCtx): RecordValueReference | null {
    let map: { [key: string]: RecordValue } | undefined = undefined;
    let id: string | null = null;
    if (data.id !== null && data.id !== undefined) {
        let v = data.id;
        id = '' + v;
    } else {
        id = parentCacheKey;
    }
    if (id !== null) {
        let ex = ctx.collection[id];
        if (ex) {
            map = ex;
        } else {
            map = {};
            ctx.collection[id] = map;
        }
    }

    for (let f of selectors) {
        if (f.type === 'field') {
            if (map) {
                let key = selectorKey(f.name, f.arguments, ctx.queryArguments);
                map[key] = normalizeValue(id! + '.' + key, f.fieldType, data[f.alias], ctx)!;
            } else {
                normalizeValue(null, f.fieldType, data[f.alias], ctx);
            }
        } else if (f.type === 'type-condition') {
            if (data.__typename === f.name) {
                normalizeSelector(parentCacheKey, f.fragmentType.selectors, data, ctx);
            }
        } else if (f.type === 'fragment') {
            normalizeSelector(parentCacheKey, f.fragmentType.selectors, data, ctx);
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

function normalizeRootSelector(rootCacheKey: string | null, selectors: Selector[], data: any, ctx: NormalizeCtx) {
    if (rootCacheKey !== null) {
        for (let f of selectors) {
            if (f.type !== 'field') {
                throw Error('Root query cant\'t contain fragments');
            }
            let key = selectorKey(f.name, f.arguments, ctx.queryArguments);
            let id = `${rootCacheKey}.${key}`;
            let refId = `${rootCacheKey}.\$ref.${key}`;
            let ex = ctx.collection[refId];
            let map: { [key: string]: RecordValue };
            if (!ex) {
                map = {};
                ctx.collection[refId] = map;
            } else {
                map = ex;
            }
            map.data = normalizeValue(id, f.fieldType, data[f.alias], ctx)!;
        }
    } else {
        normalizeSelector(null, selectors, data, ctx);
    }
}

export function normalizeData(id: string, type: OutputTypeObject, queryArguments: any, data: any): RecordSet {
    let collection: RecordCollection = {};
    normalizeSelector(id, type.selectors, data, { collection, root: data, queryArguments });
    return buildSet(collection);
}

export function normalizeResponse(rootCacheKey: string | null, type: OutputTypeObject, queryArguments: any, data: any): RecordSet {
    let collection: RecordCollection = {};
    normalizeRootSelector(rootCacheKey, type.selectors, data, { collection, root: data, queryArguments });
    return buildSet(collection);
}