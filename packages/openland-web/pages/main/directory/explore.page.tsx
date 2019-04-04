import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { AvailableRooms_rooms } from 'openland-api/Types';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
import { useClient } from 'openland-web/utils/useClient';
interface RoomsCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const RoomsCards = (props: RoomsCardsProps) => {
    const client = useClient();
    const data = client.useAvailableRooms();
    if (!data) {
        return null;
    }

    let noData = data === undefined || data.rooms === undefined || data.rooms === null;

    props.tagsCount(noData ? 0 : data.rooms.length);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {data.rooms.map((room: AvailableRooms_rooms, key) => {
                        return (
                            <XRoomCard
                                key={key}
                                room={room as any}
                                path={'/directory/p/' + room.id}
                                isMember={room.membership === 'MEMBER'}
                            />
                        );
                    })}
                    {/* <PagePagination
                            currentRoute="/directory/explore"
                            pageInfo={data.rooms.pageInfo}
                        /> */}
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No groups matches your search" />}
        </>
    );
};

export default withApp('Explore', 'viewer', () => {
    let CardsComponent = ComponentWithSort({ Component: RoomsCards, queryToPrefix: true });
    return (
        <DirectoryNavigation
            title={'Explore'}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search groups'}
            noQueryText={'All groups'}
            hasQueryText={'Groups'}
        />
    );
});
