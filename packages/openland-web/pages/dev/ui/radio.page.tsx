import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Radio Buttons', 'viewer', props => {
    return (
        <DevDocsScaffold title="Radio Buttons">
            <XContent>
                <XVertical2>
                    <XTitle>Radio Buttons</XTitle>
                    TODO
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
