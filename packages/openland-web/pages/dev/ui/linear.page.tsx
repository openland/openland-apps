import Glamorous from 'glamorous';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical2 } from 'openland-x/XVertical2';

const Box = Glamorous.div({
    width: '100px',
    height: '100px',
    backgroundColor: '#ff0000',
});

export default withApp('UI Framework - Linear', 'viewer', props => {
    return (
        <DevDocsScaffold title="Tables">
            <XContent>
                <XVertical2>
                    <XTitle>Horizontal</XTitle>
                    <XHorizontal>
                        <Box />
                        <Box />
                        <Box />
                    </XHorizontal>
                    <XTitle>Vertical</XTitle>
                    <XVertical2>
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                        <Box />
                    </XVertical2>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
