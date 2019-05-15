import * as React from 'react';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { useCheckPerf } from 'openland-web/pages/main/mail/components/Components';

export const MessageAnimationComponent = (props: {
    file: string;
    fileName?: string;
    width: number;
    height: number;
}) => {
    useCheckPerf({ name: 'MessageAnimationComponent' });
    let dimensions = layoutMedia(props.width, props.height);
    return (
        <video
            width={dimensions.width}
            height={dimensions.height}
            autoPlay={true}
            loop={true}
            muted={true}
            webkit-playsinline="true"
            playsInline={true}
        >
            <source
                src={'https://ucarecdn.com/' + props.file + '/gif2video/-/format/webm/image.gif'}
                type="video/webm"
            />
            <source
                src={'https://ucarecdn.com/' + props.file + '/gif2video/-/format/mp4/image.gif'}
                type="video/mp4"
            />
        </video>
    );
};
