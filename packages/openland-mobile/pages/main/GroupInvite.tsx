import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { XMemo } from 'openland-y-utils/XMemo';
import { RoomInviteInfo_invite } from 'openland-api/Types';
import { Text, TextStyle, View, StyleSheet, Image, ImageStyle, Dimensions } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const styles = StyleSheet.create({
    label: {
        color: '#000000',
        opacity: 0.8,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
    } as TextStyle,

    userName: {
        fontWeight: TextStyles.weight.bold
    } as TextStyle,

    title: {
        fontSize: 20,
        lineHeight: 28,
        color: '#000000',
        marginTop: 20,
        textAlign: 'center',
        fontWeight: TextStyles.weight.medium,
    } as TextStyle,

    members: {
        fontSize: 14,
        lineHeight: 18,
        color: '#000000',
        opacity: 0.6,
        marginTop: 5,
    } as TextStyle,

    membersIcon: {
        tintColor: 'rgba(0, 0, 0, 0.25)',
        marginRight: 6,
        marginBottom: 1,
        alignSelf: 'flex-end',
    } as ImageStyle,

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#000000',
        opacity: 0.6,
        marginTop: 15,
        textAlign: 'center',
    } as TextStyle
});

const MIN_MEMBERS_COUNT_TO_SHOW = 10;

const GroupInviteContent = XMemo<PageProps>((props) => {
    let invite: RoomInviteInfo_invite = props.router.params.invite;
    let inviteId = props.router.params.inviteId;
    let room = invite.room;
    let user = invite.invitedByUser;
    let screenHeight = Dimensions.get('screen').height;

    let showMembersCount = room.membersCount ? room.membersCount >= MIN_MEMBERS_COUNT_TO_SHOW : false;

    return (
        <ASSafeAreaView flexGrow={1}>
            <View paddingHorizontal={32} flexGrow={1}>
                <View paddingTop={20}>
                    <Text style={styles.label}>
                        <Text style={styles.userName}>{user.name}</Text> invites you to join chat
                    </Text>
                </View>
                <View paddingTop={screenHeight <= 640 ? 60 : 100} alignItems="center" flexDirection="column">
                    <ZAvatar size={86} src={room.photo} placeholderKey={room.id} placeholderTitle={room.title} />
                    <Text style={styles.title}>{room.title}</Text>

                    <View flexDirection="row">
                        {showMembersCount && (<Image source={require('assets/ic-members-16.png')} style={styles.membersIcon} />)}
                        <Text style={styles.members}>
                            {showMembersCount ? (room.membersCount + ' members') : 'New ' + (room.isChannel ? 'channel' : 'group')}
                        </Text>
                    </View>

                    {typeof room.description === 'string' && (
                        <Text style={styles.description}>{room.description}</Text>
                    )}
                </View>

                <View position="absolute" left={0} right={0} bottom={46} alignItems="center">
                    <View width={178}>
                        <ZRoundedButton
                            size="large"
                            uppercase={false}
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
            </View>
        </ASSafeAreaView>
    )
});

class GroupInviteComponent extends React.Component<PageProps> {
    render() {
        let invite: RoomInviteInfo_invite = this.props.router.params.invite;
        let room = invite.room;
        return (
            <>
                <SHeader title={(room.isChannel ? 'Group' : 'Channel') + ' invitation'} />
                <GroupInviteContent {...this.props} />
            </>
        );
    }
}

export const GroupInvite = withApp(GroupInviteComponent, { navigationAppearance: 'small' });
