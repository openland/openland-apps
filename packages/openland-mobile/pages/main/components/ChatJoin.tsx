import * as React from 'react';
import { View, Text, Alert, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface ChatJoinProps {
    room: Room_room_SharedRoom;
    theme: ThemeGlobal;
    router: SRouter;
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    } as ViewStyle,
    safeArea: {
        width: '100%',
        height: '100%',
        justifyContent: 'center'
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

export const ChatJoin = XMemo<ChatJoinProps>((props) => (
    <View style={styles.wrapper}>
        <SHeaderView />
        <SHeaderButton />
        <ASSafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ZAvatar
                    src={props.room.photo}
                    size="xx-large"
                    placeholderKey={props.room.id}
                    placeholderTitle={props.room.title}
                />
                <View style={styles.infoWrapper}>
                    <Text style={[styles.title, { color: props.theme.foregroundPrimary }]}>
                        {props.room.title}
                    </Text>
                    {props.room.description && (
                        <Text style={[styles.description, { color: props.theme.foregroundPrimary }]}>
                            {props.room.description}
                        </Text>
                    )}
                    <Text style={[styles.members, { color: props.theme.foregroundSecondary }]}>
                        {props.room.membersCount + (props.room.membersCount === 1 ? ' member' : ' members')}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <ZRoundedButton
                    title={'Join ' + (props.room.isChannel ? 'channel' : 'group')}
                    size="large"
                    onPress={async () => {
                        startLoader();
                        try {
                            await getClient().mutateRoomJoin({ roomId: props.room.id });
                        } catch (e) {
                            Alert.alert(e.message);
                        } finally {
                            stopLoader();
                        }
                    }}
                />
            </View>
        </ASSafeAreaView>
    </View>
));