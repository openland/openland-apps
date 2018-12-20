import * as React from 'react';
import { withOnline } from 'openland-web/api/withOnline';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';

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

export const HeaderLastSeen = withOnline(props => {
    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <div className={statusOffline}>
                Last seen{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (props.data.user && props.data.user.online) {
        return <div className={statusOnline}>Online</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;
