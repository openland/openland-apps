import * as React from 'react';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { ChatInfo } from 'openland-web/fragments/chat/types';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { useStreamManager, MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showVideoModal } from './ScreenShareModal';
import { AppConfig } from 'openland-y-runtime/AppConfig';

const animatedAvatarStyle = css`
    transition: transform 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        filter 350ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

interface CallPeerProps {
    peer: Conference_conference_peers;
    mediaSessionManager?: MediaSessionManager;
}

export const CallPeer = (props: CallPeerProps) => {
    let callState = React.useContext(MessengerContext).calls.useState();
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const mediaStream = useStreamManager(props.mediaSessionManager, props.peer.id);
    const isMe =
        props.peer.id === (props.mediaSessionManager && props.mediaSessionManager.getPeerId());
    // animate while speaking
    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (props.mediaSessionManager) {
            d = props.mediaSessionManager.analizer.subscribePeer(props.peer.id, (v) => {
                if (avatarRef.current) {
                    avatarRef.current.style.transform = `scale(${1 + v * 0.4})`;
                }
            });
        }
        return d;
    }, [props.mediaSessionManager, props.peer.id]);

    // mark non connected
    React.useEffect(() => {
        if (!mediaStream || isMe) {
            return;
        }
        mediaStream.listenIceState((s) => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = `grayscale(${
                    callState.conversationId && ['connected', 'completed'].indexOf(s) === -1
                        ? 100
                        : 0
                }%)`;
            }
        });
        return () => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = '';
            }
        };
    }, [mediaStream, callState.conversationId]);

    const [contentStream, setContentStream] = React.useState<MediaStream>();
    React.useEffect(() => {
        if (!mediaStream) {
            return;
        }
        mediaStream.listenContentStream((s) => {
            console.warn(s);
            let stream: MediaStream | undefined;
            if (s) {
                stream = (s as AppUserMediaStreamWeb)._stream;
            }
            setContentStream(stream);
        });
    }, [mediaStream]);
    const joinScreen = React.useCallback(() => {
        if (contentStream) {
            showVideoModal(contentStream);
        }
    }, [contentStream]);

    return (
        <>
            <XView flexDirection="row">
                <div className={animatedAvatarStyle} ref={avatarRef}>
                    <UAvatar
                        size="small"
                        id={props.peer.user.id}
                        title={props.peer.user.name}
                        photo={props.peer.user.photo}
                    />
                </div>
                {!isMe && contentStream && (
                    <UButton marginLeft={8} text="view screen" onClick={joinScreen} />
                )}
            </XView>
            <XView width={8} />
        </>
    );
};

const greenButtonStyle = css`
    background-color: var(--accentPositiveHover);
`;

const barContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #32bb78;
    overflow-x: scroll;
`;

const barContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-left: auto;
    margin-right: auto;
`;

export const TalkBarComponent = (props: { chat: ChatInfo }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useConference(
        { id: props.chat.id },
        { fetchPolicy: 'network-only', suspense: false },
    );
    if (!data) {
        return null;
    }
    return (
        <XView height={0} alignSelf="stretch">
            <TalkWatchComponent id={data.conference.id} />
            {data.conference.peers.length !== 0 && (
                <div className={barContainer}>
                    <div className={barContent}>
                        {data.conference.peers.map((v) => (
                            <CallPeer
                                key={v.id}
                                peer={v}
                                mediaSessionManager={calls.getMediaSession()}
                            />
                        ))}
                        {callState.conversationId === props.chat.id && (
                            <>
                                {AppConfig.isNonProduction() && (
                                    <UButton
                                        size="small"
                                        style="success"
                                        marginRight={8}
                                        text={
                                            callState.outVideo?.type === 'screen'
                                                ? 'Stop'
                                                : 'Share screen'
                                        }
                                        className={greenButtonStyle}
                                        onClick={() => calls.switchScreenShare()}
                                    />
                                )}
                                <UButton
                                    size="small"
                                    style="success"
                                    text={callState.mute ? 'Unmute' : 'Mute'}
                                    onClick={() => calls.setMute(!callState.mute)}
                                    className={greenButtonStyle}
                                    marginRight={8}
                                />
                                <UButton
                                    size="small"
                                    style="success"
                                    text={
                                        callState.status === 'connecting' ? 'Connecting' : 'Leave'
                                    }
                                    className={greenButtonStyle}
                                    onClick={() => calls.leaveCall()}
                                />
                            </>
                        )}
                        {callState.conversationId !== props.chat.id && (
                            <UButton
                                size="small"
                                style="success"
                                text={callState.conversationId ? 'Leave' : 'Join'}
                                onClick={
                                    callState.conversationId
                                        ? () => calls.leaveCall()
                                        : () =>
                                              calls.joinCall(
                                                  props.chat.id,
                                                  props.chat.__typename === 'PrivateRoom',
                                                  props.chat.__typename === 'PrivateRoom'
                                                      ? {
                                                            id: props.chat.user.id,
                                                            title: props.chat.user.name,
                                                            picture: props.chat.user.photo,
                                                        }
                                                      : {
                                                            id: props.chat.id,
                                                            title: props.chat.title,
                                                            picture: props.chat.photo,
                                                        },
                                              )
                                }
                            />
                        )}
                    </div>
                </div>
            )}
        </XView>
    );
};
