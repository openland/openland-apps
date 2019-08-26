import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { VideoPreview } from 'openland-video/VideoPreview';
import { AnimationSampleView } from 'openland-video/videos/AnimationSampleView';
import { XView } from 'react-mental';

export default withApp('Videos', 'viewer', props => {
    return (
        <DevDocsScaffold title="Videos">
            <XHorizontal>
                <XVertical>
                    <VideoPreview name="sample" />
                    <XView width={300} height={300}>
                        <AnimationSampleView />
                    </XView>
                </XVertical>
            </XHorizontal>
        </DevDocsScaffold>
    );
});