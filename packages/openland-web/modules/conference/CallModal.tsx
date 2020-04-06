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
import { XModalController } from 'openland-x/showModal';
import { USelect } from 'openland-web/components/unicorn/USelect';
import MediaDevicesManager from 'openland-web/utils/MediaDevicesManager';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { AppConfig } from 'openland-y-runtime/AppConfig';
import { DataSourceMessageItem, DataSourceDateItem, DataSourceNewDividerItem } from 'openland-engines/messenger/ConversationEngine';
import { YoutubeParty } from './YoutubeParty';
import { VolumeSpace } from './VolumeSpace';

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
    
    bottom: 24px;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
`;

const controlsContainerStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: center;

    padding: 8px 4px;
    background-color: var(--backgroundTertiary);
    border-radius: 24px;
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

const SettingsModal = React.memo((props: {}) => {
    let [devices, input, ouput, setInput, setOutput] = MediaDevicesManager.instance().useMediaDevices();

    let outputs = devices.filter(d => d.kind === 'audiooutput');
    let inputs = devices.filter(d => d.kind === 'audioinput');

    let setInputDevice = React.useCallback((val) => {
        let device = devices.find(d => d.deviceId === val.value);
        setInput(device);
    }, [devices]);
    let setOutputDevice = React.useCallback((val) => {
        let dev = devices.find(d => d.deviceId === val.value);
        setOutput(dev);
    }, [devices]);

    return (
        <XView height={500} justifyContent="flex-start">
            <XView paddingHorizontal={16} paddingVertical={8}>
                <USelect searchable={false} onChange={setInputDevice} placeholder="Microphone" value={input?.deviceId} options={inputs.map(o => ({ value: o.deviceId, label: o.label }))} />
            </XView>
            <XView paddingHorizontal={16} paddingVertical={8}>
                <USelect searchable={false} onChange={setOutputDevice} placeholder="Speakers" value={ouput?.deviceId} options={outputs.map(o => ({ value: o.deviceId, label: o.label }))} />
            </XView>
        </XView>
    );
});

const Controls = React.memo((props: {
    calls: CallsEngine,
    ctx: XModalController,
    showLink: boolean,
    setShowLink: (show: boolean) => void,
    layout: 'volume-space' | 'grid',
    setLayout: (layout: 'volume-space' | 'grid') => void
}) => {
    let callState = props.calls.useState();
    let showSettings = React.useCallback(() => {
        showModalBox({ title: 'Audio setting' }, () => <SettingsModal />);
    }, []);
    return (
        <div className={controlsStyle} >
            <div className={controlsContainerStyle}>
                <UButton
                    flexShrink={1}
                    style={callState.mute ? 'primary' : 'secondary'}
                    text={callState.mute ? 'Muted' : 'Mute'}
                    onClick={() => props.calls.setMute(!callState.mute)}
                    marginHorizontal={4}
                />
                <UButton
                    flexShrink={1}
                    style={callState.outVideo?.type === 'video' ? 'primary' : 'secondary'}
                    text={'Video'}
                    onClick={props.calls.switchVideo}
                    marginHorizontal={4}
                />
                <UButton
                    flexShrink={1}
                    style={callState.outVideo?.type === 'screen' ? 'primary' : 'secondary'}
                    text={'Screen share'}
                    onClick={props.calls.switchScreenShare}
                    marginHorizontal={4}
                />
                <UButton
                    flexShrink={1}
                    style={'danger'}
                    text={'Leave call'}
                    onClick={() => {
                        props.ctx.hide();
                        props.calls.leaveCall();
                    }}
                    marginHorizontal={4}
                />
                <UButton
                    flexShrink={1}
                    style={'secondary'}
                    text={'Minimize call'}
                    onClick={props.ctx.hide}
                    marginHorizontal={4}
                />
                <UButton
                    flexShrink={1}
                    style={'secondary'}
                    text={'Settings'}
                    onClick={showSettings}
                    marginHorizontal={4}
                />

                {AppConfig.isNonProduction() && <UButton
                    flexShrink={1}
                    style={'secondary'}
                    text={props.layout === 'grid' ? 'Grid' : 'Volume Space'}
                    onClick={() => props.setLayout(props.layout === 'grid' ? 'volume-space' : 'grid')}
                    marginHorizontal={4}
                />}

                {AppConfig.isNonProduction() && <UButton
                    flexShrink={1}
                    style={props.showLink ? 'primary' : 'secondary'}
                    text={'Link'}
                    onClick={() => props.setShowLink(!props.showLink)}
                    marginHorizontal={4}
                />}
            </div>
        </div>
    );
});

const VideoPeer = React.memo((props: { mediaSession: MediaSessionManager, peer: Conference_conference_peers, calls: CallsEngine }) => {
    let [stream, setStream] = React.useState<MediaStream>();
    const ref = React.useRef<HTMLDivElement>(null);
    const isLocal = props.peer.id === props.mediaSession.getPeerId();
    React.useEffect(() => {
        if (isLocal) {
            return props.mediaSession.listenOutVideo(s => {
                setStream((s as AppUserMediaStreamWeb)?._stream);
            });
        } else {
            return props.mediaSession.listenPeerVideo(props.peer.id, s => {
                setStream((s as AppUserMediaStreamWeb)?._stream);
            });
        }

    });

    React.useEffect(() => {
        return props.mediaSession.analizer.subscribePeer(props.peer.id, v => {
            if (ref.current) {
                ref.current.style.border = v ? '2px solid white' : '';
            }
        });
    }, []);
    const onClick = React.useCallback(() => stream ? showVideoModal(stream) : undefined, [stream]);

    return (
        <XView backgroundColor="gray" alignItems="center" justifyContent="center" flexGrow={1} flexBasis={1}>
            {stream && <VideoComponent stream={stream} cover={true} onClick={onClick} mirror={isLocal} />}
            <div key={'animtateing_wrapper'} className={cx(animatedAvatarStyle, stream && compactAvatarStyle)}>
                <UAvatar
                    size={stream ? 'large' : 'xxx-large'}
                    id={props.peer.user.id}
                    title={props.peer.user.name}
                    photo={props.peer.user.photo}
                />
            </div>
            <div ref={ref} className={borderStyle} />
        </XView>
    );
});

const LinkFrame = React.memo((props: { link?: string, mediaSession: MediaSessionManager }) => {
    const isYoutube = props.link?.includes('youtube') || props.link?.includes('youtu.be');
    return (
        isYoutube ? <YoutubeParty link={props.link!} mediaSession={props.mediaSession} /> :
            props.link ? <iframe width="100%" height="100%" src={props.link} /> : <XView width="100%" {...TextStyles.Title3} flexGrow={1} justifyContent={"center"} alignItems={"center"}>Send link to chat</XView>
    );
});

export const CallModalConponent = React.memo((props: { chatId: string, calls: CallsEngine, client: OpenlandClient, ctx: XModalController, messenger: MessengerEngine }) => {
    let conference = props.client.useConference({ id: props.chatId }, { suspense: false });
    let callState = props.calls.useState();
    React.useEffect(() => {
        if (callState.status === 'end') {
            props.ctx.hide();
        }
    }, [callState]);
    React.useEffect(() => {
        if (!props.calls.state.outVideo) {
            props.calls.switchVideo();
        }
    }, []);

    // layout video grid
    let peers = [...conference ? conference.conference.peers : []];
    let rotated = peers.length === 3;
    let slicesCount = peers.length < 3 ? 1 : peers.length < 9 ? 2 : 3;
    let slices: Conference_conference_peers[][] = [];
    let divider = slicesCount;
    while (divider) {
        let count = Math.ceil(peers.length / divider--);
        slices.unshift(peers.splice(peers.length - count, count));
        console.warn(count, peers.length);
    }
    const mediaSession = props.calls.getMediaSession();

    let [layout, setLayout] = React.useState<'grid' | 'volume-space'>('grid');

    // some fun - pick latest link from chat
    let [showLink, setShowLink] = React.useState(false);
    const [link, setLink] = React.useState<string | undefined>();
    React.useEffect(() => {
        if (!AppConfig.isNonProduction()) {
            return;
        }
        // on message with linkm open it in iframe
        let ds = props.messenger.getConversation(props.chatId).dataSource;
        let processItem = (item: DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem) => {
            if (item.type === 'message' && item.spans) {
                let span = item.spans.find(s => s.__typename === 'MessageSpanLink');
                let url = span?.__typename === 'MessageSpanLink' ? span.url : undefined;
                if (url) {
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
    return (
        <XView flexDirection="row" justifyContent="flex-start" flexGrow={1}>
            {<XView flexDirection={rotated ? 'row' : 'column'} justifyContent="flex-start" flexGrow={1} flexBasis={0} >
                {layout === 'grid' && mediaSession && slices.map((s, i) => (
                    <XView key={`container-${i}`} flexShrink={1} flexDirection={rotated ? 'column' : 'row'} justifyContent="flex-start" flexGrow={1}>{s.map(p => <VideoPeer key={`peer-${p.id}`} peer={p} mediaSession={mediaSession} calls={props.calls} />)}</XView>
                ))}
                {layout === 'volume-space' && mediaSession && <VolumeSpace mediaSession={mediaSession} peers={[...conference ? conference.conference.peers : []]} />}
                <Controls calls={props.calls} ctx={props.ctx} showLink={showLink} setShowLink={setShowLink} layout={layout} setLayout={setLayout} />
            </XView >}

            {mediaSession && showLink && (
                <XView flexGrow={0.5} flexBasis={0} alignItems="stretch">
                    <LinkFrame link={link} mediaSession={mediaSession} />
                </XView>
            )}
        </XView >
    );
});

export const showVideoCallModal = (props: { chatId: string, calls: CallsEngine, client: OpenlandClient, messenger: MessengerEngine }) => {
    showModalBox({ fullScreen: true }, ctx => <CallModalConponent {...props} ctx={ctx} />);
};