import * as React from 'react';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import {
    SearchCardsOrShowProfile,
    ComponentWithSort,
} from 'openland-web/fragments/discover/components/DiscoverNavigation';
import { useClient } from 'openland-web/utils/useClient';
import { EmptySearchBlock } from './EmptySearchBlock';

interface WithChatSearchRoomsProps {
    customButton?: any;
    CustomButtonComponent?: any;
    customMenu?: any;
    variables: {
        query: string;
        sort: string;
    };
    tagsCount: (n: number) => void;
    notFoundText: string;
}

const Rooms = (props: WithChatSearchRoomsProps) => {
    const client = useClient();
    const { tagsCount, customMenu, customButton, CustomButtonComponent } = props;
    const data = client.useRoomSearch(props.variables, {
        fetchPolicy: 'cache-and-network',
    });

    if (!data) {
        tagsCount(0);

        return <EmptySearchBlock text={`We couldn't find anything for "${props.notFoundText}"`} />;
    }

    if (
        !(
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

        return <EmptySearchBlock text={`We couldn't find anything for "${props.notFoundText}"`} />;
    }
};

export const RoomsWithSort = ComponentWithSort({ Component: Rooms });

export const RoomsExploreComponent = () => {
    return (
        <SearchCardsOrShowProfile
            CardsComponent={RoomsWithSort}
            searchPlaceholder="Search groups and channels"
            noQueryText="Featured groups and channels"
            hasQueryText="Groups and channels"
            defaultSortOption="membersCount"
            withoutFeatured
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
