import { OperationDefinition } from './types';
// Output Type

export type OutputTypeNotNull = {
    type: 'notNull',
    inner: OutputType
};
export type OutputTypeList = {
    type: 'list',
    inner: OutputType
};
export type OutputTypeScalar = {
    type: 'scalar',
    name: String
};
export type OutputTypeObject = {
    type: 'object',
    selectors: Selector[]
};

export type OutputType =
    | OutputTypeNotNull
    | OutputTypeList
    | OutputTypeScalar
    | OutputTypeObject;

// Input Type

export type InputValueString = {
    type: 'string',
    value: string
};
export type InputValueInt = {
    type: 'int',
    value: number
};
export type InputValueFloat = {
    type: 'float',
    value: number
};
export type InputValueBoolean = {
    type: 'boolean',
    value: boolean
};
export type InputValueNull = {
    type: 'null'
};
export type InputValueList = {
    type: 'list',
    items: InputValue[]
};
export type InputValueObject = {
    type: 'object',
    fields: { [key: string]: InputValue };
};
export type InputValueReference = {
    type: 'reference',
    name: string;
};

export type InputValue =
    | InputValueString
    | InputValueInt
    | InputValueFloat
    | InputValueBoolean
    | InputValueNull
    | InputValueList
    | InputValueObject
    | InputValueReference;

// Selector Types

export type SelectorField = {
    type: 'field',
    name: string,
    alias: string,
    fieldType: OutputType,
    arguments: { [key: string]: InputValue }
};

export type SelectorFragment = {
    type: 'fragment',
    name: string,
    fragmentType: OutputTypeObject
};

export type SelectorTypeCondition = {
    type: 'type-condition',
    name: string,
    fragmentType: OutputTypeObject
};

export type Selector = SelectorField | SelectorFragment | SelectorTypeCondition;

// Primitive types

export function list(src: OutputType): OutputTypeList {
    return { type: 'list', inner: src };
}

export function notNull(src: OutputType): OutputTypeNotNull {
    return { type: 'notNull', inner: src };
}

export function scalar(name: string): OutputTypeScalar {
    return { type: 'scalar', name: name };
}

// Object type

export function obj(...selectors: Selector[]): OutputTypeObject {
    return { type: 'object', selectors: selectors };
}

export function field(name: string, alias: string, arg: { [key: string]: InputValue }, type: OutputType): SelectorField {
    return { type: 'field', name, alias, arguments: arg, fieldType: type };
}

export function inline(name: string, inner: OutputTypeObject): SelectorTypeCondition {
    return { type: 'type-condition', name, fragmentType: inner };
}

export function fragment(name: string, inner: OutputTypeObject): SelectorFragment {
    return { type: 'fragment', name, fragmentType: inner };
}

export function args(...fieldArgs: { name: string, value: InputValue }[]): { [key: string]: InputValue } {
    if (fieldArgs.length === 0) {
        return {};
    }
    let res: { [key: string]: InputValue } = {};
    for (let f of fieldArgs) {
        res[f.name] = f.value;
    }
    return res;
}

export function fieldValue(name: string, value: InputValue) {
    return { name, value };
}

// Input Values

export function refValue(name: string): InputValueReference {
    return { type: 'reference', name };
}

export function intValue(value: number): InputValueInt {
    return { type: 'int', value };
}

export function floatValue(value: number): InputValueFloat {
    return { type: 'float', value };
}

export function stringValue(value: string): InputValueString {
    return { type: 'string', value };
}

export function boolValue(value: boolean): InputValueBoolean {
    return { type: 'boolean', value };
}

export function listValue(...items: InputValue[]): InputValueList {
    return { type: 'list', items };
}

export function objectValue(...fields: { name: string, value: InputValue }[]): InputValueObject {
    let res: { [key: string]: InputValue } = {};
    for (let f of fields) {
        res[f.name] = f.value;
    }
    return { type: 'object', fields: res };
}

export interface OperationDefinition {
    name: string;
    body: string;
    kind: 'query' | 'mutation' | 'subscription';
    selector: OutputTypeObject;
}

export type Operations = { [key: string]: OperationDefinition };