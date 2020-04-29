import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { CONTROLS_WIDTH } from './CallControls';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const videoClassName = css`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const videoCompact = css`
    border-radius: 8px;
`;

const coverClass = css`
    object-fit: cover;
`;

const mirrorClass = css`
    transform: rotateY(180deg);
`;

interface VideoComponent extends XViewProps {
    track: MediaStreamTrack;
    cover?: boolean;
    videoClass?: string;
    compact?: boolean;
    onClick?: () => void;
    mirror?: boolean;
    switching?: boolean;
}

export const VideoComponent = React.memo((props: VideoComponent) => {
    const { track, cover, videoClass, compact, mirror, switching, onClick, ...other } = props;
    const videoRef1 = React.useRef<HTMLVideoElement>(null);
    const videoRef2 = React.useRef<HTMLVideoElement>(null);
    const swtch = React.useRef(true);
    const stream = React.useMemo(() => {
        let res = new MediaStream();
        res.addTrack(track);
        return res;
    }, [track]);
    React.useEffect(() => {
        let top = swtch.current ? videoRef1 : videoRef2;
        let bot = swtch.current ? videoRef2 : videoRef1;
        if (switching) {
            swtch.current = !swtch.current;
        }
        if (top.current) {
            top.current.srcObject = stream;
            top.current.onloadedmetadata = top.current.play;
            top.current.style.zIndex = '2';
            if (bot.current) {
                bot.current.style.zIndex = '1';
                bot.current.pause();
            }
        }
    }, [stream]);
    return (
        <XView width={'100%'} height={'100%'} onClick={onClick} cursor={onClick ? 'pointer' : undefined} position="relative" {...other}>
            <video id={'video-1'} key={'video-1'} ref={videoRef1} className={cx(videoClassName, cover && coverClass, videoClass, mirror && mirrorClass, compact && videoCompact)} />
            {switching && <video id={'video-2'} key={'video-2'} ref={videoRef2} className={cx(videoClassName, cover && coverClass, videoClass, mirror && mirrorClass, compact && videoCompact)} />}
        </XView>
    );
});

export const showVideoModal = (track: MediaStreamTrack) => {
    showModalBox({ fullScreen: true }, ctx => <VideoComponent track={track} backgroundColor="var(--overlayTotal)" />);
};

const modalVideo = css`
    background-color: var(--overlayHeavy);
`;

export const VideoModal = React.memo((props: VideoComponent & { close: () => void }) => {
    const { close, ...other } = props;
    useShortcuts({
        keys: ['Escape'],
        callback: close,
    });
    React.useEffect(() => {
        return close;
    });
    return (
        <>
            <VideoComponent
                position="fixed"
                zIndex={4}
                top={0}
                left={0}
                width={`calc(100% - ${CONTROLS_WIDTH}px)`}
                videoClass={modalVideo}
                {...other}
            />
            <XView position="fixed" top={16} right={CONTROLS_WIDTH + 16} zIndex={5}>
                <UIconButton
                    defaultRippleColor="var(--overlayMedium)"
                    hoverRippleColor="var(--overlayLight)"
                    color="var(--foregroundContrast)"
                    icon={<IcClose />}
                    onClick={close}
                />
            </XView>
        </>
    );
});
