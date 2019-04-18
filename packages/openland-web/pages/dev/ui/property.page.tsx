import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Properties', 'viewer', props => {
    return (
        <DevDocsScaffold title="Properties">
            <XContent>
                <XVertical2>
                    <XTitle>Properties</XTitle>
                    TODO
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
