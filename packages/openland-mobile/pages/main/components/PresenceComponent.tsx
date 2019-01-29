import * as React from 'react';
import { TextStyle, Text } from 'react-native';
import { formatLastSeen } from 'openland-mobile/utils/formatTime';
import { getClient } from 'openland-mobile/utils/apolloClient';

export const PresenceComponent = React.memo<{ uid: string, style?: TextStyle, onlineStyle?: TextStyle }>((props) => {
    // TODO: Implement non-suspense rendering
    let online = getClient().useOnline({ userId: props.uid });
    let sub = undefined;
    let isOnline = false;
    if (online.user && !online.user.online && online.user.lastSeen) {
        sub = formatLastSeen(online.user.lastSeen);
    } else if (online.user && online.user.online) {
        sub = 'online';
        isOnline = true;
    }
    return (
        <Text style={[props.style, isOnline && props.onlineStyle]}>{sub}</Text>
    );
});