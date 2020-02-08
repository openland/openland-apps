import * as React from 'react';
import { View, Text, Alert, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Room_room_SharedRoom, ChatJoin_room_SharedRoom } from 'openland-api/spacex.types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 32,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        marginTop: 32,
        textAlign: 'center'
    } as TextStyle,
    description: {
        ...TextStyles.Body,
        marginTop: 4,
        textAlign: 'center',
    } as TextStyle,
    members: {
        ...TextStyles.Body,
    } as TextStyle,
    buttonWrapper: {
        paddingTop: 16,
        paddingHorizontal: 16
    } as ViewStyle
});

interface ChatJoinProps {
    room: Room_room_SharedRoom;
    theme: ThemeGlobal;
}

interface ChatJoinComponentProps {
    room: Pick<Room_room_SharedRoom, 'id' | 'title' | 'photo' | 'description' | 'membersCount' | 'onlineMembersCount' | 'previewMembers' | 'isChannel'>;
    theme: ThemeGlobal;
    action: () => void;
    invitedBy?: { id: string, name: string, photo: string | null };
}

export const ChatJoinComponent = React.memo((props: ChatJoinComponentProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const { theme, action, invitedBy, room } = props;
    const { id, title, photo, description, membersCount, onlineMembersCount, previewMembers = [], isChannel } = room;
    const typeStr = isChannel ? 'channel' : 'group';
    const paddingBottom = Platform.OS === 'ios' ? (area.bottom || 16) : area.bottom + 16;

    const avatars = previewMembers.map(x => x.photo).filter(x => !!x).slice(0, 5);
    const showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;
    const showOnlineMembers = onlineMembersCount ? onlineMembersCount >= 10 : false;
    const joinTitle = !!invitedBy ? `${invitedBy.name} invites you to join “${title}”` : title;
    const joinAvatars = !!invitedBy ? (
        <View flexDirection="row" justifyContent="center">
            <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                <ZAvatar
                    src={invitedBy.photo}
                    size="x-large"
                    placeholderKey={invitedBy.id}
                    placeholderTitle={invitedBy.name}
                />
            </View>
            <View marginLeft={-14} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                <ZAvatar
                    src={photo}
                    size="x-large"
                    placeholderKey={id}
                    placeholderTitle={title}
                />
            </View>
        </View>
    ) : (
            <ZAvatar
                src={photo}
                size="xx-large"
                placeholderKey={id}
                placeholderTitle={title}
            />
        );

    const membersContent = (
        <>
            <View flexDirection="row" justifyContent="center" marginTop={32}>
                {avatars.map(src => (
                    <View marginLeft={-8} borderRadius={100} borderColor={theme.backgroundPrimary} borderWidth={2}>
                        <ZAvatar
                            src={src}
                            size="small"
                        />
                    </View>
                ))}
            </View>
            <View marginTop={8}>
                <Text style={[styles.members, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                    {membersCount} members{showOnlineMembers && `, ${onlineMembersCount} online`}
                </Text>
            </View>
        </>
    );

    return (
        <View style={{ flexGrow: 1, paddingTop: area.top, paddingBottom }}>
            <View style={styles.container}>
                {joinAvatars}
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={3} allowFontScaling={false}>
                    {joinTitle}
                </Text>
                {!!description && (
                    <Text style={[styles.description, { color: theme.foregroundSecondary }]} numberOfLines={4} allowFontScaling={false}>
                        {description}
                    </Text>
                )}
                {showMembers && membersContent}
                {!showMembers && !description && (
                    <View marginTop={4}>
                        <Text style={[styles.members, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                            New {typeStr}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.buttonWrapper}>
                <ZButton
                    title={`Join ${typeStr}`}
                    size="large"
                    onPress={action}
                />
            </View>
        </View>
    );
});

export const ChatJoin = React.memo((props: ChatJoinProps) => {
    const client = getClient();
    const room = client.useChatJoin({id: props.room.id}).room as ChatJoin_room_SharedRoom;
    const action = React.useCallback(async () => {
        startLoader();
        try {
            await client.mutateRoomJoin({ roomId: props.room.id });
            client.refetchRoomTiny({ id: props.room.id });
        } catch (e) {
            Alert.alert(e.message);
        } finally {
            stopLoader();
        }
    }, [props.room.id]);

    return <ChatJoinComponent room={room} theme={props.theme} action={action} />;
});