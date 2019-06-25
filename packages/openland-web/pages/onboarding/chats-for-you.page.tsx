import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from './components/TopBar';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { css } from 'linaria';
import { BackSkipLogo } from './components/BackSkipLogo';
import { getPercentageOfOnboarding } from './utils';
import { useClient } from 'openland-web/utils/useClient';
import CheckIcon from 'openland-icons/checked.svg';
import { SuggestedRooms_suggestedRooms_SharedRoom } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';

const backgroundClassName = css`
    background: white;
    width: 100%;
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
    const allRoomsIds = rooms.map(({ id }) => id);

    return (
        <>
            <XView flexDirection="row" justifyContent="space-between" marginBottom={18}>
                <XView fontWeight={'600'} fontSize={17} color={'rgba(0, 0, 0, 0.5)'}>{`${
                    rooms.length
                } chats`}</XView>
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

            <XView marginTop={40} flexShrink={1} alignSelf="center">
                <XButton
                    text={selectedIds.length ? `Join ${selectedIds.length} chats` : `Join`}
                    style="primary"
                    size="default"
                    enabled={!!selectedIds.length}
                />
            </XView>
        </>
    );
};

export const ChatsForYou = () => {
    const client = useClient();
    const data = client.useSuggestedRooms();

    const rooms: SuggestedRooms_suggestedRooms_SharedRoom[] = [];

    for (let i = 0; i < data.suggestedRooms.length; i++) {
        const room = data.suggestedRooms[i];
        if (room.__typename === 'SharedRoom') {
            rooms.push(room);
        }
    }

    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Choose role" />
            <TopBar progressInPercents={getPercentageOfOnboarding(10)} />
            <XView marginBottom={12} marginTop={34}>
                <BackSkipLogo noLogo />
            </XView>

            <XView flexDirection="row" justifyContent="center" paddingBottom={76}>
                <XView flexDirection="column" alignSelf="center">
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
        </div>
    );
};

export default withApp('Home', 'viewer', () => {
    return <ChatsForYou />;
});
