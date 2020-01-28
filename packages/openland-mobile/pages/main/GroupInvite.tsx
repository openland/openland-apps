import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { XMemo } from 'openland-y-utils/XMemo';
import { RoomInviteInfo_invite } from 'openland-api/Types';
import { Text, TextStyle, View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { FontStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZButton } from 'openland-mobile/components/ZButton';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { trackEvent } from 'openland-mobile/analytics';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';

const styles = StyleSheet.create({
    label: {
        ...TextStyles.Subhead,
        marginTop: 16,
        textAlign: 'center',
    } as TextStyle,
    userName: {
        fontWeight: FontStyles.Weight.Bold
    } as TextStyle,
    title: {
        ...TextStyles.Title2,
        marginTop: 16,
        textAlign: 'center',
    } as TextStyle,
    membersWrapper: {
        borderRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginTop: 16,
    } as TextStyle,
    members: {
        ...TextStyles.Label1,
    } as TextStyle,
    description: {
        ...TextStyles.Body,
        marginTop: 4,
        textAlign: 'center',
    } as TextStyle,
    buttonWrapper: {
        paddingTop: 16,
        paddingHorizontal: 16
    } as ViewStyle
});

const MIN_MEMBERS_COUNT_TO_SHOW = 10;

const GroupInviteContent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const paddingBottom = Platform.OS === 'ios' ? (area.bottom || 16) : area.bottom + 16;

    let invite: RoomInviteInfo_invite = props.router.params.invite;
    let inviteId = props.router.params.inviteId;
    let room = invite.room;
    let user = invite.invitedByUser;
    let typeString = room.isChannel ? 'channel' : 'group';

    let showMembersCount = room.membersCount ? room.membersCount >= MIN_MEMBERS_COUNT_TO_SHOW : false;

    return (
        <ZTrack
            event="invite_landing_view"
            params={{ invite_type: room.title.toLowerCase() }}
        >
            <View style={{ flexGrow: 1, paddingTop: area.top, paddingBottom }}>
                <View flexGrow={1} paddingHorizontal={32}>
                    <Text style={[styles.label, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                        <Text style={styles.userName} allowFontScaling={false}>{user.name}</Text> invites you to join {typeString}
                    </Text>
                    <View flexGrow={1} justifyContent="center" alignItems="center" flexDirection="column">
                        <ZAvatar size="xx-large" src={room.photo} placeholderKey={room.id} placeholderTitle={room.title} />
                        <Text style={[styles.title, { color: theme.foregroundPrimary }]} allowFontScaling={false}>{room.title}</Text>
                        {!!room.description && (
                            <Text style={[styles.description, { color: theme.foregroundSecondary }]} allowFontScaling={false}>{room.description}</Text>
                        )}
                        <View style={[styles.membersWrapper, { backgroundColor: theme.backgroundTertiaryTrans }]}>
                            <Text style={[styles.members, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                                {showMembersCount ? `${room.membersCount} members` : `New ${typeString}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <ZButton
                        size="large"
                        title={`Join ${typeString}`}
                        onPress={async () => {
                            startLoader();
                            try {
                                await getClient().mutateRoomJoinInviteLink({ invite: inviteId });

                                props.router.pushAndReset('Conversation', { id: room.id });
                                trackEvent('invite_button_clicked');
                            } catch (e) {
                                Alert.alert(e.message);
                            }
                            stopLoader();
                        }}
                    />
                </View>
            </View>
        </ZTrack>
    );
});

export const GroupInvite = withApp(GroupInviteContent, { navigationAppearance: 'small' });
