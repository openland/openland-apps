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

const ChatHeaderContent = XMemo<{ conversationId: string, router: SRouter, typing?: string }>((props) => {
    let theme = React.useContext(ThemeContext);
    let room = getClient().useRoomTiny({ id: props.conversationId });

    let accent = false;

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room as Room_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room as Room_room_PrivateRoom : null;

    let title = sharedRoom ? sharedRoom.title : privateRoom!.user.name;
    let subtitle = '';
    if (privateRoom) {
        if (privateRoom.user.primaryOrganization) {
            subtitle = privateRoom.user.primaryOrganization.name;
        } else {
            subtitle = 'Person';
        }
    } else if (sharedRoom && sharedRoom.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (sharedRoom && (sharedRoom.kind === 'GROUP' || sharedRoom.kind === 'PUBLIC')) {
        subtitle = sharedRoom.membersCount + (sharedRoom.membersCount === 1 ? ' member' : ' members');
    }

    let typingString = props.typing;
    if (typingString && privateRoom) {
        typingString = 'typing...';
    }
    subtitle = (typingString) || subtitle;

    if (props.typing) {
        accent = true;
    }

    if (privateRoom) {
        if (privateRoom.user.isBot) {
            subtitle = 'bot'
            accent = true;
        } else {
            let online = getClient().useWithoutLoaderOnline({ userId: privateRoom.user.id });
            if (online && online.user) {
                if (!online.user.online && online.user.lastSeen) {
                    subtitle = formatLastSeen(online.user.lastSeen);
                    accent = false;
                } else if (online.user.online) {
                    subtitle = 'online'
                    accent = true;
                }
            }
        }
    }

    return (
        <View flexDirection="column" alignItems={'flex-start'} justifyContent="center" pointerEvents="box-none" height={isAndroid ? 56 : 44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                {(sharedRoom && sharedRoom.kind === 'GROUP') && (<View height={isAndroid ? 26 : 18} alignItems="center" justifyContent="center" paddingBottom={1} marginRight={2}><Image source={require('assets/ic-lock-13.png')} style={{ tintColor: 'green' }} /></View>)}
                <Text style={[isAndroid ? styles.androidTitle : styles.iosTitle, { color: theme.textColor }, sharedRoom && sharedRoom.kind === 'GROUP' && { color: 'green' }]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
            </View>
            <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? { color: theme.accentColor } : { color: theme.textLabelColor }]}>{subtitle}</Text>
        </View>
    );
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