import * as React from 'react';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import {
    DiscoverRoom,
    DiscoverOrganization,
} from 'openland-y-utils/discover/normalizePopularItems';
import { RoomChat_room_SharedRoom, VoiceChatParticipantStatus, VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { useJoinRoom } from 'openland-mobile/pages/rooms/joinRoom';
import { useText } from 'openland-mobile/text/useText';

interface DiscoverListItemProps {
    item: DiscoverRoom;
    rightElement?: any;
    onJoin?: (room: RoomChat_room_SharedRoom) => void;
}

export const DiscoverListItem = ({ item, rightElement, onJoin }: DiscoverListItemProps) => {
    const theme = useTheme();
    const { t } = useText();
    return (
        <ZListItem
            key={item.id}
            text={item.title}
            leftAvatar={{
                photo: item.photo,
                id: item.id,
            }}
            subTitle={
                item.newMessages
                    ? `${item.newMessages} ${t('newMessage', { count: item.newMessages, defaultValue: 'new message' })}`
                    : item.membersCount
                        ? `${item.membersCount} ${t('member', { count: item.membersCount, defaultValue: 'member' })}`
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
    const { t } = useText();
    return (
        <ZListItem
            key={item.id}
            text={item.name}
            leftAvatar={{
                photo: item.photo,
                id: item.id,
            }}
            subTitle={
                item.membersCount ? `${item.membersCount} ${t('member', { count: item.membersCount, defaultValue: 'member' })}` : undefined
            }
            rightElement={rightElement}
            path="ProfileOrganization"
            pathParams={{ id: item.id }}
            {...item.featured && theme.displayFeaturedIcon ? { descriptionIcon: require('assets/ic-verified-16.png'), descriptionColor: '#3DA7F2' } : {}}
        />
    );
};

interface DiscoverListItemVoiceProps {
    item: VoiceChatWithSpeakers;
}

export const DiscoverListItemVoice = ({ item }: DiscoverListItemVoiceProps) => {
    const { t } = useText();
    const admin = item.speakers.find(x => x.status === VoiceChatParticipantStatus.ADMIN);
    const joinRoom = useJoinRoom();
    const handlePress = React.useCallback(() => {
        joinRoom(item.id);
    }, [item.id, joinRoom]);
    const membersCount = item.speakersCount + item.listenersCount;
    return (
        <ZListItem
            key={item.id}
            text={item.title}
            leftAvatar={{
                photo: admin?.user.photo,
                id: admin?.user.id || item.id,
            }}
            subTitle={`${membersCount} ${t('member', { count: membersCount, defaultValue: 'member' })}`}
            onPress={handlePress}
        />
    );
};
