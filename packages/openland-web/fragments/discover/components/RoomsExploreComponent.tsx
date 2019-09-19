import * as React from 'react';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import {
    SearchCardsOrShowProfile,
    ComponentWithSort,
} from 'openland-web/fragments/discover/components/DiscoverNavigation';
import { useClient } from 'openland-web/utils/useClient';
import { EmptySearchBlock } from './EmptySearchBlock';
import { RoomShort_SharedRoom } from 'openland-api/Types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';

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
    const { tagsCount } = props;
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
                        <UGroupView
                            key={'group-' + c.node.id}
                            group={room as RoomShort_SharedRoom}
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

export const RoomsExploreComponent = React.memo(() => {
    return (
        <SearchCardsOrShowProfile
            CardsComponent={RoomsWithSort}
            searchPlaceholder="Search groups and channels"
            noQueryText="Featured groups and channels"
            hasQueryText="Groups and channels"
            defaultSortOption="membersCount"
            withoutFeatured={true}
            sortOptions={{
                label: 'Sort by',
                values: [
                    { label: 'Members count', value: 'membersCount' },
                    { label: 'Creation date', value: 'createdAt' },
                ],
            }}
        />
    );
});
