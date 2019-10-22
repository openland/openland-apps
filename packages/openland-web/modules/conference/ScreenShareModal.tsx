import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';

const VideoComponent = (props: { stream: MediaStream }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = props.stream;
            videoRef.current.onloadedmetadata = videoRef.current.play;
        }

    }, []);
    return <video ref={videoRef} />;
};

export const showVideoModal = (stream: MediaStream) => {
    showModalBox({ fullScreen: true }, ctx => <VideoComponent stream={stream} />);
};