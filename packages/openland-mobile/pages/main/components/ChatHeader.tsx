import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, Image } from 'react-native';
import { isAndroid } from '../../../utils/isAndroid';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { useClient } from 'openland-mobile/utils/useClient';
import { AppTheme } from 'openland-mobile/themes/themes';

const styles = StyleSheet.create({
    androidTitle: {
        fontWeight: '500',
        fontSize: 18,
        height: 26,
        color: '#000',
        letterSpacing: 0.3,
        marginBottom: 1,
        marginRight: 16
    } as TextStyle,
    androidSubTitle: {
        fontSize: 14,
        height: 18,
        color: '#000',
        // opacity: 0.6,
        marginTop: -4
    } as TextStyle,

    iosTitle: {
        fontSize: 17,
        height: 21,
        color: '#000',
        fontWeight: '600',
        flexShrink: 1
    } as TextStyle,
    iosSubTitle: {
        fontSize: 14,
        height: 16,
        color: '#000',
        // opacity: 0.6
    } as TextStyle,

    subTitleAccent: {
        color: '#0084fe',
        opacity: 1
    } as TextStyle,

});

const SharedChatHeaderContent = XMemo<{ room: Room_room_SharedRoom, typing?: string, theme: AppTheme }>((props) => {
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
        <View flexDirection="column" alignItems={'flex-start'} justifyContent="center" pointerEvents="box-none" height={isAndroid ? 56 : 44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                {(room.kind === 'GROUP' && !room.isChannel) && (<View height={isAndroid ? 26 : 18} alignItems="center" justifyContent="center" paddingBottom={1} marginRight={2}><Image source={require('assets/ic-lock-13.png')} style={{ tintColor: theme.dialogTitleSecureColor }} /></View>)}
                {(room.isChannel) && (<View height={isAndroid ? 26 : 18} alignItems="center" justifyContent="center" marginRight={2}><Image source={require('assets/ic-channel-13.png')} style={{ tintColor: room.kind === 'GROUP' ? theme.dialogTitleSecureColor : theme.textColor }} /></View>)}
                <Text style={[isAndroid ? styles.androidTitle : styles.iosTitle, { color: theme.textColor }, room.kind === 'GROUP' && { color: theme.dialogTitleSecureColor }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
            <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? { color: theme.accentColor } : { color: theme.textLabelColor }]}>
                {subtitle}
                {onlineCount > 0 && (!typing) && (<Text style={{ color: theme.accentColor }}>{'  '}{onlineCount} online</Text>)}
            </Text>
        </View>
    );
});

const PrivateChatHeaderContent = XMemo<{ room: Room_room_PrivateRoom, typing?: string, theme: AppTheme }>((props) => {
    const { room, typing, theme } = props;

    let title = room.user.name;
    let accent = false;
    let subtitle = '';

    if (room.user.isBot) {
        subtitle = 'bot'
        accent = true;
    } else {
        // use data about user online from room query
        if (!room.user.online && room.user.lastSeen) {
            subtitle = formatLastSeen(room.user.lastSeen);
            accent = false;
        } else if (room.user.online) {
            subtitle = 'online'
            accent = true;
        }
    }

    if (typing) {
        accent = true;
        subtitle = 'typing...';
    }

    return (
        <View flexDirection="column" alignItems={'flex-start'} justifyContent="center" pointerEvents="box-none" height={isAndroid ? 56 : 44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                <Text style={[isAndroid ? styles.androidTitle : styles.iosTitle, { color: theme.textColor }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
            <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? { color: theme.accentColor } : { color: theme.textLabelColor }]}>{subtitle}</Text>
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