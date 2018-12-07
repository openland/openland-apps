"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parse_1 = require("./parse");
const traverse_1 = tslib_1.__importDefault(require("@babel/traverse"));
const createTraversal_1 = require("./createTraversal");
function processFile(content) {
    let res = parse_1.parse(content);
    traverse_1.default(res, createTraversal_1.createTraversal());
    return parse_1.generate2(res);
}
exports.processFile = processFile;
//# sourceMappingURL=processFile.js.map