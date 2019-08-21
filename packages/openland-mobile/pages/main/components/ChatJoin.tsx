import * as React from 'react';
import { View, Text, Alert, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
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
    wrapper: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    } as ViewStyle,
    infoWrapper: {
        flexDirection: 'column',
        zIndex: -1,
        padding: 24
    } as ViewStyle,
    container: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexGrow: 1
    } as ViewStyle,
    title: {
        ...TextStyles.Title2,
        textAlign: 'center'
    } as TextStyle,
    description: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 4,
        lineHeight: 22
    } as TextStyle,
    members: {
        ...TextStyles.Body,
        textAlign: 'center',
        marginTop: 4
    } as TextStyle,
    buttonWrapper: {
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

    return (
        <>
            <SHeaderView />
            <SHeaderButton />
            <View style={[styles.wrapper, { paddingTop: area.top, paddingBottom: area.bottom || 16 }]}>
                <View style={styles.container}>
                    <ZAvatar
                        src={photo}
                        size="xx-large"
                        placeholderKey={id}
                        placeholderTitle={title}
                    />
                    <View style={styles.infoWrapper}>
                        <Text style={[styles.title, { color: theme.foregroundPrimary }]}>
                            {title}
                        </Text>
                        {!!description && (
                            <Text style={[styles.description, { color: theme.foregroundPrimary }]}>
                                {description}
                            </Text>
                        )}
                        <Text style={[styles.members, { color: theme.foregroundTertiary }]}>
                            {membersCount + (membersCount === 1 ? ' member' : ' members')}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <ZRoundedButton
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