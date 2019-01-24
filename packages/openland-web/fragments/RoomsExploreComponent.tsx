import * as React from 'react';
import { withChatSearchChannels } from '../api/withChatSearchChannels';
import { XLoader } from 'openland-x/XLoader';
import { EmptyComponent } from './directory/RoomEmptyComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import {
    DirectoryContent,
    ComponentWithSort,
} from 'openland-web/pages/main/directory/DirectoryUniversalNavigation';

interface WithChatSearchRoomsProps {
    variables: {
        query: string;
        sort: string;
    };
    tagsCount: (n: number) => void;
}

export const Rooms = withChatSearchChannels(props => {
    if (!(props.data && props.data.items)) {
        return <XLoader loading={true} />;
    }

    if (
        !(
            props.error ||
            props.data === undefined ||
            props.data.items === undefined ||
            props.data.items === null ||
            props.data.items.edges.length === 0
        )
    ) {
        (props as any).tagsCount(props.data.items.pageInfo.itemsCount);

        return (
            <XContentWrapper withPaddingBottom={true}>
                {props.data.items.edges.map(c => {
                    let room = c.node;

                    return (
                        <XRoomCard
                            key={c.node.id}
                            room={room}
                            path={'/directory/p/' + room.id}
                            iMember={room.membership === 'MEMBER'}
                        />
                    );
                })}
            </XContentWrapper>
        );
    } else {
        (props as any).tagsCount(0);

        return <EmptyComponent />;
    }
}) as React.ComponentType<WithChatSearchRoomsProps>;

let CardsComponent = ComponentWithSort(Rooms);

export const RoomsExploreComponent = () => {
    return (
        <DirectoryContent
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search rooms'}
            noQueryText={'All rooms'}
            hasQueryText={'Organizations'}
        />
    );
};
