import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { useClient } from 'openland-web/utils/useClient';
import CheckIcon from 'openland-icons/checked.svg';
import { SuggestedRooms_suggestedRooms_SharedRoom } from 'openland-api/Types';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XLoader } from 'openland-x/XLoader';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { Wrapper } from './components/wrapper';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { Title, Subtitle, AuthActionButton, FormLayout } from '../auth/components/authComponents';
import { TextStyles } from 'openland-web/utils/TextStyles';

const shadowWrapper = css`
    width: 100%;
    height: 112px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
`;

const shadowClassName = css`
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
`;

const CheckIconClassName = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background-color: var(--accentPrimary);
    flex-shrink: 0;
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
            paddingRight={18}
            paddingVertical={8}
            borderRadius={8}
            backgroundColor={'#fff'}
            hoverBackgroundColor="#F5F5F6"
            onClick={() => onSelect(room.id)}
        >
            <UAvatar photo={room.photo} title={room.title} id={room.id} />
            <XView flexDirection="column" flexGrow={1} flexShrink={1} marginLeft={16}>
                <XView {...TextStyles.Label1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" color="var(--foregroundPrimary)">
                    {room.title}
                </XView>
                <XView {...TextStyles.Densed} color="var(--foregroundSecondary)">
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
    isScrollable,
}: {
    rooms: SuggestedRooms_suggestedRooms_SharedRoom[];
    isMobile: boolean;
    onJoinChats?: Function;
    isScrollable: boolean;
}) => {
    const allRoomsIds = rooms.map(({ id }) => id);
    const [selectedIds, setSelectedIds] = React.useState<string[]>(allRoomsIds);

    React.useLayoutEffect(
        () => {
            setSelectedIds(rooms.map(({ id }) => id));
        },
        [rooms],
    );
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
        <XView flexGrow={1} flexShrink={1} marginTop={24}>
            <XView
                alignItems="stretch"
                alignSelf="center"
                maxWidth={isMobile ? '100%' : 352}
                width={isMobile ? '100%' : 352}
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
            {isScrollable ? (
                <div className={shadowWrapper}>
                    <AuthActionButton
                        text={joinButtonText}
                        loading={joinLoader}
                        marginTop={0}
                        onClick={join}
                        disable={!selectedLength}
                        zIndex={1}
                    />
                    <div className={shadowClassName} />
                </div>
            ) : (
                    <AuthActionButton
                        text={joinButtonText}
                        loading={joinLoader}
                        onClick={join}
                        disable={!selectedLength}
                    />
                )}
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
        return <XLoader loading={true} />;
    }

    const rooms: SuggestedRooms_suggestedRooms_SharedRoom[] = [];

    for (let i = 0; i < data.suggestedRooms.length; i++) {
        const room = data.suggestedRooms[i];
        if (room.__typename === 'SharedRoom') {
            rooms.push(room);
        }
    }
    const [isScrollable, setIsScrollable] = React.useState(false);
    React.useLayoutEffect(() => {
        if (document.body.scrollHeight > document.body.clientHeight) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, [data.suggestedRooms]);

    return (
        <Wrapper fullHeight={fullHeight}>
            <XDocumentHead title="Choose role" />
            <BackSkipLogo onBack={onBack} onSkip={onSkip} />
            <FormLayout marginTop={isScrollable ? 72 : undefined} marginBottom={isScrollable ? 130 : undefined}>
                <Title text="Chats for you" />
                <Subtitle text="Recommendations based on your answers" />

                <ChatsItemList isScrollable={isScrollable} onJoinChats={onJoinChats} rooms={rooms} isMobile={!!isMobile} />
            </FormLayout>
        </Wrapper>
    );
};
