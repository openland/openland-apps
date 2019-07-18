import * as React from 'react';
import { ChatInfo } from '../types';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

const secondary = css`
    color: #969AA3;
    padding-left: 4px;
`;

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
                    Subtitle
                </XView>
            </XView>
        </XView>
    );
});