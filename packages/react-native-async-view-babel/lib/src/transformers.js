"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("@babel/types");
function processWrapper(name, src) {
    if (src === null) {
        return null;
    }
    if (src.type === 'StringLiteral') {
        return t.jsxExpressionContainer(t.callExpression(t.identifier('processColor'), [src]));
    }
    else if (src.type === 'JSXExpressionContainer') {
        return t.jsxExpressionContainer(t.callExpression(t.identifier('processColor'), [src.expression]));
    }
    // if (s2.type === 'JSXExpressionContainer') {
    //     s2 = s2.expression;
    // }
    return undefined;
}
const backgroundColorProcessor = {
    name: 'backgroundColor',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
};
const colorProcessor = {
    name: 'color',
    imports: [{ what: 'processColor', from: 'react-native' }],
    tranform: (src) => {
        return processWrapper('processColor', src);
    }
};
const backgroundGradientProcessor = {
    name: 'backgroundGradient',
    imports: [{ what: 'processGradient', from: 'react-native-async-view/utils/processGradient' }],
    tranform: (src) => {
        return processWrapper('processGradient', src);
    }
};
const flexTransformer = {
    name: 'ASFlex',
    asyncName: 'flex',
    blacklist: ['onPress', 'onLongPress'],
    propTransformers: [
        backgroundColorProcessor,
        backgroundGradientProcessor
    ]
};
const textTransformer = {
    name: 'ASText',
    asyncName: 'text',
    blacklist: ['onPress', 'onLongPress'],
    propTransformers: [
        backgroundColorProcessor,
        backgroundGradientProcessor,
        colorProcessor
    ]
};
exports.allTransformers = [flexTransformer, textTransformer];
//# sourceMappingURL=transformers.js.map