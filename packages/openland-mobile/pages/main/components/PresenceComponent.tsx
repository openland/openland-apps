import * as React from 'react';
import { TextStyle, Text } from 'react-native';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { XMemo } from 'openland-y-utils/XMemo';

export const PresenceComponent = XMemo<{ uid: string, isBot?: boolean, lastSeen?: string|null, online?: boolean, style?: TextStyle, onlineStyle?: TextStyle }>((props) => {
    if (props.isBot) {
        return (<Text style={[props.style, props.onlineStyle]}>bot</Text>);
    }
    let sub = undefined;
    let isOnline = false;
    if (!props.online && props.lastSeen) {
        sub = formatLastSeen(props.lastSeen);
    } else if (props.online) {
        sub = 'online';
        isOnline = true;
    }
    return (
        <Text style={[props.style, isOnline && props.onlineStyle]}>{sub}</Text>
    );
});