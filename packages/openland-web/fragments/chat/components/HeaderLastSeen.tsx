import * as React from 'react';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';

const statusOffline = css`
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
`;

const statusOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
`;

export const HeaderLastSeen = (props: { variables: { userId: string } }) => {
    const client = useClient();
    const { user } = client.useOnline(props.variables, {
        fetchPolicy: 'network-only',
    });
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
