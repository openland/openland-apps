import * as React from 'react';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import {
    DiscoverRoom,
    DiscoverOrganization,
} from 'openland-y-utils/discover/normalizePopularItems';
import { plural } from 'openland-y-utils/plural';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { useTheme } from 'openland-mobile/themes/ThemeContext';

interface DiscoverListItemProps {
    item: DiscoverRoom;
    rightElement?: any;
    onJoin?: (room: RoomChat_room_SharedRoom) => void;
}

export const DiscoverListItem = ({ item, rightElement, onJoin }: DiscoverListItemProps) => {
    const theme = useTheme();
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
                    : item.membersCount
                        ? plural(item.membersCount, ['member', 'members'])
                        : undefined
            }
            rightElement={rightElement}
            path="Conversation"
            pathParams={{ flexibleId: item.id, onJoin }}
            {...item.featured && theme.displayFeaturedIcon ? { descriptionIcon: require('assets/ic-verified-16.png'), descriptionColor: '#3DA7F2' } : {}}
        />
    );
};

interface DiscoverListItemOrgProps {
    item: DiscoverOrganization;
    rightElement?: any;
}

export const DiscoverListItemOrg = ({ item, rightElement }: DiscoverListItemOrgProps) => {
    const theme = useTheme();
    return (
        <ZListItem
            key={item.id}
            text={item.name}
            leftAvatar={{
                photo: item.photo,
                id: item.id,
                title: item.name,
            }}
            subTitle={
                item.membersCount ? plural(item.membersCount, ['member', 'members']) : undefined
            }
            rightElement={rightElement}
            path="ProfileOrganization"
            pathParams={{ id: item.id }}
            {...item.featured && theme.displayFeaturedIcon ? { descriptionIcon: require('assets/ic-verified-16.png'), descriptionColor: '#3DA7F2' } : {}}
        />
    );
};
