import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Sliders', 'viewer', props => {
    return (
        <DevDocsScaffold title="Sliders">
            <XContent>
                <XVertical2>{}</XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
