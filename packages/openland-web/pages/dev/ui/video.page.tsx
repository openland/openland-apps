import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { VideoPreview } from 'openland-video/VideoPreview';

export default withApp('Videos', 'viewer', props => {
    return (
        <DevDocsScaffold title="Videos">
            <XHorizontal>
                <XVertical>
                    <VideoPreview name="sample" />
                </XVertical>
            </XHorizontal>
        </DevDocsScaffold>
    );
});