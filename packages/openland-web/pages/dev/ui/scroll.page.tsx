import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XScrollView } from 'openland-x/XScrollView';
import { XVertical } from 'openland-x-layout/XVertical';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XView } from 'react-mental';
import { XScrollView2 } from 'openland-x/XScrollView2';

const Box = Glamorous.div({
    width: '100px',
    height: '100px',
    backgroundColor: '#0000ff',
    margin: 8,
    flexShrink: 0,
});

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: 600,
    height: 600,
    backgroundColor: '#ff0000',
});

export default withApp('UI Framework - Scroll', 'viewer', props => {
    return (
        <DevDocsScaffold title="Scroll">
            <XContent>
                <Container>
                    <XView width={600} flexDirection="row">
                        <XScrollView width={200} height={600}>
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
                        <XScrollView2 width={200} height={600}>
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
                        </XScrollView2>
                        <XScrollView3 width={200} height={600}>
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
                        </XScrollView3>
                    </XView>
                </Container>
            </XContent>
        </DevDocsScaffold>
    );
});
