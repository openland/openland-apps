import * as React from 'react';
import { ZListItem } from "openland-mobile/components/ZListItem";
import { DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { plural } from 'openland-y-utils/plural';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';

interface DiscoverListItemProps {
    item: DiscoverRoom;
    rightElement?: any;
    onJoin?: (room: RoomChat_room_SharedRoom) => void;
}

export const DiscoverListItem = ({item, rightElement, onJoin}: DiscoverListItemProps) => {
    return (
        <ZListItem
            key={item.id}
            text={item.title}
            leftAvatar={{
                photo: item.photo,
                id: item.id,
                title: item.title,
            }}
            subTitle={
                item.newMessages 
                    ? plural(item.newMessages, ['new message', 'new messages'])
                    : item.membersCount ? plural(item.membersCount, ['member', 'members'])
                    : undefined
            }
            rightElement={rightElement}
            path="Conversation"
            pathParams={{ flexibleId: item.id, onJoin }}
        />
    );
};
