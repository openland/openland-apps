import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';

export const VideoComponent = (props: { stream: MediaStream, videoClass?: string }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = props.stream;
            videoRef.current.onloadedmetadata = videoRef.current.play;
        }

    }, []);
    return <video ref={videoRef} className={props.videoClass} />;
};

export const showVideoModal = (stream: MediaStream) => {
    showModalBox({ fullScreen: true }, ctx => <VideoComponent stream={stream} />);
};