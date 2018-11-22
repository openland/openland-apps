import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Sliders', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Sliders">
            <XContent>
                <XVertical>
                    {}
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});