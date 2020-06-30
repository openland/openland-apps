import * as React from 'react';
import { TextStyle, Text, TextProps } from 'react-native';
import { formatLastSeen } from 'openland-y-utils/formatTime';

interface PresenceComponentProps extends TextProps {
    uid: string;
    isBot?: boolean;
    lastSeen?: string | null;
    online?: boolean;
    onlineStyle?: TextStyle;
}

export const PresenceComponent = React.memo((props: PresenceComponentProps) => {
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