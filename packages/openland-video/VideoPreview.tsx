import './all';
import * as React from 'react';
import { XView } from 'react-mental';
import { VideoRegistry } from './VideoRegistry';
import { VideoPreviewRenderer } from './VideoPreviewRenderer';

export const VideoPreview = React.memo((props: {
    name: string
}) => {
    const video = React.useMemo(() => VideoRegistry.resolve(props.name), []);
    return (
        <XView
            width={360}
            height={360}
            overflow="hidden"
        >
            <VideoPreviewRenderer width={360} height={360} duration={video.duration}>
                {video.el}
            </VideoPreviewRenderer>
        </XView>
    );
});