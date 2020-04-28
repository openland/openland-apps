import * as React from 'react';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { XView } from 'react-mental';
import { UserShort } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent, showVideoModal } from './ScreenShareModal';
import { css, cx } from 'linaria';
import { UAvatar, getPlaceholderColorById } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import SpeakerIcon from 'openland-icons/s/ic-speaking-bold-16.svg';
import MutedIcon from 'openland-icons/s/ic-muted-bold-16.svg';
import { SvgLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';

const animatedAvatarStyle = css`
    position: absolute;
    z-index: 3;
`;

const peerInfo = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    z-index: 3;
    display: flex;
`;

const peerInfoGradient = css`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.32) 100%);
`;

const peerInfoCompact = css`
    padding: 0 16px 16px;
`;

const peerName = cx(
    TextLabel1,
    css`
        color: var(--foregroundContrast);
        margin-right: 8px;
    `
);

const peerIcon = css`
    display: flex;
    align-items: center;
    svg path {
        fill: var(--foregroundContrast);
    }
`;

const bgAvatar = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    overflow: hidden;
`;

const bgAvatarImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(32px);
    transform: scale(1.1);
`;

const bgAvatarGradient = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const bgAvatarOverlay = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--overlayMedium);
`;
export interface PeerMedia {
    isLocal?: boolean;
    videoTrack?: AppMediaStreamTrack | null;
    audioTrack?: AppMediaStreamTrack | null;
    screencastTrack?: AppMediaStreamTrack | null;
}
export interface VideoPeerProps extends PeerMedia {
    user: UserShort;
    // for settings view
    compact?: boolean;
}

export const VideoPeer = React.memo((props: VideoPeerProps) => {
    // @ts-ignore
    const [audioPaused, setAudioPaused] = React.useState<boolean | null>(false);
    // @ts-ignore
    const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);

    // const icon = props.callState.status !== 'connected' ? <SvgLoader size="small" contrast={true} />
    //     : talking ? <SpeakerIcon />
    //         : (isLocal ? props.callState.mute : audioPaused) ? <MutedIcon />
    //             : null;

    const bgSrc = props.user.photo ? props.user.photo : undefined;
    const bgColor = !props.user.photo ? getPlaceholderColorById(props.user.id) : undefined;

    let mainStreamWeb = props.screencastTrack ? props.screencastTrack : props.videoTrack;
    // @ts-ignore
    let miniStreamWeb = props.screencastTrack ? props.videoTrack : undefined;
    const onClick = React.useCallback(() => mainStreamWeb ? showVideoModal((mainStreamWeb as AppUserMediaTrackWeb).track) : undefined, [mainStreamWeb]);

    return (
        <XView
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            overflow="hidden"
            borderRadius={props.compact ? 8 : undefined}
            position="relative"

        >
            {mainStreamWeb && (
                <VideoComponent
                    track={(mainStreamWeb as AppUserMediaTrackWeb).track}
                    cover={!props.screencastTrack}
                    compact={props.compact}
                    onClick={onClick}
                    mirror={props.isLocal && !props.screencastTrack}
                    borderRadius={props.compact ? 8 : undefined}
                    backgroundColor="var(--overlayHeavy)"
                />
            )}
            {!mainStreamWeb && (
                <>
                    <div className={bgAvatar}>
                        {bgSrc ? (
                            <ImgWithRetry src={bgSrc} className={bgAvatarImg} />
                        ) : (
                                <div className={bgAvatarGradient} style={{ background: bgColor }} />
                            )}

                        <div className={bgAvatarOverlay} />
                    </div>
                    <div key={'animating_wrapper'} className={cx(animatedAvatarStyle)}>
                        <UAvatar
                            size={props.compact ? 'large' : 'xx-large'}
                            id={props.user.id}
                            title={props.user.name}
                            photo={props.user.photo}
                        />
                    </div>
                </>
            )}
            <div className={cx(peerInfo, props.compact && peerInfoCompact, mainStreamWeb && peerInfoGradient)}>
                {!props.compact && <div className={peerName}>{props.user.name}</div>}
                {/* {icon && (
                    <div className={peerIcon}>
                        {icon}
                    </div>
                )} */}
            </div>
            {props.compact && (
                <XView
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderWidth={1}
                    borderColor="var(--borderLight)"
                    borderRadius={8}
                    zIndex={2}
                />
            )}
        </XView>
    );
});
