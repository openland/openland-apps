import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { useClient } from 'openland-web/utils/useClient';
import CheckIcon from 'openland-icons/checked.svg';
import { SuggestedRooms_suggestedRooms_SharedRoom } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

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
            <XAvatar2 src={room.photo || undefined} title={room.title} id={room.id} size={40} />
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

const ChatsItemList = ({ rooms }: { rooms: SuggestedRooms_suggestedRooms_SharedRoom[] }) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [joinLoader, setJoinLoader] = React.useState(false);
    let router = React.useContext(XRouterContext)!;
    const allRoomsIds = rooms.map(({ id }) => id);
    const client = useClient();

    const join = async () => {
        setJoinLoader(true);
        await client.mutateRoomsJoin({ roomsIds: selectedIds });
        await router.push('/');
    };

    const selectedLength = selectedIds.length;

    let joinButtonText = 'Join';
    if (selectedLength === 1) {
        joinButtonText = 'Join 1 chat';
    } else if (selectedLength > 1) {
        joinButtonText = `Join ${selectedLength} chats`;
    }

    return (
        <>
            <XView
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                marginBottom={18}
                alignSelf="center"
            >
                <XView
                    fontWeight={'600'}
                    fontSize={17}
                    color={'rgba(0, 0, 0, 0.5)'}
                    marginRight={144}
                >
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

            <XScrollView3 marginBottom={-110} flexGrow={0} flexShrink={1} alignItems="center">
                <XView paddingBottom={150} alignItems="stretch" alignSelf="center" width={350}>
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
            <div className={shadowClassName} />
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
        </>
    );
};

export const ChatsForYou = () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const data = client.useSuggestedRooms();

    const rooms: SuggestedRooms_suggestedRooms_SharedRoom[] = [];

    for (let i = 0; i < data.suggestedRooms.length; i++) {
        const room = data.suggestedRooms[i];
        if (room.__typename === 'SharedRoom') {
            rooms.push(room);
        }
    }

    return (
        <XView backgroundColor="white" flexGrow={1} flexShrink={1} maxHeight="100vh">
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={getPercentageOfOnboarding(10)} />
            <XView marginBottom={12} marginTop={34}>
                <BackSkipLogo
                    noLogo
                    onBack={async () => {
                        await client.mutateBetaNextDiscoverReset();
                        await client.refetchDiscoverIsDone();
                        await client.refetchSuggestedRooms();

                        if (canUseDOM) {
                            window.history.back();
                        }
                    }}
                    onSkip={() => {
                        router.push('/');
                    }}
                />
            </XView>

            <XView
                alignItems="center"
                flexGrow={1}
                flexShrink={1}
                justifyContent="center"
                marginTop={20}
                marginBottom={70}
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

                    <ChatsItemList rooms={rooms} />
                </XView>
            </XView>
        </XView>
    );
};

export default withApp('Home', 'viewer', () => {
    return <ChatsForYou />;
});
