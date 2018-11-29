import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Tables', 'viewer', props => {
    return (
        <DevDocsScaffold title="Tables">
            <XContent>
                <XVertical>
                    <XTitle>Tables</XTitle>
                    TODO
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
