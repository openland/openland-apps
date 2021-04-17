import React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css, cx } from 'linaria';

import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useVoiceChatsFeed } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';
import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { TextLabel1, TextStyles, TextSubhead, TextTitle3 } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { NewRoomButton, NewRoomForm } from './NewRoom';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

import IcRooms from 'openland-icons/s/ic-mic-24.svg';
import IcDiscover from 'openland-icons/s/ic-discover-24.svg';
import IcListener from 'openland-icons/s/ic-listener-16.svg';
import IcSpeaker from 'openland-icons/s/ic-speaker-16.svg';
import { showModalBox } from 'openland-x/showModalBox';
import { useJoinRoom } from './joinRoom';
import { MessengerContext } from 'openland-engines/MessengerEngine';

type ActivePageType = 'Rooms' | 'Discover';

const artCrowdImg = css`
    width: 300px;
    height: 144px;
    background: url('https://cdn.openland.com/shared/art/art-crowd.png')  center center / contain no-repeat;
    background-image: -webkit-image-set(
        url('https://cdn.openland.com/shared/art/art-crowd.png') 1x,
        url('https://cdn.openland.com/shared/art/art-crowd@2x.png') 2x,
        url('https://cdn.openland.com/shared/art/art-crowd@3x.png') 3x
    );
`;

const roomTitle = css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
`;

const avatarsContainer = css`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    flex-shrink: 0;
    max-width: 92px;
`;

const startRoomContainer = css`
    background: var(--gradient100to0);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`;

const speakerNamesContainer = css`
  text-overflow: ellipsis;
  flex-shrink: 1;
  overflow: hidden;
  white-space: nowrap;
`;

const stubHeader = css`
  margin-top: 16px;
  color: var(--foregroundPrimary);
