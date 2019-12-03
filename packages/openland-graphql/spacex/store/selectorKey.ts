import { InputValue } from './../types';

function selectorValueKey(src: any): string {
    if (src === null) {
        return 'null';
    } else if (typeof src === 'string') {
        return '"' + src + '"';
    } else if (Array.isArray(src)) {
        return '[' + src.map((v) => selectorValueKey(v)).join(',') + ']';
    } else if (typeof src === 'object') {
        let keys = Object.keys(src);
        keys.sort();
        let vals: string[] = [];
        for (let k of keys) {
            vals.push(k + ':' + selectorValueKey(src[k]));
        }
        return '{' + vals.join(',') + '}';
    } else {
        return '' + src;
    }
}

function selectorInputValueKey(value: InputValue, queryArguments: any): string | null {
    if (value.type === 'int') {
        return value.value + ''; // Check type?
    } else if (value.type === 'float') {
        return value.value + ''; // Check type?        
    } else if (value.type === 'boolean') {
        return value.value + ''; // Check type?
    } else if (value.type === 'string') {
        return `"${value.value}"`;
    } else if (value.type === 'null') {
        return 'null';
    } else if (value.type === 'list') {
        return '[' + value.items.map((v) => selectorInputValueKey(v, queryArguments)).join(',') + ']';
    } else if (value.type === 'object') {

        // Read and sort all keys
        let keys = Object.keys(value.fields);
        keys.sort();

        // Calculate selector keys
        let fields: string[] = [];
        for (let k of keys) {
            let sk = selectorInputValueKey(value.fields[k] as InputValue, queryArguments);
            if (sk !== null /* Do not reduce condition */) {
                fields.push(k + ':' + sk);
            }
        }

        // Compute result
        return '{' + fields.join(',') + '}';
    } else if (value.type === 'reference') {
        let name = value.name;
        if (queryArguments[name] !== undefined) {
            return selectorValueKey(queryArguments[name]);
        } else {
            return null;
        }
    } else {
        throw Error('Unknown InputValue');
    }
}

export function selectorKey(name: string, fieldArguments: { [key: string]: InputValue }, queryArguments: any) {
    if (Object.keys(fieldArguments).length === 0) {
        return name;
    }
    let keys = Object.keys(fieldArguments);
    keys.sort();
    let values: string[] = [];
    for (let k of keys) {
        let sk = selectorInputValueKey(fieldArguments[k] as InputValue, queryArguments);
        if (sk !== null) {
            values.push(k + ':' + sk);
        }
    }
    if (values.length === 0) {
        return name;
    }
    return name + '(' + values.join(',') + ')';
}