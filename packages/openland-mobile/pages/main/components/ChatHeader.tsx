import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, Image } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { useClient } from 'openland-mobile/utils/useClient';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { TextStyles, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import Lottie from 'lottie-react-native';

const styles = StyleSheet.create({
    title: {
        ...TextStyles.Label2,
        flexShrink: 1
    } as TextStyle,
    subTitle: {
        ...TextStyles.Caption,
    } as TextStyle,
});

const SharedChatHeaderContent = XMemo<{ room: Room_room_SharedRoom, typing?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme } = props;
    const [onlineCount, setOnlineCount] = React.useState<number>(0);

    getChatOnlinesCount(room.id, useClient(), (count) => setOnlineCount(count));

    let title = room.title;
    let accent = false;
    let subtitle = '';

    if (room.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (room.kind === 'GROUP' || room.kind === 'PUBLIC') {
        subtitle = room.membersCount + (room.membersCount === 1 ? ' member' : ' members');
    }

    if (typing) {
        accent = true;
        subtitle = typing;
    }

    return (
        <View flexDirection="column" alignItems="flex-start" alignSelf="center" justifyContent="center" pointerEvents="box-none" height={44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                {room.kind === 'GROUP' && (
                    <Image
                        alignSelf="center"
                        opacity={CompensationAlpha}
                        source={require('assets/ic-lock-16.png')}
                        style={{ tintColor: theme.accentPositive, marginRight: 4, width: 16, height: 16 }}
                    />
                )}
                <Text style={[styles.title, { color: theme.foregroundPrimary }, room.kind === 'GROUP' && { color: theme.accentPositive }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                {room.settings.mute && (
                    <Image
                        alignSelf="center"
                        source={require('assets/ic-muted-16.png')}
                        style={{ tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>
            <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                {subtitle}
                {onlineCount > 0 && (!typing) && (<Text style={{ color: theme.accentPrimary }} allowFontScaling={false}>{'  '}{onlineCount} online</Text>)}
            </Text>
        </View>
    );
});

const PrivateChatHeaderContent = XMemo<{ room: Room_room_PrivateRoom, typing?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme } = props;

    let [subtitle, accent] = useLastSeen(room.user);

    let title = room.user.name;

    if (typing) {
        accent = true;
        subtitle = 'typing';
    }

    return (
        <View flexDirection="column" alignItems="flex-start" alignSelf="center" justifyContent="center" pointerEvents="box-none" height={44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                {room.settings.mute && (
                    <Image
                        alignSelf="center"
                        source={require('assets/ic-muted-16.png')}
                        style={{ tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>
            
            <View flexDirection="row" alignItems="center">
                { typing && (
                    <Lottie
                        loop={true}
                        autoPlay={true}
                        resizeMode="contain"
                        source={require('assets/animations/typing.json')}
                        style={{
                            width: 16,
                            height: 16,
                            marginRight: 8,
                            marginTop: 0.5,
                        }}
                        colorFilters={[{
                            keypath: "Ellipse 1",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }]}
                    />
                )}
                <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} allowFontScaling={false}>{subtitle}</Text>
            </View>

        </View>
    );
});

const ChatHeaderContent = XMemo<{ conversationId: string, router: SRouter, typing?: string }>((props) => {
    let theme = React.useContext(ThemeContext);
    let room = getClient().useRoomTiny({ id: props.conversationId });

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room as Room_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room as Room_room_PrivateRoom : null;

    if (sharedRoom) {
        return <SharedChatHeaderContent room={sharedRoom} typing={props.typing} theme={theme} />;
    }

    if (privateRoom) {
        return <PrivateChatHeaderContent room={privateRoom} typing={props.typing} theme={theme} />;
    }

    return null;
});

export class ChatHeader extends React.PureComponent<{ conversationId: string, router: SRouter }, { typing?: string }> {

    disposeSubscription?: () => any;

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.disposeSubscription = getMessenger().engine.getTypings(this.props.conversationId).subcribe(t => this.setState({ typing: t }));
    }

    componentWillUnmount() {
        if (this.disposeSubscription) {
            this.disposeSubscription();
        }
    }

    render() {
        return (
            <React.Suspense fallback={null}>
                <ChatHeaderContent {...this.props} typing={this.state.typing} />
            </React.Suspense>
        );
    }
}