import * as t from '@babel/types';

type PropsValue = t.JSXElement | t.JSXFragment | t.StringLiteral | t.JSXExpressionContainer | null;

export interface PropsTransformer {
    name: string;
    tranform: (src: PropsValue) => PropsValue | undefined;
    imports?: { what: string, from: string }[]
}

export interface Transformer {
    name: string;
    asyncName: string;
    blacklist: string[];
    propTransformers: PropsTransformer[];
}

export const flexTransformer: Transformer = {
    name: 'ASFlex',
    asyncName: 'flex',
    blacklist: ['onPress', 'onLongPress'],
    propTransformers: [{
        name: 'backgroundColor',
        imports: [{ what: 'processColor', from: 'react-native' }],
        tranform: (src) => {
            if (src === null) {
                return null;
            }

            if (src.type === 'StringLiteral') {
                return t.jsxExpressionContainer(t.callExpression(t.identifier('processColor'), [src]))
            } else if (src.type === 'JSXExpressionContainer') {
                return t.jsxExpressionContainer(t.callExpression(t.identifier('processColor'), [src.expression as t.Expression]))
            }
            // if (s2.type === 'JSXExpressionContainer') {
            //     s2 = s2.expression;
            // }
            return undefined;
        }
    }]
}

export const allTransformers = [flexTransformer];