import * as t from '@babel/types';

type PropsValue = t.JSXElement | t.JSXFragment | t.StringLiteral | t.JSXExpressionContainer | null;

export interface PropsTransformer {
    name: string;
    tranform: (src: PropsValue) => PropsValue;
    imports?: { what: string, from: string }[]
}

export interface Transformer {
    name: string;
    asyncName: string;
    blacklist: string[];
    propTransformers: PropsTransformer[];
}

export const flexTransformer: Transformer = {
    name: 'XView',
    asyncName: 'flex',
    blacklist: ['onPress', 'onLongPress', 'backgroundColor'],
    propTransformers: [{
        name: 'backgroundColor',
        imports: [{ what: 'processColor', from: 'react-native' }],
        tranform: (src) => {
            return src
        }
    }]
}

export const allTransformers = [flexTransformer];