import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { DevDocsScaffold } from './components/DevDocsScaffold';

export default withApp('UI Framework - Animations', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Animations">
            <XContent>
                <XVertical>
                    <XTitle>Animations</XTitle>
                    TODO
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});