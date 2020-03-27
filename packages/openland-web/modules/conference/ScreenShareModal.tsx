import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

const videoClass = css`
    position: absolute;
    width: 100%;
    height: 100%;

`;

const coverClass = css`
    object-fit: cover;
`;

export const VideoComponent = React.memo((props: { stream: MediaStream, cover?: boolean }) => {
    const videoRef1 = React.useRef<HTMLVideoElement>(null);
    const videoRef2 = React.useRef<HTMLVideoElement>(null);
    const swtch = React.useRef(false);
    React.useEffect(() => {
        let top = swtch.current ? videoRef1 : videoRef2;
        let bot = swtch.current ? videoRef2 : videoRef1;
        swtch.current = !swtch.current;
        if (top.current && bot.current) {
            top.current.srcObject = props.stream;
            top.current.onloadedmetadata = top.current.play;
            top.current.style.zIndex = '2';
            bot.current.style.zIndex = '1';
            bot.current.pause();
        }
    }, [props.stream]);
    return <XView width={'100%'} height={'100%'}>
        <video id={'video-1'} key={'video-1'} ref={videoRef1} className={cx(videoClass, props.cover && coverClass)} />
        <video id={'video-2'} key={'video-2'} ref={videoRef2} className={cx(videoClass, props.cover && coverClass)} />
    </XView>;
});

export const showVideoModal = (stream: MediaStream) => {
    showModalBox({ fullScreen: true }, ctx => <VideoComponent stream={stream} />);
};