"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("@babel/types");
exports.flexTransformer = {
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
        }]
};
exports.allTransformers = [exports.flexTransformer];
//# sourceMappingURL=transformers.js.map