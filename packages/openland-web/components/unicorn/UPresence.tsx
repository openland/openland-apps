import * as React from 'react';
import { formatLastSeen } from 'openland-y-utils/formatTime';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { UserShort } from 'openland-api/Types';
import { XViewSelectedContext } from 'react-mental';

interface UPresenceProps {
    user: UserShort;
    suffix?: string | JSX.Element;
}

export const UPresence = ((props: UPresenceProps) => {
    const { isBot, lastSeen, online } = props.user;
    const selected = React.useContext(XViewSelectedContext);

    useLastSeen(online);

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
        <span>
            <span style={{ color: isOnline && !selected ? 'var(--accentPrimary)' : undefined }}>
                {sub}
            </span>
            {props.suffix}
        </span>
    );
});