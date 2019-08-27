import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { VideoPreview } from 'openland-video/VideoPreview';
import { VideoPreview2 } from 'openland-video/videos/components/VideoPreview2';
import { AnimationSampleView } from 'openland-video/videos/AnimationSampleView';

export default withApp('Videos', 'viewer', props => {
    return (
        <DevDocsScaffold title="Videos">
            <XHorizontal>
                <XVertical>
                    <VideoPreview name="sample" />
                    <VideoPreview2 width={300} height={300} duration={8000}>
                        <AnimationSampleView />
                    </VideoPreview2>
                </XVertical>
            </XHorizontal>
        </DevDocsScaffold>
    );
});