import * as React from 'react';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';

const statusOffline = css`
    color: #7A7A7A;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: 0.2px;
`;

const statusOnline = css`
    color: #1885F2;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    letter-spacing: 0.2px;
`;

export const HeaderLastSeen = (props: { variables: { userId: string } }) => {
    const client = useClient();
    const data = client.useOnline(props.variables, {
        fetchPolicy: 'network-only',
    });

    if (!data) {
        return null;
    }

    const { user } = data;
    if (user && (user.lastSeen && user.lastSeen !== 'online' && !user.online)) {
        return (
            <div className={statusOffline}>
                last seen{' '}
                {user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (user && user.online) {
        return <div className={statusOnline}>online</div>;
    } else {
        return null;
    }
};
