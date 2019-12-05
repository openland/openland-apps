import { RecordStore, RecordValue } from './RecordStore';
import { OutputTypeObject, OutputType, Selector } from './../types';
import { selectorKey } from './selectorKey';

function collectMissingKeysFromSelectors(cacheKey: string, store: RecordStore, selectors: Selector[], variables: any, res: Set<string>) {
    if (!store.isInMemory(cacheKey)) {
        res.add(cacheKey);
        return;
    }
    let record = store.read(cacheKey);

    for (let f of selectors) {
        if (f.type === 'field') {
            let key = selectorKey(f.name, f.arguments, variables);
            if (record.fields[key] !== undefined) {
                collectMissingKeysFromValue(record.fields[key], f.fieldType, store, variables, res);
            }
        } else if (f.type === 'type-condition') {
            if (record.fields.__typename && record.fields.__typename.type === 'string' && record.fields.__typename.value === f.type) {
                collectMissingKeysFromSelectors(cacheKey, store, f.fragmentType.selectors, variables, res);
            }
        } else if (f.type === 'fragment') {
            collectMissingKeysFromSelectors(cacheKey, store, f.fragmentType.selectors, variables, res);
        } else {
            throw Error('Unreachable code');
        }
    }
}

function collectMissingKeysFromValue(value: RecordValue, type: OutputType, store: RecordStore, variables: any, res: Set<string>) {
    if (type.type === 'scalar') {
        return;
    } else if (type.type === 'notNull') {
        if (value.type !== 'null') {
            collectMissingKeysFromValue(value, type.inner, store, variables, res);
        }
    } else if (type.type === 'list') {
        if (value.type === 'list') {
            for (let v of value.values) {
                collectMissingKeysFromValue(v, type.inner, store, variables, res);
            }
        } else if (value.type !== 'null') {
            throw Error('Invalid record value');
        }
    } else if (type.type === 'object') {
        if (value.type === 'reference') {
            collectMissingKeysFromSelectors(value.key, store, type.selectors, variables, res);
        } else if (value.type !== 'null') {
            throw Error('Invalid record value');
        }
    }
}

export function collectMissingKeysRoot(rootCacheKey: string, store: RecordStore, type: OutputTypeObject, variables: any): Set<string> {
    let res = new Set<string>();
    for (let f of type.selectors) {
        if (f.type !== 'field') {
            throw Error('Root query cant\'t contain fragments');
        }
        let key = selectorKey(f.name, f.arguments, variables);
        let refId = rootCacheKey + '.$ref.' + key;
        if (!store.isInMemory(refId)) {
            res.add(refId);
        } else {
            let value = store.read(refId);
            let ex = value.fields.data;
            if (ex) {
                collectMissingKeysFromValue(ex, f.fieldType, store, variables, res);
            }
        }
    }
    return res;
}