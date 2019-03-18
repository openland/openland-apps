import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withAvailableRooms } from 'openland-web/api/withAvailableRooms';
import { AvailableRooms_rooms } from 'openland-api/Types';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
interface RoomsCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const RoomsCards = withAvailableRooms(
    withQueryLoader(props => {
        if (!props.data) {
            return null;
        }

        let noData =
            props.error ||
            props.data === undefined ||
            props.data.rooms === undefined ||
            props.data.rooms === null;

        (props as any).tagsCount(noData ? 0 : props.data.rooms.length);

        return (
            <>
                {!noData && (
                    <XContentWrapper withPaddingBottom={true}>
                        {props.data.rooms.map((room: AvailableRooms_rooms, key) => {
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
                            pageInfo={props.data.rooms.pageInfo}
                        /> */}
                    </XContentWrapper>
                )}
                {noData && <EmptySearchBlock text="No groups matches your search" />}
            </>
        );
    }),
) as React.ComponentType<RoomsCardsProps>;

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
