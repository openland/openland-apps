import '../../../globals';
import Glamorous from 'glamorous';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const Box = Glamorous.div({
    width: '100px',
    height: '100px',
    backgroundColor: '#ff0000'
});

export default withApp('UI Framework - Linear', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Tables">
            <XContent>
                <XVertical>
                    <XTitle>Horizontal</XTitle>
                    <XHorizontal>
                        <Box />
                        <Box />
                        <Box />
                    </XHorizontal>
                    <XTitle>Vertical</XTitle>
                    <XVertical>
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});