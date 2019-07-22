import * as React from 'react';
import { ChatInfo } from '../types';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-web/utils/useClient';
import { XDate } from 'openland-x/XDate';

const secondary = css`
    color: #969AA3;
    padding-left: 4px;
`;
const secondadyAcent = css`
    color: #1885F2;
`;

const HeaderLastSeen = (props: { id: string }) => {
    const client = useClient();
    const data = client.useWithoutLoaderOnline({ userId: props.id }, {
        fetchPolicy: 'network-only',
    });

    if (!data) {
        return null;
    }

    const { user } = data;
    if (user && (user.lastSeen && user.lastSeen !== 'online' && !user.online)) {
        return (
            <span>
                last seen{' '}
                {user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                        <XDate value={user.lastSeen} format="humanize_cute" />
                    )}
            </span>
        );
    } else if (user && user.online) {
        return <span className={secondadyAcent}>online</span>;
    } else {
        return null;
    }
};

export const ChatHeader = React.memo((props: { chat: ChatInfo }) => {
    let title = props.chat.__typename === 'PrivateRoom' ? props.chat.user.name : props.chat.title;
    let photo = props.chat.__typename === 'PrivateRoom' ? props.chat.user.photo : props.chat.photo;
    return (
        <XView flexDirection="row" flexGrow={1} flexBasis={0} minWidth={0}>
            <XView paddingTop={8} paddingRight={16}>
                <UAvatar
                    size="medium"
                    title={title}
                    photo={photo}
                    id={props.chat.__typename === 'PrivateRoom' ? props.chat.user.id : props.chat.id}
                />
            </XView>
            <XView flexDirection="column" flexGrow={1} flexBasis={0} minWidth={0}>
                <XView
                    fontSize={15}
                    marginTop={6}
                    height={24}
                    lineHeight="24px"
                    fontWeight="600"
                    color={ThemeDefault.foregroundPrimary}
                    hoverColor={ThemeDefault.accentPrimary}
                    cursor="pointer"
                    path={props.chat.__typename === 'PrivateRoom' ? `/${props.chat.user.shortname || props.chat.user.id}` : `/group/${props.chat.id}`}
                >
                    <span>
                        {title}
                        {props.chat.__typename === 'PrivateRoom' && props.chat.user.primaryOrganization && (
                            <span className={secondary}>{props.chat.user.primaryOrganization.name}</span>
                        )}
                    </span>
                </XView>
                <XView
                    fontSize={13}
                    lineHeight="18px"
                    fontWeight="600"
                    color={ThemeDefault.foregroundTertiary}
                >
                    {props.chat.__typename === 'PrivateRoom' ? <HeaderLastSeen id={props.chat.user.id} /> : null}
                </XView>
            </XView>
        </XView>
    );
});