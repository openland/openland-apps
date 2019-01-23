import * as React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { isAndroid } from '../../../utils/isAndroid';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { OnlineQuery, RoomQuery } from 'openland-api';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';

const styles = StyleSheet.create({
    androidTitle: {
        fontWeight: '500',
        fontSize: 18,
        height: 26,
        color: '#000',
        letterSpacing: 0.3,
        marginBottom: 1
    } as TextStyle,
    androidSubTitle: {
        fontSize: 14,
        height: 18,
        color: '#000',
        opacity: 0.6,
        marginTop: -4
    } as TextStyle,

    iosTitle: {
        fontSize: 15,
        height: 18,
        color: '#000',
        fontWeight: '500'
    } as TextStyle,
    iosSubTitle: {
        fontSize: 12,
        height: 14,
        color: '#000',
        opacity: 0.6
    } as TextStyle,

    subTitleAccent: {
        color: '#4747ec',
        opacity: 1
    } as TextStyle,

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
            <YQuery query={RoomQuery} variables={{ id: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return null;
                    }

                    const chat = res.data!!.room;

                    let accent = false;

                    let sharedRoom = res.data!.room!.__typename === 'SharedRoom' ? res.data!.room as Room_room_SharedRoom : null;
                    let privateRoom = res.data!.room!.__typename === 'PrivateRoom' ? res.data!.room as Room_room_PrivateRoom : null;
                    let room = (sharedRoom || privateRoom)!;

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

                    let typingString = this.state.typing;
                    if (typingString && privateRoom) {
                        typingString = 'typing...';
                    }
                    subtitle = (typingString) || subtitle;

                    if (this.state.typing) {
                        accent = true;
                    }

                    return (
                        <View flexDirection="column" alignItems={isAndroid ? 'flex-start' : 'center'} marginTop={isAndroid ? -6 : undefined} justifyContent="center" alignSelf="center" pointerEvents="box-none" height={44}>
                            <Text style={isAndroid ? styles.androidTitle : styles.iosTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                            {privateRoom && <YQuery query={OnlineQuery} variables={{ userId: privateRoom.user.id }}>
                                {online => {
                                    let sub = subtitle;
                                    if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                                        sub = formatLastSeen(online.data.user.lastSeen);
                                    }
                                    return (
                                        <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? styles.subTitleAccent : {}]}>{sub}</Text>
                                    );
                                }}
                            </YQuery>}
                            {sharedRoom && (
                                <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? styles.subTitleAccent : {}]}>{subtitle}</Text>
                            )}
                        </View>
                    );
                }}
            </YQuery>
        );
    }
}