`;

const StartRoomItem = React.memo(() => {
    const startRoom = React.useCallback(async () => {
        showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, (ctx) => (
            <NewRoomForm ctx={ctx} />
        ));
    }, []);

    return (
        <div className={startRoomContainer}>
            <div className={artCrowdImg} />
            <div className={cx(TextTitle3, stubHeader)}>Talk about anything!</div>
            <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                Create a new room and invite friends
            </XView>
            <UButton
                text="Start room"
                size="medium"
                shape="round"
                paddingTop={24}
                onClick={startRoom}
            />
        </div>
    );
});

const RoomsFeedItem = React.memo((props: { voiceChat: VoiceChatWithSpeakers }) => {
    const { title, speakers, speakersCount, listenersCount, id } = props.voiceChat;
    const firstSpeakers = speakers.slice(0, 4);
    const joinRoom = useJoinRoom();
    let messenger = React.useContext(MessengerContext);
    let session = messenger.calls.useCurrentSession();

    return (
        <XView
            selected={session?.conversationId === id}
            paddingHorizontal={16}
            paddingVertical={12}
            cursor="pointer"
            hoverBackgroundColor="var(--backgroundPrimaryHover)"
            selectedBackgroundColor="var(--accentMuted)"
            selectedHoverBackgroundColor="var(--accentMutedHover)"
            selectedColor="var(--foregroundContrast)"
            onClick={() => joinRoom(id)}
        >
            <XView color="var(--foregroundPrimary)" selectedColor="var(--foregroundContrast)">
                <div className={cx(roomTitle, TextLabel1)}>{title}</div>
            </XView>
            <XView
                marginTop={8}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
            >
                <XView
                    flexShrink={1}
                    color="var(--foregroundSecondary)"
                    selectedColor="var(--foregroundContrast)"
                >
                    {firstSpeakers.map((speaker) => (
                        <div className={cx(TextSubhead, speakerNamesContainer)}>
                            {speaker.user.name}
                        </div>
                    ))}
                </XView>
                <div className={avatarsContainer}>
                    {firstSpeakers.reverse().map((speaker, i) => (
                        <XView marginLeft={12} marginTop={i > 1 ? 12 : 0}>
                            <UAvatar
                                id={speaker.id}
                                key={speaker.id}
                                title={speaker.user.name}
                                size="small"
                                photo={speaker.user.photo}
                            />
                        </XView>
                    ))}
                </div>
            </XView>
            <XView
                flexDirection="row"
                alignItems="center"
                marginTop={firstSpeakers.length > 2 ? 4 : 12}
                alignSelf="flex-start"
                color="var(--foregroundSecondary)"
                selectedColor="var(--foregroundContrast)"
            >
                <XView {...TextStyles.Subhead} marginRight={6}>
                    {speakersCount}
                </XView>
                <XView
                    color="var(--foregroundTertiary)"
                    selectedColor="var(--foregroundContrast)"
                >
                    <UIcon icon={<IcSpeaker />} color="currentColor" />
                </XView>
                {listenersCount > 0 && (
                    <>
                        <XView {...TextStyles.Subhead} marginLeft={15} marginRight={8}>
                            {listenersCount}
                        </XView>
                        <XView
                            color="var(--foregroundTertiary)"
                            selectedColor="var(--foregroundContrast)"
                        >
                            <UIcon icon={<IcListener />} color="currentColor" />
                        </XView>
                    </>
                )}
            </XView>
        </XView>
    );
});

const HomeMenu = (props: {
    activePage: ActivePageType;
    setActivePage: (t: ActivePageType) => void;
    ctx: UPopperController;
}) => {
    let res = new UPopperMenuBuilder();
    const router = React.useContext(XViewRouterContext)!;
    let messenger = React.useContext(MessengerContext);
    let ms = messenger.calls.useCurrentSession();

    res.item({
        title: 'Rooms',
        icon: <IcRooms />,
        action: () => {
            props.setActivePage('Rooms');
            if (ms) {
                router.navigate(`/room/${ms.conversationId}`, true);
            } else {
                router.navigate('/rooms', true);
            }
        },
        selected: props.activePage === 'Rooms',
    });
    res.item({
        title: 'Discover',
        icon: <IcDiscover />,
        action: () => {
            props.setActivePage('Discover');
            router.navigate('/discover', true);
        },
        selected: props.activePage === 'Discover',
    });
    return res.build(props.ctx, 240);
};

export const RoomsFragment = React.memo(() => {
    const voiceChats = useVoiceChatsFeed().chats;
    const [activeHomePage, setActiveHomePage] = React.useState<ActivePageType>('Rooms');
    const router = React.useContext(XRouterContext)!;

    const [menuVisible, menuShow] = usePopper(
        { placement: 'bottom-start', updatedDeps: activeHomePage },
        (ctx) => (
            <HomeMenu ctx={ctx} setActivePage={setActiveHomePage} activePage={activeHomePage} />
        ),
    );

    React.useEffect(() => {
        if (router.path.includes('/room') && activeHomePage !== 'Rooms') {
            setActiveHomePage('Rooms');
        } else if (router.path.includes('/discover') && activeHomePage !== 'Discover') {
            setActiveHomePage('Discover');
        }
    }, [router.path]);

    return (
        <XView
            width="100%"
            height="100%"
            flexDirection="column"
            alignItems="stretch"
            backgroundColor="var(--backgroundPrimary)"
        >
            <USideHeader title={{ title: activeHomePage, active: menuVisible, action: menuShow }}>
                <NewRoomButton />
            </USideHeader>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <UButton
                    text="🔥 Upcoming rooms"
                    size="large"
                    style="secondary"
                    marginTop={8}
                    marginBottom={12}
                    marginHorizontal={16}
                    onClick={() => window.open('https://www.notion.so/openland/Openland-Upcoming-Rooms-e2b80f28693c4fc788b9f269cc3346b0 ', '_blank')}
                />
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    {voiceChats.map(voiceChat => <RoomsFeedItem key={voiceChat.id} voiceChat={voiceChat} />)}
                    <StartRoomItem />
                </XScrollView3>
            </XView>
        </XView>
    );
});