"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const babelParser = tslib_1.__importStar(require("@babel/parser"));
const generator_1 = tslib_1.__importDefault(require("@babel/generator"));
function parse(src) {
    return babelParser.parse(src, {
        plugins: [
            'asyncGenerators',
            'classProperties',
            'dynamicImport',
            'functionBind',
            'jsx',
            'objectRestSpread',
            'typescript'
        ],
        sourceType: 'module'
    });
}
exports.parse = parse;
function generate2(ast) {
    return generator_1.default(ast, {
        quotes: 'single'
    }).code;
}
exports.generate2 = generate2;
//# sourceMappingURL=parse.js.map