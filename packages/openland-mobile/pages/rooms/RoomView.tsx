import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import { View, Text, Image, FlatList, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';
import { SRouter } from 'react-native-s/SRouter';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { VoiceChat } from './RoomsFeed';
import { useSafeArea } from 'react-native-safe-area-context';
import { RoomControls } from './RoomControls';

interface RoomUserViewProps {
    user: { name: string; avatar: string; id: string };
    theme: ThemeGlobal;
}

const UserModalContent = React.memo((props: RoomUserViewProps) => {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                paddingTop: 8,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ZAvatar
                    size="xx-large"
                    photo={props.user.avatar}
                    title={props.user.name}
                    id={props.user.id}
                />
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Label2,
                        color: props.theme.foregroundPrimary,
                        marginTop: 16,
                    }}
                >
                    {props.user.name}
                </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    marginBottom: 16,
                }}
            >
                <Text style={{ ...TextStyles.Subhead, color: props.theme.foregroundTertiary }}>
                    25 following
                </Text>
                <View
                    style={{
                        width: 3,
                        height: 3,
                        borderRadius: 3,
                        backgroundColor: props.theme.foregroundTertiary,
                        marginHorizontal: 8,
                    }}
                />
                <Text style={{ ...TextStyles.Subhead, color: props.theme.foregroundTertiary }}>
                    3879 followers
                </Text>
            </View>
            <View style={{ flexGrow: 1, alignItems: 'stretch' }}>
                <ZListItem
                    leftIcon={require('assets/ic-user-add-24.png')}
                    small={true}
                    text="Follow"
                />
                <ZListItem
                    leftIcon={require('assets/ic-leave-24.png')}
                    small={true}
                    text="Remove"
                />
                <ZListItem
                    leftIcon={require('assets/ic-pro-24.png')}
                    small={true}
                    text="Make admin"
                />
                <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    <ZButton size="large" title="View profile" style="secondary" />
                </View>
            </View>
        </View>
    );
});

const showUserInfo = (d: RoomUserViewProps) => {
    showBottomSheet({
        view: () => <UserModalContent user={d.user} theme={d.theme} />,
        cancelable: true,
    });
};

interface RoomViewProps {
    room: VoiceChat;
}

const RoomHeader = React.memo(
    (props: RoomViewProps & { theme: ThemeGlobal; onLayout: (e: LayoutChangeEvent) => void }) => {
        const { room, theme } = props;
        return (
            <View
                style={{ paddingHorizontal: 16, paddingTop: 15, paddingBottom: 24 }}
                onLayout={props.onLayout}
            >
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        marginBottom: 8,
                    }}
                    numberOfLines={2}
                >
                    {props.room.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                        {room.speakersCount}
                    </Text>
                    <Image
                        source={require('assets/ic-microphone-16.png')}
                        style={{
                            width: 16,
                            height: 16,
                            marginLeft: 4,
                            tintColor: theme.foregroundTertiary,
                        }}
                    />
                    <View
                        style={{
                            width: 3,
                            height: 3,
                            borderRadius: 3,
                            backgroundColor: theme.foregroundTertiary,
                            marginHorizontal: 8,
                        }}
                    />
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                        {room.listenersCount}
                    </Text>
                    <Image
                        source={require('assets/ic-headphones-16.png')}
                        style={{
                            width: 16,
                            height: 16,
                            marginLeft: 4,
                            tintColor: theme.foregroundTertiary,
                        }}
                    />
                </View>
            </View>
        );
    },
);

const RoomUserView = React.memo((props: RoomUserViewProps) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
            }}
        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => showUserInfo(props)}
            >
                <ZAvatar
                    size="xx-large"
                    photo={props.user.avatar}
                    title={props.user.name}
                    id={props.user.id}
                />
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Label2,
                        color: props.theme.foregroundPrimary,
                        marginTop: 12,
                    }}
                >
                    {props.user.name}
                </Text>
            </TouchableOpacity>
        </View>
    );
});

interface RoomUsersListProps extends RoomViewProps {
    theme: ThemeGlobal;
    headerHeight: number;
    controlsHeight: number;
}

const RoomUsersList = React.memo((props: RoomUsersListProps) => {
    const { headerHeight, controlsHeight, theme, room } = props;
    const sa = useSafeArea();
    const sHeight = SDevice.wHeight - (sa.top + sa.bottom + headerHeight + controlsHeight + 16);
    return (
        <View style={{ flexGrow: 1, height: sHeight }}>
            <FlatList
                data={room.members}
                renderItem={({ item }) => <RoomUserView user={item} theme={theme} />}
                keyExtractor={(item, index) => index.toString() + item.id}
                numColumns={3}
                style={{ flex: 1 }}
            />
        </View>
    );
});

const RoomView = React.memo((props: RoomViewProps & { ctx: ModalProps; router: SRouter }) => {
    const theme = useTheme();
    const { room } = props;
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [controlsHeight, setControlsHeight] = React.useState(0);

    const onHeaderLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
            setHeaderHeight(e.nativeEvent.layout.height);
        },
        [headerHeight],
    );

    const onControlsLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
            setControlsHeight(e.nativeEvent.layout.height);
        },
        [controlsHeight],
    );

    return (
        <View>
            <RoomHeader room={room} theme={theme} onLayout={onHeaderLayout} />
            <RoomUsersList
                room={room}
                theme={theme}
                headerHeight={headerHeight}
                controlsHeight={controlsHeight}
            />
            <RoomControls
                theme={theme}
                role="admin"
                onLayout={onControlsLayout}
                router={props.router}
                modalCtx={props.ctx}
            />
        </View>
    );
});

export const showRoomView = (room: VoiceChat, router: SRouter) => {
    showBottomSheet({
        view: (ctx) => <RoomView room={room} ctx={ctx} router={router} />,
        containerStyle: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
        },
        disableMargins: true,
        disableBottomSafeArea: true,
        cancelable: false,
    });
};
