import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ASImage } from 'react-native-async-view/ASImage';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';

import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { Modals } from 'openland-mobile/pages/main/modals/Modals';
import { ChatInit_room_SharedRoom, RoomMemberRole } from 'openland-api/spacex.types';
import Alert from 'openland-mobile/components/AlertBlanket';
import { OpenlandClient } from 'openland-api/spacex';
import { useText } from 'openland-mobile/text/useText';

interface AsyncInvitePeopleBlockProps {
    router: NavigationManager;
    client: OpenlandClient;
    room: ChatInit_room_SharedRoom;
}

export const AsyncInvitePeopleBlock = React.memo((props: AsyncInvitePeopleBlockProps) => {
    const theme = useThemeGlobal();
    const { t } = useText();
    const { router, room, client } = props;

    const imageSource = theme.type === 'Light' ? require('assets/art-add-people.png') : require('assets/art-add-people-dark.png');

    const onInvitePress = React.useCallback(() => {
        Modals.showUserMuptiplePicker(
            router,
            {
                title: t('add', 'Add'),
                action: async (users) => {
                    try {
                        await client.mutateRoomAddMembers({
                            invites: users.map((u) => ({
                                userId: u.id,
                                role: RoomMemberRole.MEMBER,
                            })),
                            roomId: room.id,
                        });
                        await client.refetchRoomChat({ id: room.id });
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    router.pop();
                },
            },
            room.id,
            true,
            room.isPremium ? t('addPeopleFree', 'Add people for free') : t('addPeople', 'Add people'),
            { path: 'ProfileGroupLink', pathParams: { room } },
        );
    }, [t]);

    return (
        <ASFlex flexDirection="column" alignItems="center" marginBottom={32}>
            <ASImage source={imageSource} width={140} height={140} />
            <ASText {...TextStylesAsync.Title2} color={theme.foregroundPrimary} marginBottom={6} marginTop={22}>
                {t('addPeople', 'Add people')}
            </ASText>
            <ASText {...TextStylesAsync.Body} color={theme.foregroundSecondary} marginBottom={24}>
                {room.isChannel
                    ? t('inviteJoinChannel', 'Invite people to join channel')
                    : t('inviteJoinConversation', 'Invite people to join conversation')}
            </ASText>
            <ASFlex
                justifyContent="center"
                alignItems="center"
                backgroundColor={theme.accentPrimary}
                borderRadius={18}
                height={36}
                width={137}
                onPress={onInvitePress}
            >
                <ASText
                    {...TextStylesAsync.Label1}
                    color={theme.foregroundInverted}
                    lineHeight={19}
                >
                    {t('inviteFriends', 'Invite friends')}
                </ASText>
            </ASFlex>
        </ASFlex>
    );
});
