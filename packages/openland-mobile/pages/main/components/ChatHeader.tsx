import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, Image } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { useClient } from 'openland-mobile/utils/useClient';
import { ThemeGlobal } from 'openland-y-utils/themes/types';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    title: {
        ...TypeStyles.label2,
        flexShrink: 1
    } as TextStyle,
    subTitle: {
        ...TypeStyles.caption,
    } as TextStyle,
});

const SharedChatHeaderContent = XMemo<{ room: Room_room_SharedRoom, typing?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme } = props;
    const [ onlineCount, setOnlineCount ] = React.useState<number>(0);

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
                {(room.kind === 'GROUP' && !room.isChannel) && (<View height={18} alignItems="center" justifyContent="center" marginRight={2}><Image source={require('assets/ic-lock-13.png')} style={{ tintColor: theme.accentPositive }} /></View>)}
                {(room.isChannel) && (<View height={18} alignItems="center" justifyContent="center" marginRight={2}><Image source={require('assets/ic-channel-13.png')} style={{ tintColor: room.kind === 'GROUP' ? theme.accentPositive : theme.foregroundPrimary }} /></View>)}
                <Text style={[styles.title, { color: theme.foregroundPrimary }, room.kind === 'GROUP' && { color: theme.accentPositive }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
            <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} numberOfLines={1} ellipsizeMode="tail">
                {subtitle}
                {onlineCount > 0 && (!typing) && (<Text style={{ color: theme.accentPrimary }}>{'  '}{onlineCount} online</Text>)}
            </Text>
        </View>
    );
});

const PrivateChatHeaderContent = XMemo<{ room: Room_room_PrivateRoom, typing?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme } = props;

    let title = room.user.name;
    let accent = false;
    let subtitle = '';

    if (room.user.isBot) {
        subtitle = 'bot';
        accent = true;
    } else {
        // use data about user online from room query
        if (!room.user.online && room.user.lastSeen) {
            subtitle = formatLastSeen(room.user.lastSeen);
            accent = false;
        } else if (room.user.online) {
            subtitle = 'online';
            accent = true;
        }
    }

    if (typing) {
        accent = true;
        subtitle = 'typing...';
    }

    return (
        <View flexDirection="column" alignItems="flex-start" alignSelf="center" justifyContent="center" pointerEvents="box-none" height={44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
            <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]}>{subtitle}</Text>
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