import * as React from 'react';
import { withChatSearchChannels } from '../api/withChatSearchChannels';
import { XLoader } from 'openland-x/XLoader';
import { EmptyComponent } from './directory/RoomEmptyComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import {
    SearchCardsOrShowProfile,
    ComponentWithSort,
} from 'openland-web/pages/main/directory/components/DirectoryNavigation';

interface WithChatSearchRoomsProps {
    customButton?: any;
    CustomButtonComponent?: any;
    customMenu?: any;
    variables: {
        query: string;
        sort: string;
    };
    tagsCount: (n: number) => void;
}

export const Rooms = withChatSearchChannels(props => {
    const {
        data,
        error,
        tagsCount,
        customMenu,
        customButton,
        CustomButtonComponent,
    } = props as typeof props & WithChatSearchRoomsProps;

    if (!(data && data.items)) {
        return <XLoader loading={true} />;
    }

    if (
        !(
            error ||
            data === undefined ||
            data.items === undefined ||
            data.items === null ||
            data.items.edges.length === 0
        )
    ) {
        tagsCount(data.items.pageInfo.itemsCount);

        return (
            <XContentWrapper withPaddingBottom={true}>
                {data.items.edges.map(c => {
                    let room = c.node;

                    return (
                        <XRoomCard
                            customMenu={customMenu}
                            customButton={customButton}
                            CustomButtonComponent={CustomButtonComponent}
                            key={c.node.id}
                            room={room as any /* Sorry, universe */}
                            path={'/directory/p/' + room.id}
                            isMember={room.membership === 'MEMBER'}
                        />
                    );
                })}
            </XContentWrapper>
        );
    } else {
        tagsCount(0);

        return <EmptyComponent />;
    }
}) as React.ComponentType<WithChatSearchRoomsProps>;

export const RoomsWithSort = ComponentWithSort({ Component: Rooms });

export const RoomsExploreComponent = () => {
    return (
        <SearchCardsOrShowProfile
            CardsComponent={RoomsWithSort}
            searchPlaceholder={'Search groups'}
            noQueryText={'Featured groups'}
            hasQueryText={'Groups'}
            sortOptions={{
                label: 'Sort by',
                values: [
                    { label: 'Members count', value: 'membersCount' },
                    { label: 'Creation date', value: 'createdAt' },
                ],
            }}
        />
    );
};
