import * as React from 'react';
import { formatLastSeen } from 'openland-y-utils/formatTime';
import { UserShort } from 'openland-api/Types';
import { XView, XViewSelectedContext } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';

export const UPresence = ((props: { user: UserShort }) => {
    const { isBot, lastSeen, online } = props.user;
    const selected = React.useContext(XViewSelectedContext);

    let sub = undefined;
    let isOnline = false;

    if (isBot) {
        sub = 'bot';
        isOnline = true;
    } else if (!online && lastSeen) {
        sub = formatLastSeen(lastSeen);
    } else if (online) {
        sub = 'online';
        isOnline = true;
    }

    return (
        <XView color={isOnline && !selected ? ThemeDefault.accentPrimary : undefined}>{sub}</XView>
    );
});