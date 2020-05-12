import * as React from 'react';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { XView } from 'react-mental';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { VolumeSpace } from './VolumeSpace';
import { VideoPeer, PeerMedia } from './VideoPeer';
import WatermarkLogo from 'openland-icons/watermark-logo.svg';
import WatermarkShadow from 'openland-icons/watermark-shadow.svg';
import { CallControls } from './CallControls';
import { useMessageModal } from './useMessageModal';
import { useAttachHandler } from 'openland-web/hooks/useAttachHandler';
import { useIncomingMessages } from './useIncomingMessages';
import { useRouteChange } from 'openland-web/hooks/useRouteChange';

const watermarkContainerstyle = css`
    will-change: transform;
    position: absolute;
    opacity: 0.72;
    z-index: 5;
    cursor: pointer;
    width: 180px;
    height: 80px;

    &:hover {
        opacity: 1;
    }
`;

const watermarkContainerSpaceStyle = css`
    pointer-events: none;
`;

const watermarkIconStyle = cx('x', css`
    position: absolute;
    top: 0;
    left: 0;
    width: 320px;
    height: 160px;
    pointer-events: none;
`);

export const CallModalConponent = React.memo((props: { chatId: string, calls: CallsEngine, client: OpenlandClient, ctx: XModalController, messenger: MessengerEngine, onAttach: (files: File[], cb?: () => void) => void }) => {
    let conference = props.client.useConference({ id: props.chatId }, { suspense: false });
    let currentMediaSession = props.calls.useCurrentSession();
    let mediaSession = React.useMemo(() => currentMediaSession!, []);
    let state = mediaSession.state.useValue();
    React.useEffect(() => {
        if (!currentMediaSession) {
            props.ctx.hide();
        }
    }, [mediaSession]);

    // layout video grid
    let peers = [...conference ? conference.conference.peers : []];
    let rotated = peers.length === 3;
    let slicesCount = peers.length < 3 ? 1 : peers.length < 9 ? 2 : 3;
    let slices: Conference_conference_peers[][] = [];
    let divider = slicesCount;
    while (divider) {
        let count = Math.ceil(peers.length / divider--);
        slices.unshift(peers.splice(peers.length - count, count));
    }

    let [layout, setLayout] = React.useState<'grid' | 'volume-space'>('grid');

    const [renderedMessages, handleItemAdded] = useIncomingMessages();

    React.useEffect(() => {
        // on message with linkm open it in iframe
        let ds = props.messenger.getConversation(props.chatId).dataSource;

        return ds.watch(
            {
                onDataSourceInited: (items) => {
                    //
                },
                onDataSourceLoadedMore: (items) => {
                    //
                },
                onDataSourceItemAdded: (item) => {
                    handleItemAdded(item);
                },
                onDataSourceLoadedMoreForward: (items) => {
                    // Nothing to do
                },
                onDataSourceItemRemoved: (item) => {
                    // Nothing to do
                },
                onDataSourceItemMoved: () => {
                    // Nothing to do
                },
                onDataSourceItemUpdated: (item) => {
                    // Nothing to do
                },
                onDataSourceCompleted: () => {
                    // Nothing to do
                },
                onDataSourceCompletedForward: () => {
                    // Nothing to do
                },
                onDataSourceScrollToKeyRequested: () => {
                    //
                }
            }
        );
    }, []);

    const room = conference?.conference?.room;
    const messageName = room && room.__typename === 'PrivateRoom' ? room?.user.name : room?.title;
    const showMessage = useMessageModal({
        chatId: props.chatId,
        userId: room && room.__typename === 'PrivateRoom' ? room.user.id : undefined,
        name: messageName,
        onAttach: props.onAttach,
        isPrivate: !!(room && room.__typename === 'PrivateRoom'),
        isChannel: !!(room && room.__typename === 'SharedRoom' && room.isChannel),
        membersCount: room && room.__typename === 'SharedRoom' ? room.membersCount : undefined,
    });

    useRouteChange((route, prevRoute) => {
        if (route.path !== prevRoute.path) {
            props.ctx.hide();
        }
    });

    return (
        <XView flexDirection="row" flexGrow={1} backgroundColor="gray" alignItems="stretch" position="relative">
            <XView flexDirection="row" flexGrow={1} flexShrink={1}>
                <XView flexDirection={rotated ? 'row' : 'column'} justifyContent="flex-start" flexGrow={1} flexShrink={1} position="relative">
                    {layout === 'grid' && slices.map((s, i) => (
                        <XView
                            key={`container-${i}`}
                            flexDirection={rotated ? 'column' : 'row'}
                            justifyContent="flex-start"
                            flexShrink={1}
                            flexGrow={1}
                        >
                            {s.map(p => {
                                let media: PeerMedia = { videoTrack: null, audioTrack: null, screencastTrack: null };
                                let isLocal = p.id === state.sender.id;
                                if (isLocal) {
                                    media = {
                                        videoTrack: state.sender.videoEnabled ? state.sender.videoTrack : null,
                                        audioTrack: state.sender.audioEnabled ? state.sender.audioTrack : null,
                                        screencastTrack: state.sender.screencastEnabled ? state.sender.screencastTrack : null,
                                    };
                                } else {
                                    media = { ...media, ...state.receivers[p.id] };
                                }
                                return <VideoPeer
                                    key={`peer-${p.id}`}
                                    peer={p}
                                    {...media}
                                    isLocal={isLocal}
                                    analyzer={mediaSession.analyzer}
                                />;
                            })}

                        </XView>
                    ))}
                    {layout === 'volume-space' && mediaSession && <VolumeSpace mediaSession={mediaSession} peers={[...conference ? conference.conference.peers : []]} />}
                </XView >
                {layout === 'grid' && renderedMessages}
                <CallControls
                    muted={!state.sender.audioEnabled}
                    cameraEnabled={state.sender.videoEnabled}
                    screenEnabled={state.sender.screencastEnabled}
                    spaceEnabled={layout === 'volume-space'}
                    onMinimize={props.ctx.hide}
                    onMute={() => mediaSession.setAudioEnabled(!state.sender.audioEnabled)}
                    onCameraClick={() => mediaSession.setVideoEnabled(!state.sender.videoEnabled)}
                    onScreenClick={() => mediaSession.setScreenshareEnabled(!state.sender.screencastEnabled)}
                    onSpaceClick={() => setLayout(prev => prev === 'volume-space' ? 'grid' : 'volume-space')}
                    onMessageClick={showMessage}
                    onEnd={() => {
                        props.ctx.hide();
                        props.calls.leaveCall();
                    }}
                />
            </XView>

            <div
                className={cx(watermarkContainerstyle, layout === 'volume-space' && watermarkContainerSpaceStyle)}
                onClick={props.ctx.hide}
            >
                <div className={watermarkIconStyle}>
                    <WatermarkLogo />
                </div>
                <div className={watermarkIconStyle}>
                    <WatermarkShadow />
                </div>
            </div>
        </XView >
    );
});

export const useVideoCallModal = (props: { chatId: string, calls: CallsEngine, client: OpenlandClient, messenger: MessengerEngine }) => {
    const onAttach = useAttachHandler({ conversationId: props.chatId });
    return React.useCallback(() =>
        showModalBox({ fullScreen: true, useTopCloser: false }, ctx => <CallModalConponent {...props} onAttach={onAttach} ctx={ctx} />),
        [props.chatId, props.messenger]
    );
};
