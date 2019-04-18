import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Animations', 'viewer', props => {
    return (
        <DevDocsScaffold title="Animations">
            <XContent>
                <XVertical2>
                    <XTitle>Animations</XTitle>
                    TODO
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
