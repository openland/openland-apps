import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XView } from 'openland-x-layout/XView';

export default withApp('UI Framework - Scroll', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Scroll">
            <XContent>
                <XView width={200} height={500} css={{ backgroundColor: '#ff0000' }}>
                    {}
                </XView>
            </XContent>
        </DevDocsScaffold>
    );
});