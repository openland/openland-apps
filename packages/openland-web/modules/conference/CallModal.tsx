import * as React from 'react';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { XView } from 'react-mental';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent, showVideoModal } from './ScreenShareModal';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';

const animatedAvatarStyle = css`
    position: absolute;
    z-index: 3;
`;

const compactAvatarStyle = css`
    top: 16px;
    left: 16px;
`;

const controlsStyle = css`
    position: absolute;
    z-index: 3;
    
    bottom: 16px;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: row;
    flex-grow: 1;
    justify-content: center;
`;

const borderStyle = css`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 3;
    pointer-events: none;
`;

const Controls = React.memo((props: { calls: CallsEngine }) => {
    let callState = props.calls.useState();
    return (
        <div className={controlsStyle} >
            <UButton
                flexShrink={0}
                style={callState.mute ? 'primary' : 'secondary'}
                text={callState.mute ? 'Unmute' : 'Mute'}
                onClick={() => props.calls.setMute(!callState.mute)}
                marginHorizontal={4}
            />
            <UButton
                flexShrink={0}
                style={callState.outVideo?.type === 'video' ? 'primary' : 'secondary'}
                text={'Video'}
                onClick={() => props.calls.switchVideo()}
                marginHorizontal={4}
            />
            <UButton
                flexShrink={0}
                style={callState.outVideo?.type === 'screen' ? 'primary' : 'secondary'}
                text={'Screen share'}
                onClick={() => props.calls.switchScreenShare()}
                marginHorizontal={4}
            />

        </div>
    );
});

const VideoPeer = React.memo((props: { mediaSession: MediaSessionManager, peer: Conference_conference_peers, calls: CallsEngine }) => {
    let [stream, setStream] = React.useState<MediaStream>();
    let streamManager = props.mediaSession.useStreamManager(props.peer.id);

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.peer.user.isYou) {
            return props.mediaSession.listenOutVideo(s => {
                setStream((s as AppUserMediaStreamWeb)?._stream);
            });
        } else {
            return streamManager?.listenContentStream(s => {
                if (s) {
                    setStream((s as AppUserMediaStreamWeb)?._stream);
                }
            });
        }

    }, [streamManager]);

    React.useEffect(() => {
        return props.mediaSession.analizer.subscribePeer(props.peer.id, v => {
            if (ref.current) {
                ref.current.style.border = v ? '2px solid white' : '';
            }
        });
    }, []);
    const onClick = React.useCallback(() => stream ? showVideoModal(stream) : undefined, [stream]);

    return (
        <XView backgroundColor="gray" alignItems="center" justifyContent="center" flexGrow={1} >
            {stream && <VideoComponent stream={stream} cover={true} onClick={onClick} />}
            <div key={'animtateing_wrapper'} className={cx(animatedAvatarStyle, stream && compactAvatarStyle)}>
                <UAvatar
                    size={stream ? 'large' : 'xxx-large'}
                    id={props.peer.user.id}
                    title={props.peer.user.name}
                    photo={props.peer.user.photo}
                />
            </div>
            {props.peer.user.isYou && <Controls calls={props.calls} />}
            <div ref={ref} className={borderStyle}/>
        </XView>
    );
});

export const CallModalConponent = React.memo((props: { chatId: string, calls: CallsEngine, client: OpenlandClient }) => {
    let conference = props.client.useConference({ id: props.chatId }, { suspense: false });
    props.calls.useState();

    let peers = conference ? conference.conference.peers : [];
    let peerSlice = peers.reduce((all, peer, i, array) => {
        let index =
            i === 1 ? 0
                : i === 2 && array.length > 3 ? 1
                    : i % 2;
        all[index].push(peer);
        return all;
    }, [[], []] as Conference_conference_peers[][]);
    const mediaSession = props.calls.getMediaSession();
    return (
        <XView flexDirection="column" justifyContent="flex-start" flexGrow={1}>
            {mediaSession && <>
                <XView key="container-1" flexDirection="row" justifyContent="flex-start" flexGrow={1}>{peerSlice[0].map(p => <VideoPeer key={`peer-${p.id}`} peer={p} mediaSession={mediaSession} calls={props.calls} />)}</XView>
                <XView key="container-2" flexDirection="row" justifyContent="flex-start" flexGrow={peerSlice[1].length ? 1 : 0}>{peerSlice[1].map(p => <VideoPeer key={`peer-${p.id}`} peer={p} mediaSession={mediaSession} calls={props.calls} />)}</XView>
            </>}
        </XView >
    );
});

export const showVideoCallModal = (props: { chatId: string, calls: CallsEngine, client: OpenlandClient }) => {
    showModalBox({ fullScreen: true }, ctx => <CallModalConponent {...props} />);
};