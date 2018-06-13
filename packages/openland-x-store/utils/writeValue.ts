import { checkName } from './checkName';
import { isIndex } from './isIndex';

function prepareObject(name: string) {
    let index = false;
    if (name.indexOf('.') >= 0) {
        index = isIndex(name.split('.', 1)[0]);
    } else {
        index = isIndex(name);
    }
    if (index) {
        return [] as any;
    } else {
        return {} as any;
    }
}

export function writeValue(data: any, name: string, value: any) {
    if (name.indexOf('.') >= 0) {
        let parts = name.split('.');
        let first = parts[0];
        let last = parts.slice(1).join('.');
        // Test for index
        if (isIndex(first)) {
            if (!Array.isArray(data)) {
                throw Error('Trying to write array value to the struct');
            }
            let index = parseInt(first, 10);
            if (!data[index]) {
                data[index] = prepareObject(last);
            }
            writeValue(data[index], last, value);
        } else {
            checkName(first);
            if (!data[first]) {
                data[first] = prepareObject(last);
            } else if (Array.isArray(data[first])) {
                throw Error('Trying to write struct value to the array');
            }
            writeValue(data[first], last, value);
        }
    } else {
        if (isIndex(name)) {
            if (!Array.isArray(data)) {
                throw Error('Trying to write array value to the struct');
            }
            data[parseInt(name, 10)] = value;
        } else {
            checkName(name);
            if (Array.isArray(data)) {
                throw Error('Trying to write struct value to the array');
            }

            // Convert undefined to null
            if (value === undefined) {
                data[name] = null;
            } else {
                data[name] = value;
            }
        }
    }
}