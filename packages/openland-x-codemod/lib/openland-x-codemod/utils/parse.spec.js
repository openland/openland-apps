"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processFile_1 = require("./processFile");
let code = `
import * as React from 'react';
import { XView } from 'openland-x/XView';

export class TextView extends React.Component {
    render() {
        return <XView margin={10} flexDirection="column" />;
    }
}
`;
describe('parser', () => {
    it('should parse', () => {
        let res = processFile_1.processFile(code);
        console.log(res);
    });
});
//# sourceMappingURL=parse.spec.js.map