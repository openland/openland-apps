import * as React from 'react';
import { formatLastSeen } from 'openland-y-utils/formatTime';
import { UserShort } from 'openland-api/Types';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';

export const UPresence = ((props: { user: UserShort }) => {
    const { isBot, lastSeen, online } = props.user;

    if (isBot) {
        return (<XView color={ThemeDefault.accentPrimary}>bot</XView>);
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
        <XView color={isOnline ? ThemeDefault.accentPrimary : undefined}>{sub}</XView>
    );
});