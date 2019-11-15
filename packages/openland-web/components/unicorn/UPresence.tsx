import * as React from 'react';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { UserShort } from 'openland-api/Types';
import { XViewSelectedContext } from 'react-mental';

interface UPresenceProps {
    user: UserShort;
    suffix?: string | JSX.Element;
}

export const UPresence = ((props: UPresenceProps) => {
    const selected = React.useContext(XViewSelectedContext);
    const [sub, accent] = useLastSeen(props.user);

    return (
        <span>
            <span style={{ color: accent && !selected ? 'var(--accentPrimary)' : undefined }}>
                {sub}
            </span>
            {props.suffix}
        </span>
    );
});