import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css, cx } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { useClient } from 'openland-web/utils/useClient';
import CheckIcon from 'openland-icons/checked.svg';
import { SuggestedRooms_suggestedRooms_SharedRoom } from 'openland-api/Types';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XLoader } from 'openland-x/XLoader';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { Wrapper } from './components/wrapper';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

const shadowClassName = css`
    margin: auto;
    width: 400px;
    height: 200px;
    position: absolute;
    bottom: -70px;
    left: 0;
    right: 0;
    pointer-events: none;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
`;

const mobileShadowClassName = css`
    bottom: -30px;
`;

const CheckIconClassName = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #1790ff;
`;

const ChatsItem = ({
    room,
    isSelected,
    onSelect,
}: {
    room: SuggestedRooms_suggestedRooms_SharedRoom;
    isSelected: boolean;
    onSelect: (a: string) => void;
}) => {
    return (
        <XView
            cursor="pointer"
            flexShrink={0}
            flexDirection="row"
            alignItems="center"
            paddingLeft={16}
            paddingRight={20}
            paddingVertical={8}
            borderRadius={8}
            backgroundColor={'#fff'}
            hoverBackgroundColor="#F5F5F6"
            onClick={() => onSelect(room.id)}
        >
            <UAvatar photo={room.photo} title={room.title} id={room.id} />
            <XView flexDirection="column" flexGrow={1} marginLeft={16}>
                <XView fontSize={15} fontWeight="600">
                    {room.title}
                </XView>
                <XView fontSize={14} color="rgba(0, 0, 0, 0.6)">
                    {`${room.membersCount} members`}
                </XView>
            </XView>
            {isSelected && (
                <div className={CheckIconClassName}>
                    <CheckIcon />
                </div>
            )}
        </XView>
    );
};

const ChatsItemList = ({
    rooms,
    isMobile,
    onJoinChats,
}: {
    rooms: SuggestedRooms_suggestedRooms_SharedRoom[];
    isMobile: boolean;
    onJoinChats?: Function;
}) => {
    const allRoomsIds = rooms.map(({ id }) => id);
    const [selectedIds, setSelectedIds] = React.useState<string[]>(allRoomsIds);

    React.useLayoutEffect(() => {
        setSelectedIds(rooms.map(({ id }) => id));
    }, [rooms]);
    const [joinLoader, setJoinLoader] = React.useState(false);
    let router = React.useContext(XRouterContext)!;

    const client = useClient();

    const join = async () => {
        setJoinLoader(true);
        await client.mutateRoomsJoin({ roomsIds: selectedIds });
        await router.push('/');
        if (onJoinChats) {
            onJoinChats();
        }
    };

    const selectedLength = selectedIds.length;

    let joinButtonText = 'Join';
    if (selectedLength === 1) {
        joinButtonText = 'Join 1 chat';
    } else if (selectedLength > 1) {
        joinButtonText = `Join ${selectedLength} chats`;
    }

    return (
        <XView flexGrow={1} flexShrink={1}>
            <XView
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={18}
                alignSelf="center"
                maxWidth={isMobile ? '100%' : 326}
                paddingHorizontal={18}
                width="100%"
            >
                <XView fontWeight={'600'} fontSize={17} color={'rgba(0, 0, 0, 0.5)'}>
                    {`${rooms.length} chats`}
                </XView>
                {allRoomsIds.length === selectedIds.length ? (
                    <XButton
                        text={`Clear`}
                        style="light"
                        size="default"
                        onClick={() => {
                            setSelectedIds([]);
                        }}
                    />
                ) : (
                        <XButton
                            text={`Select all`}
                            style="light"
                            size="default"
                            onClick={() => {
                                setSelectedIds(allRoomsIds);
                            }}
                        />
                    )}
            </XView>

            <XScrollView3 marginBottom={-110} flexGrow={1} flexShrink={1} alignItems="center">
                <XView
                    paddingBottom={150}
                    alignItems="stretch"
                    alignSelf="center"
                    maxWidth={isMobile ? '100%' : 350}
                    width={isMobile ? '100%' : 350}
                >
                    {rooms.map((room, key) => {
                        return (
                            <ChatsItem
                                key={key}
                                room={room}
                                isSelected={selectedIds.indexOf(room.id) !== -1}
                                onSelect={id => {
                                    if (selectedIds.indexOf(id) === -1) {
                                        setSelectedIds([...selectedIds, id]);
                                    } else {
                                        setSelectedIds(selectedIds.filter(item => item !== id));
                                    }
                                }}
                            />
                        );
                    })}
                </XView>
            </XScrollView3>
            <div className={cx(shadowClassName, isMobile && mobileShadowClassName)} />
            <XView flexShrink={0} alignSelf="center" zIndex={2}>
                <XButton
                    zIndex={2}
                    flexShrink={0}
                    text={joinButtonText}
                    style="primary"
                    size="large"
                    loading={joinLoader}
                    onClick={join}
                    enabled={!!selectedLength}
                />
            </XView>
        </XView>
    );
};

export const ChatsForYou = ({
    noTopBar,
    onBack,
    onSkip,
    fullHeight,
    onJoinChats,
}: {
    noTopBar?: boolean;
    onSkip: ((event: React.MouseEvent) => void) | null;
    onBack: (event: React.MouseEvent) => void;
    fullHeight?: boolean;
    onJoinChats?: Function;
}) => {
    const client = useClient();
    const isMobile = useIsMobile();

    const data = client.useSuggestedRooms({ fetchPolicy: 'network-only' });
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    if (!discoverDone.betaIsDiscoverDone) {
        return <XLoader />;
    }

    const rooms: SuggestedRooms_suggestedRooms_SharedRoom[] = [];

    for (let i = 0; i < data.suggestedRooms.length; i++) {
        const room = data.suggestedRooms[i];
        if (room.__typename === 'SharedRoom') {
            rooms.push(room);
        }
    }

    return (
        <Wrapper fullHeight={fullHeight}>
            <XDocumentHead title="Choose role" />
            {!noTopBar && <TopBar progressInPercents={getPercentageOfOnboarding(10)} />}
            <XView marginBottom={12}>
                <BackSkipLogo noLogo={true} onBack={onBack} onSkip={onSkip} />
            </XView>

            <XView
                alignItems="center"
                flexGrow={1}
                flexShrink={1}
                justifyContent="center"
                marginTop={isMobile ? 15 : 20}
                marginBottom={isMobile ? 30 : 70}
            >
                <XView flexDirection="column" alignSelf="stretch" flexGrow={1} flexShrink={1}>
                    <XView alignItems="center">
                        <XView fontSize={24} marginBottom={12}>
                            Chats for you
                        </XView>
                        <XView fontSize={16} marginBottom={40}>
                            Recommendations based on your answers
                        </XView>
                    </XView>

                    <ChatsItemList onJoinChats={onJoinChats} rooms={rooms} isMobile={!!isMobile} />
                </XView>
            </XView>
        </Wrapper>
    );
};
