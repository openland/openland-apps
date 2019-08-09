import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
// import { UnimojiViewer } from 'openland-unimoji/UnimojiViewer';

export default withApp('Unimoji', 'viewer', props => {
    return (
        <DevDocsScaffold title="Unimoji">
            <XHorizontal>
                <XVertical>
                    {/* <UnimojiViewer /> */}
                </XVertical>
            </XHorizontal>
        </DevDocsScaffold>
    );
});