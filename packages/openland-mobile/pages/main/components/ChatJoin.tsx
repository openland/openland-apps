import * as React from 'react';
import { View, Text, Alert, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingHorizontal: 32,
        flexGrow: 1
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        marginTop: 16,
        textAlign: 'center'
    } as TextStyle,
    description: {
        ...TextStyles.Body,
        marginTop: 4,
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
    buttonWrapper: {
        paddingTop: 16,
        paddingHorizontal: 16
    } as ViewStyle
});

interface ChatJoinProps {
    room: Room_room_SharedRoom;
    theme: ThemeGlobal;
}

export const ChatJoin = React.memo((props: ChatJoinProps) => {
    const client = getClient();
    const area = React.useContext(ASSafeAreaContext);
    const { room, theme } = props;
    const { id, title, photo, description, membersCount, isChannel } = room;
    const typeStr = isChannel ? 'channel' : 'group';
    const paddingBottom = Platform.OS === 'ios' ? (area.bottom || 16) : area.bottom + 16;

    return (
        <>
            <SHeaderView />
            <SHeaderButton />
            <View style={{ flexGrow: 1, paddingTop: area.top, paddingBottom }}>
                <View style={styles.container}>
                    <ZAvatar
                        src={photo}
                        size="xx-large"
                        placeholderKey={id}
                        placeholderTitle={title}
                    />
                    <Text style={[styles.title, { color: theme.foregroundPrimary }]}>
                        {title}
                    </Text>
                    {!!description && (
                        <Text style={[styles.description, { color: theme.foregroundPrimary }]}>
                            {description}
                        </Text>
                    )}
                    <View style={[styles.membersWrapper, { backgroundColor: theme.backgroundTertiaryTrans }]}>
                        <Text style={[styles.members, { color: theme.foregroundSecondary }]}>
                            {membersCount + (membersCount === 1 ? ' member' : ' members')}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <ZButton
                        title={`Join ${typeStr}`}
                        size="large"
                        onPress={async () => {
                            startLoader();
                            try {
                                await client.mutateRoomJoin({ roomId: id });
                            } catch (e) {
                                Alert.alert(e.message);
                            } finally {
                                stopLoader();
                            }
                        }}
                    />
                </View>
            </View>
        </>
    );
});