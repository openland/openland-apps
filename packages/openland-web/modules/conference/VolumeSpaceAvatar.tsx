import * as React from 'react';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { MediaSessionVolumeSpace } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { cx, css } from 'linaria';
import { UAvatarProps, AvatarPlaceholder, AvatarImage, getPlaceholderIndex } from 'openland-web/components/unicorn/UAvatar';
import { VideoComponent } from './ScreenShareModal';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XView } from 'react-mental';

let AvatarItemStyle = css`
    will-change: transform;
   
    position: absolute;
    pointer-events: none;
`;
let AvatarMovableStyle = css`
    cursor: move;
    pointer-events: inherit;
    transition: none;
`;
let NoPointerEvents = css`
    pointer-events: none;
`;

let VolumeSpaceVideoStyle = css`
    position: relative;
    width: var(--video-size);
    height: var(--video-size);
    border-radius: 50%;
    background-color: var(--foregroundSecondary);
`;

let TransitionTransform = css`
    transition: transform linear 50ms;
`;

let colorProvider = css`
    display: flex;
    flex-grow: 1;
`;

interface SpaceAvatarProps extends Omit<UAvatarProps, 'size'> {
    boxSize: number;
    placeholderFontSize: number;
}

export const SpaceAvatar = React.memo<SpaceAvatarProps>(props => {
    const {
        title,
        titleEmoji,
        id,
        photo,
        uuid,
        boxSize,
        placeholderFontSize,
        ...other
    } = props;
    let content: any = undefined;
    if (photo || uuid) {
        if (photo && photo.startsWith('ph://')) {
            const phIndex = parseInt(photo.substr(5), 10) || 0;
            content = <AvatarPlaceholder {...props} fontSize={placeholderFontSize} index={phIndex} />;
        } else {
            content = <AvatarImage {...props} boxSize={boxSize} />;
        }
    } else {
        const phIndex = getPlaceholderIndex(id);
        content = <AvatarPlaceholder {...props} fontSize={placeholderFontSize} index={phIndex} />;
    }

    return (
        <XView
            height={boxSize}
            width={boxSize}
            {...other}
        >
            <div
                className={colorProvider}
                style={
                    {
                        width: boxSize,
                        height: boxSize,
                        userSelect: 'none',
                    } as React.CSSProperties
                }
            >
                <XView
                    width="100%"
                    height="100%"
                    borderRadius="50%"
                    overflow="hidden"
                >
                    {content}
                </XView>
            </div>
        </XView>
    );
});

let isSafari = canUseDOM && ((window as any).safari !== undefined);

export const VolumeSpaceAvatar = React.memo((props: Conference_conference_peers & { videoTrack: AppMediaStreamTrack | null, space: MediaSessionVolumeSpace, selfRef?: React.RefObject<HTMLDivElement>, peersCount: number }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    const isLocal = !!props.selfRef;
    let size = 128;
    let placeholderFontSize = 40;
    if (props.peersCount <= 3) {
        size = 192;
        placeholderFontSize = 60;
    } else if (props.peersCount <= 7) {
        size = 160;
        placeholderFontSize = 50;
    }
    React.useEffect(() => {
        // listen obj updates
        return props.space.peersVM.listenId(props.id, `peer_${props.id}`, peer => {
            if (containerRef.current) {
                let scale = peer.coords[2] / 2 + 0.5;

                containerRef.current.style.transform = `translate(${peer.coords[0]}px, ${peer.coords[1]}px) scale3d(${scale}, ${scale}, ${scale})`;
            }
        });
    }, []);

    return (
        <div
            className={cx(AvatarItemStyle, !isSafari && !isLocal && TransitionTransform, isLocal && AvatarMovableStyle)}
            ref={props.selfRef || containerRef}
            style={{ '--video-size': `${size}px` } as React.CSSProperties}
        >
            {!props.videoTrack &&
                <div className={NoPointerEvents}>
                    <SpaceAvatar
                        boxSize={size}
                        placeholderFontSize={placeholderFontSize}
                        id={props.user.id}
                        title={props.user.name}
                        photo={props.user.photo}
                    />
                </div>
            }
            {props.videoTrack && <VideoComponent track={(props.videoTrack as AppUserMediaTrackWeb).track} cover={true} mirror={isLocal} videoClass={VolumeSpaceVideoStyle} borderRadius={'50%'} />}
        </div>
    );
});
