"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processFile_1 = require("./utils/processFile");
const jsxstyleLoader = function (content) {
    this.callback(null, processFile_1.processFile(content));
    return;
};
exports.default = jsxstyleLoader;
//# sourceMappingURL=webpack.js.map