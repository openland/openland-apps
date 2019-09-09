import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { RoomInviteInfo_invite } from 'openland-api/Types';
import { Text, TextStyle, View, StyleSheet, Image, ImageStyle, Dimensions, ViewStyle, Platform } from 'react-native';
import { FontStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const styles = StyleSheet.create({
    label: {
        ...TextStyles.Subhead,
        textAlign: 'center',
    } as TextStyle,

    userName: {
        fontWeight: FontStyles.Weight.Bold
    } as TextStyle,

    title: {
        ...TextStyles.Title2,
        marginTop: 24,
        textAlign: 'center',
    } as TextStyle,

    members: {
        ...TextStyles.Subhead,
        marginTop: 5,
    } as TextStyle,

    membersIcon: {
        opacity: 0.25,
        marginRight: 6,
        marginBottom: 1,
        alignSelf: 'flex-end',
    } as ImageStyle,

    description: {
        fontSize: 15,
        lineHeight: 22,
        marginTop: 15,
        textAlign: 'center',
    } as TextStyle,
    buttonWrapper: {
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
    let screenWidth = Dimensions.get('screen').width;

    let showMembersCount = room.membersCount ? room.membersCount >= MIN_MEMBERS_COUNT_TO_SHOW : false;

    return (
        <View style={{ flexGrow: 1, paddingTop: area.top, paddingBottom }}>
            <View paddingHorizontal={32} flexGrow={1}>
                <View position="absolute" top={16} left={0} width={screenWidth}>
                    <Text style={[styles.label, { color: theme.foregroundSecondary }]}>
                        <Text style={styles.userName}>{user.name}</Text> invites you to join chat
                    </Text>
                </View>
           
                <View flexGrow={1} justifyContent="center" alignItems="center" flexDirection="column" marginTop={-15}>
                    <ZAvatar size="xx-large" src={room.photo} placeholderKey={room.id} placeholderTitle={room.title} />
                    <Text style={[styles.title, { color: theme.foregroundPrimary }]}>{room.title}</Text>
                    <View flexDirection="row">
                        {showMembersCount && (<Image source={require('assets/ic-members-16.png')} style={[styles.membersIcon, { tintColor: theme.foregroundPrimary }]} />)}
                        <Text style={[styles.members, { color: theme.foregroundTertiary }]}>
                            {showMembersCount ? (room.membersCount + ' members') : 'New ' + (room.isChannel ? 'channel' : 'group')}
                        </Text>
                    </View>

                    {!!room.description && (
                        <Text style={[styles.description, { color: theme.foregroundPrimary }]}>{room.description}</Text>
                    )}
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <ZRoundedButton
                    size="large"
                    title="Accept invitation"
                    onPress={async () => {
                        startLoader();
                        try {
                            await getClient().mutateRoomJoinInviteLink({ invite: inviteId });

                            props.router.pushAndReset('Conversation', { id: room.id });
                        } catch (e) {
                            Alert.alert(e.message);
                        }
                        stopLoader();
                    }}
                />
            </View>
        </View>
    );
});

class GroupInviteComponent extends React.Component<PageProps> {
    render() {
        let invite: RoomInviteInfo_invite = this.props.router.params.invite;
        let room = invite.room;
        return (
            <>
                <SHeader title={(room.isChannel ? 'Channel' : 'Group') + ' invitation'} />
                <GroupInviteContent {...this.props} />
            </>
        );
    }
}

export const GroupInvite = withApp(GroupInviteComponent, { navigationAppearance: 'small' });
