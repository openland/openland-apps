import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XView } from 'openland-x-layout/XView';
import { XScrollView } from 'openland-x/XScrollView';
import { XVertical } from 'openland-x-layout/XVertical';

const Box = Glamorous.div({
    width: '100px',
    height: '100px',
    backgroundColor: '#0000ff',
    margin: 8,
    flexShrink: 0
});

export default withApp('UI Framework - Scroll', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Scroll">
            <XContent>
                <XView css={{ backgroundColor: '#ff0000', width: 200, height: 500 }}>
                    <XScrollView width={200} height={500}>
                        <XVertical>
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                            <Box />
                        </XVertical>
                    </XScrollView>
                </XView>
            </XContent>
        </DevDocsScaffold>
    );
});