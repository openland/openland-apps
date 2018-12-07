"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processFile_1 = require("./processFile");
let code = `
import * as React from 'react';
import { makeNavigable, NavigableParentProps, NavigableChildProps } from './Navigable';
import { XViewProps, XView, XViewSelectedContext } from './XView';

export type XLink2Props = NavigableParentProps<XViewProps>;

export const XLink2 = makeNavigable<XViewProps>(class XLink2Inner extends React.Component<XViewProps & NavigableChildProps> {
    shouldComponentUpdate(nextProps: XViewProps & NavigableChildProps) {
        return this.props.active !== nextProps.active;
    }
    render() {
        let props = this.props;
        return (
            <XView
                as="a"
                cursor="pointer"
                selected={!!props.active}
                {...props}
            >
                <XViewSelectedContext.Provider value={!!props.active}>
                    {props.children}
                </XViewSelectedContext.Provider>
            </XView>
        );
    }
});
`;
describe('parser', () => {
    it('should parse', () => {
        let res = processFile_1.processFile(code);
        console.log(res);
    });
});
//# sourceMappingURL=parse.spec.js.map