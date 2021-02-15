import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import { View, Text, Image, FlatList, LayoutChangeEvent } from 'react-native';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { VoiceChat } from './RoomsFeed';
import { useSafeArea } from 'react-native-safe-area-context';
import { RoomControls } from './RoomControls';

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

interface RoomUserViewProps {
    user: { name: string; avatar: string; id: string };
    theme: ThemeGlobal;
}

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
