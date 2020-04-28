import * as React from 'react';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { OpenlandClient } from 'openland-api/spacex';
import { XView } from 'react-mental';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { css, cx } from 'linaria';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { DataSourceMessageItem, DataSourceDateItem, DataSourceNewDividerItem } from 'openland-engines/messenger/ConversationEngine';
import { YoutubeParty } from './YoutubeParty';
// import { VolumeSpace } from './VolumeSpace';
import { VideoPeer } from './VideoPeer';
import WatermarkLogo from 'openland-icons/watermark-logo.svg';
import WatermarkShadow from 'openland-icons/watermark-shadow.svg';
import { CallControls } from './CallControls';
import { useTriggerEvents } from './sounds/Effects';
import { useMessageModal } from './useMessageModal';
import { useAttachHandler } from 'openland-web/hooks/useAttachHandler';

const watermarkContainerstyle = css`
    will-change: transform;
    position: absolute;
    opacity: 0.72;
    z-index: 5;
    cursor:pointer;

    &:hover {
        opacity: 1;
    }
`;

const watermarkContainerSpaceStyle = css`
    pointer-events: none;
`;

const LinkFrame = React.memo((props: { link?: string, mediaSession: MediaSessionManager, messenger: MessengerEngine }) => {
    let url = props.link ? new URL(props.link) : undefined;
    const isYoutube = props.link?.includes('youtube') || props.link?.includes('youtu.be');
    // fun
    if (url?.hostname.includes('quizzz-game')) {
        url.searchParams.append('name', props.messenger.user.shortname || props.messenger.user.name);
    }
    return (
        isYoutube ? <YoutubeParty link={props.link!} mediaSession={props.mediaSession} /> :
            url ? <iframe width="100%" height="100%" src={url.toString()} /> : <XView width="100%" {...TextStyles.Title3} flexGrow={1} justifyContent={"center"} alignItems={"center"}>Send link to chat</XView>
    );
});

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

    // some fun 
    useTriggerEvents(mediaSession);

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

    // pick latest link from chat
    let [showLink, setShowLink] = React.useState(false);
    const [link, setLink] = React.useState<string | undefined>();
    React.useEffect(() => {
        // on message with linkm open it in iframe
        let ds = props.messenger.getConversation(props.chatId).dataSource;
        let processItem = (item: DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem) => {
            if (item.type === 'message' && item.spans) {
                let span = item.spans.find(s => s.__typename === 'MessageSpanLink');
                let url = span?.__typename === 'MessageSpanLink' ? span.url : undefined;
                // accept only fresh ones
                if (url && (new Date().getTime() - item.date < 1000 * 60 * 15)) {
                    setLink(url);
                    setShowLink(true);
                    return true;
                }
            }
            return false;
        };
        // check last 10 messages on start
        for (let i = 0; i < Math.min(10, ds.getSize() - 1); i++) {
            if (processItem(ds.getAt(i))) {
                break;
            }
        }
        return ds.watch(
            {
                onDataSourceInited: (items) => {
                    //
                },
                onDataSourceLoadedMore: (items) => {
                    //
                },
                onDataSourceItemAdded: (item) => {
                    processItem(item);
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
                    processItem(item);
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
    const [messageOpen, showMessage] = useMessageModal({
        chatId: props.chatId,
        name: messageName,
        onAttach: props.onAttach,
        isPrivate: !!(room && room.__typename === 'PrivateRoom'),
        isChannel: !!(room && room.__typename === 'SharedRoom' && room.isChannel),
        membersCount: room && room.__typename === 'SharedRoom' ? room.membersCount : undefined,
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
                                let rid = state.receiversIds[p.id];
                                let receiver = rid && state.receivers[rid] || {};
                                return <VideoPeer
                                    key={`peer-${p.id}`}
                                    user={p.user}
                                    {...receiver}
                                />;
                            })}

                        </XView>
                    ))}
                    {/* {layout === 'volume-space' && mediaSession && <VolumeSpace mediaSession={mediaSession} peers={[...conference ? conference.conference.peers : []]} />} */}
                </XView >
                <CallControls
                    muted={!state.sender.audioEnabled}
                    cameraEnabled={state.sender.videoEnabled}
                    screenEnabled={state.sender.screencastEnabled}
                    spaceEnabled={layout === 'volume-space'}
                    messageEnabled={messageOpen}
                    toolsEnabled={showLink}
                    onMinimize={props.ctx.hide}
                    onMute={() => mediaSession.setAudioEnabled(!state.sender.audioEnabled)}
                    onCameraClick={() => mediaSession.setVideoEnabled(!state.sender.videoEnabled)}
                    onScreenClick={() => state.sender.screencastEnabled ? mediaSession.startScreenShare() : mediaSession.stopScreenShare()}
                    onSpaceClick={() => setLayout(prev => prev === 'volume-space' ? 'grid' : 'volume-space')}
                    onMessageClick={showMessage}
                    onToolsClick={() => setShowLink(prev => !prev)}
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
                <XView position="absolute" top={0} left={0}>
                    <WatermarkLogo />
                </XView>
                <XView position="absolute" top={0} left={0}>
                    <WatermarkShadow />
                </XView>
            </div>

            {mediaSession && showLink && (
                <XView flexGrow={0.5} flexBasis={0} alignItems="stretch">
                    <LinkFrame link={link} mediaSession={mediaSession} messenger={props.messenger} />
                </XView>
            )}
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
