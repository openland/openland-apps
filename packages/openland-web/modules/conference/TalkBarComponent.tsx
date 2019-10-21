import * as React from 'react';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { ChatInfo } from 'openland-web/fragments/chat/types';
import { Conference_conference_peers } from 'openland-api/Types';
import { useStream, MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { css } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showVideoModal } from './ScreenShareModal';
import { AppConfig } from 'openland-y-runtime/AppConfig';

const animatedAvatarStyle = css`
    transition: transform 250ms cubic-bezier(.29, .09, .24, .99), filter 350ms cubic-bezier(.29, .09, .24, .99);
`;

export const CallPeer = (props: { peer: Conference_conference_peers, mediaSessionManager?: MediaSessionManager }) => {
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const mediaStream = useStream(props.mediaSessionManager, props.peer.id);
    var dataArray: Uint8Array;
    const isMe = props.peer.id === (props.mediaSessionManager && props.mediaSessionManager.getPeerId());
    // animate while speaking
    React.useEffect(() => {
        if (!mediaStream) {
            return;
        }
        let running = true;
        let remoteAnalyser: AnalyserNode;
        let inited = false;
        const init = () => {
            // damn you safari
            if (!(window as any).AudioContext) {
                return;
            }
            if (inited) {
                return;
            }
            let stream: MediaStream | undefined;
            if (isMe) {
                stream = (mediaStream.getStream() as any as AppUserMediaStreamWeb).getStream();
            } else if (mediaStream.getInStream()) {
                stream = (mediaStream.getInStream() as any as AppUserMediaStreamWeb).getStream();
            }
            if (!stream) {
                return;
            }
            inited = true;
            let remoteAudioContext = new AudioContext();
            let remoteAudioSource = remoteAudioContext.createMediaStreamSource(stream);
            // Used to retrieve frequency data
            remoteAnalyser = remoteAudioContext.createAnalyser();
            // remoteAnalyser.fftSize = 256;
            const bufferLength = remoteAnalyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            remoteAudioSource.connect(remoteAnalyser);
        };

        const render = () => {
            if (!running) {
                return;
            }
            init();
            if (remoteAnalyser && dataArray) {
                remoteAnalyser.getByteFrequencyData(dataArray);

                let speaking = Math.min(1, dataArray.reduce((res, x) => {
                    return res + x;
                }, 0) / dataArray.length / 10);
                if (speaking < 0.2) {
                    speaking = 0;
                }
                let scale = 1 + speaking * 0.4;
                if (isMe && mediaStream.getStream().muted) {
                    scale = 1;
                }
                if (avatarRef.current && mediaStream.getIceState() === 'connected') {
                    avatarRef.current.style.transform = `scale(${scale})`;
                }
            }
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        return () => {
            if (remoteAnalyser) {
                remoteAnalyser.disconnect();
            }
            if (avatarRef.current) {
                avatarRef.current.style.transform = '';
            }
            running = false;
        };
    }, [mediaStream]);

    // mark non connected
    React.useEffect(() => {
        if (!mediaStream || isMe) {
            return;
        }
        mediaStream.listenIceState(s => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = `grayscale(${s !== 'connected' ? 100 : 0}%)`;
            }
        });
        return () => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = '';
            }
        };
    }, [mediaStream]);

    const [contentStream, setContentStream] = React.useState<MediaStream>();
    React.useEffect(() => {
        if (!mediaStream) {
            return;
        }
        mediaStream.listenContentStream(s => {
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
                {!isMe && contentStream && <UButton marginLeft={8} text="view screen" onClick={joinScreen} />}
            </XView>
            <XView width={8} />
        </>
    );
};

export const TalkBarComponent = (props: { chat: ChatInfo }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.chat.id },
        { fetchPolicy: 'network-only' },
    );
    if (!data) {
        return null;
    }
    return (
        <XView height={0} alignSelf="stretch">
            <TalkWatchComponent id={data.conference.id} />
            {data.conference.peers.length !== 0 && (
                <>
                    <XView
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={2}
                        flexShrink={0}
                        paddingTop={8}
                        paddingBottom={8}
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#32bb78"
                        flexDirection="row"
                    >
                        {data.conference.peers.map(v => <CallPeer key={v.id} peer={v} mediaSessionManager={calls.getMediaSession()} />)}
                        {callState.conversationId === props.chat.id && (
                            <>
                                {AppConfig.isNonProduction() &&
                                    <>
                                        <XButton
                                            style="success"
                                            text={callState.screenSharing ? 'Stop' : 'Share screen'}
                                            onClick={() => calls.setScreenShare(!callState.screenSharing)}
                                        />
                                        <XView width={8} />
                                    </>
                                }
                                <XButton
                                    style="success"
                                    text={callState.mute ? 'Unmute' : 'Mute'}
                                    onClick={() => calls.setMute(!callState.mute)}
                                />
                                <XView width={8} />
                                <XButton
                                    style="success"
                                    text={
                                        callState.status === 'connecting' ? 'Connecting' : 'Leave'
                                    }
                                    onClick={() => calls.leaveCall()}
                                />
                            </>
                        )}
                        {callState.conversationId !== props.chat.id && (
                            <XButton
                                style="success"
                                text={callState.conversationId ? 'Leave' : 'Join'}
                                onClick={
                                    callState.conversationId
                                        ? () => calls.leaveCall()
                                        : () =>
                                            calls.joinCall(props.chat.id, props.chat.__typename === 'PrivateRoom', props.chat.__typename === 'PrivateRoom' ? { id: props.chat.user.id, title: props.chat.user.name, picture: props.chat.user.photo } : { id: props.chat.id, title: props.chat.title, picture: props.chat.photo })
                                }
                            />
                        )}
                    </XView>
                    )}
                </>
            )}
        </XView>
    );
};
