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

function processWrapper(name: string, src: PropsValue) {
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

const backgroundColorProcessor: PropsTransformer = {
    name: 'backgroundColor',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
}

const colorProcessor: PropsTransformer = {
    name: 'color',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
}

const tintColorProcessor: PropsTransformer = {
    name: 'tintColor',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
}

const backgroundGradientProcessor: PropsTransformer = {
    name: 'backgroundGradient',
    imports: [{ what: 'processGradient', from: 'react-native-async-view/utils/processGradient' }],
    tranform: (src) => {
        return processWrapper('processGradient', src);
    }
}

const backgroundPatchTintColorTransformer: PropsTransformer = {
    name: 'backgroundPatchTintColor',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
}

const flexTransformer: Transformer = {
    name: 'ASFlex',
    asyncName: 'flex',
    blacklist: ['onPress', 'onLongPress'],
    propTransformers: [
        backgroundColorProcessor,
        backgroundGradientProcessor,
        backgroundPatchTintColorTransformer
    ]
}

const textTransformer: Transformer = {
    name: 'ASText',
    asyncName: 'text',
    blacklist: ['onPress', 'onLongPress'],
    propTransformers: [
        backgroundColorProcessor,
        backgroundGradientProcessor,
        colorProcessor
    ]
}

export const allTransformers = [flexTransformer, textTransformer];