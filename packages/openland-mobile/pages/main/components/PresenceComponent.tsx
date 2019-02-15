import * as React from 'react';
import { TextStyle, Text } from 'react-native';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

export const PresenceComponent = XMemo<{ uid: string, isBot?: boolean, style?: TextStyle, onlineStyle?: TextStyle }>((props) => {
    if (props.isBot) {
        return (<Text style={[props.style, props.onlineStyle]}>bot</Text>);
    }
    let online = getClient().useWithoutLoaderOnline({ userId: props.uid });
    let sub = undefined;
    let isOnline = false;
    if (online && online.user && !online.user.online && online.user.lastSeen) {
        sub = formatLastSeen(online.user.lastSeen);
    } else if (online && online.user && online.user.online) {
        sub = 'online';
        isOnline = true;
    }
    return (
        <Text style={[props.style, isOnline && props.onlineStyle]}>{sub}</Text>
    );
});