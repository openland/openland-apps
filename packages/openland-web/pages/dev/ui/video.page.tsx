import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { VideoPreview } from 'openland-video/VideoPreview';
import { VideoTestRenderer } from 'openland-video/VideoTestRenderer';

export default withApp('Videos', ['super-admin', 'software-developer'], props => {
    return (
        <DevDocsScaffold title="Videos">
            <XView>
                <VideoTestRenderer name="sample" />
                <VideoPreview name="sample" />
            </XView>
        </DevDocsScaffold>
    );
});