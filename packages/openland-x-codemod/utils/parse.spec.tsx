import { processFile } from './processFile';

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
        let res = processFile(code);
        console.log(res);
    });
});