import * as React from 'react';
import { TextStyle, Text, TextProps } from 'react-native';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { XMemo } from 'openland-y-utils/XMemo';

interface PresenceComponentProps extends TextProps {
    uid: string;
    isBot?: boolean;
    lastSeen?: string | null;
    online?: boolean;
    onlineStyle?: TextStyle;
}

export const PresenceComponent = XMemo<PresenceComponentProps>((props) => {
    const { uid, isBot, lastSeen, online, onlineStyle, style, ...other } = props;
    if (isBot) {
        return (<Text style={[style, onlineStyle]} {...other}>bot</Text>);
    }
    let sub = undefined;
    let isOnline = false;
    if (!online && lastSeen) {
        sub = formatLastSeen(lastSeen);
    } else if (online) {
        sub = 'online';
        isOnline = true;
    }
    return (
        <Text style={[style, isOnline && onlineStyle]} {...other}>{sub}</Text>
    );
});