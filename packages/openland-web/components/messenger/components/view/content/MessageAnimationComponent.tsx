import * as React from 'react';
import { layoutMedia } from './utils/MediaLayout';

export const MessageAnimationComponent = (props: { file: string, fileName?: string, width: number, height: number }) => {
    let dimensions = layoutMedia(props.width, props.height);
    return (
        <video width={dimensions.width} height={dimensions.height} autoPlay={true} loop={true} muted={true} webkit-playsinline="true" playsInline={true}>
            <source src={'https://ucarecdn.com/' + props.file + '/gif2video/-/format/webm/image.gif'} type="video/webm" />
            <source src={'https://ucarecdn.com/' + props.file + '/gif2video/-/format/mp4/image.gif'} type="video/mp4" />
        </video>
    );
};