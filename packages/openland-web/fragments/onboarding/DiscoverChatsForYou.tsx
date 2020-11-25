import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { BackSkipLogo } from 'openland-web/pages/components/BackSkipLogo';
import { useClient } from 'openland-api/useClient';
import { SuggestedRooms_suggestedRooms_SharedRoom } from 'openland-api/spacex.types';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XLoader } from 'openland-x/XLoader';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import {
    Wrapper,
    Title,
    Subtitle,
    AuthActionButton,
    FormLayout,
} from 'openland-web/pages/auth/components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { CheckComponent } from 'openland-web/components/unicorn/UCheckbox';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { plural } from 'openland-y-utils/plural';

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
    background-image: linear-gradient(to bottom, var(--transparent), var(--backgroundPrimary));
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
    const description = room.membersCount
        ? plural(room.membersCount, ['member', 'members'])
        : undefined;
    return (
        <UListItem
            useRadius={true}
            key={room.id}
            title={room.title}
            description={description}
            avatar={{ photo: room.photo, title: room.title, id: room.id }}
            onClick={() => onSelect(room.id)}
            rightElement={
                <XView marginRight={8}>
                    <CheckComponent squared={true} checked={isSelected} />
                </XView>
            }
        />
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

    useShortcuts({
        keys: ['Enter'],
        callback: () => {
            join();
        },
    });

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
                            onSelect={(id) => {
                                if (selectedIds.indexOf(id) === -1) {
                                    setSelectedIds([...selectedIds, id]);
                                } else {
                                    setSelectedIds(selectedIds.filter((item) => item !== id));
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
    onBack,
    onSkip,
    onJoinChats,
}: {
    onSkip?: (event: React.MouseEvent) => void;
    onBack: (event: React.MouseEvent) => void;
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
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = React.useState(false);
    React.useLayoutEffect(() => {
        if (!wrapperRef.current) {
            return;
        }
        if (wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
    }, [data.suggestedRooms]);

    return (
        <Wrapper ref={wrapperRef}>
            <XDocumentHead title="Choose role" />
            <BackSkipLogo onBack={onBack} onSkip={onSkip} />
            <FormLayout
                paddingTop={isScrollable ? 72 : undefined}
                paddingBottom={isScrollable ? 130 : undefined}
            >
                <Title text="Chats for you" />
                <Subtitle text="Recommendations based on your answers" />

                <ChatsItemList
                    isScrollable={isScrollable}
                    onJoinChats={onJoinChats}
                    rooms={rooms}
                    isMobile={!!isMobile}
                />
            </FormLayout>
        </Wrapper>
    );
};
