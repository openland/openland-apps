"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexTransformer = {
    name: 'XView',
    asyncName: 'flex',
    blacklist: ['onPress', 'onLongPress', 'backgroundColor'],
    propTransformers: [{
            name: 'backgroundColor',
            imports: [{ what: 'processColor', from: 'react-native' }],
            tranform: (src) => {
                return src;
            }
        }]
};
exports.allTransformers = [exports.flexTransformer];
//# sourceMappingURL=transformers.js.map