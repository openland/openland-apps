import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XView } from 'react-mental';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withAvailableRooms } from 'openland-web/api/withAvailableRooms';
import { AvailableRooms_rooms } from 'openland-api/Types';
import { EmptySearchBlock } from './components/EmptySearchBlock';
// import { PagePagination } from './components/PagePagination';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
interface RoomsCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
}

// export interface Room_room_SharedRoom {
//     __typename: "SharedRoom";
//     id: string;
//     kind: SharedRoomKind;
//     title: string;
//     photo: string;
//     socialImage: string | null;
//     description: string | null;
//     organization: Room_room_SharedRoom_organization | null;
//     membership: SharedRoomMembershipStatus;
//     role: RoomMemberRole;
//     membersCount: number | null;
//     members: Room_room_SharedRoom_members[];
//     requests: Room_room_SharedRoom_requests[] | null;
//     settings: Room_room_SharedRoom_settings;
//   }

// export interface AvailableRooms_rooms_SharedRoom {
//     __typename: "SharedRoom";
//     id: string;
//     kind: SharedRoomKind;
//     title: string;
//     photo: string;
//     membersCount: number | null;
//     membership: SharedRoomMembershipStatus;
//     organization: AvailableRooms_rooms_SharedRoom_organization | null;
//   }

// const RoomsCards1 = withAvailableRooms(
//     withQueryLoader(({ data: { rooms } }) => {
//         return (
//             <>
//                 {rooms
//                     .filter(v => v.__typename === 'SharedRoom')
//                     .map(v => v as AvailableRooms_rooms_SharedRoom)
//                     .filter((a, i, s) => s.findIndex(v => v.id === a.id) === i)
//                     .filter(v => v.membersCount && v.membersCount > 0)
//                     .sort((a, b) => {
//                         if (b.membersCount === a.membersCount) {
//                             return a.title.localeCompare(b.title);
//                         }
//                         return b.membersCount! - a.membersCount!;
//                     })
//                     .map(v => (
//                         <XView as="a" path={'/mail/' + v.id} key={v.id}>
//                             {v.title} ({v.membersCount + ''}/{v.membership})
//                         </XView>
//                     ))}
//             </>
//         );
//     }),
// );

export const RoomsCards = withAvailableRooms(
    withQueryLoader(props => {
        if (!props.data) {
            return null;
        }
        console.log(props);

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
                {noData && <EmptySearchBlock text="No rooms matches your search" />}
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
            searchPlaceholder={'Search rooms'}
            noQueryText={'All rooms'}
            hasQueryText={'Rooms'}
        />
    );
});
