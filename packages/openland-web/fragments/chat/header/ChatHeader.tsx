import * as React from 'react';
import { ChatInfo } from '../types';
import { XView, XViewRouterContext } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-web/utils/useClient';
import { XDate } from 'openland-x/XDate';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessagesActionsHeader } from './MessagesActionsHeader';
import { showAvatarModal } from 'openland-web/components/showAvatarModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import MoreIcon from 'openland-icons/s/ic-more-v-24.svg';

const secondary = css`
    color: #969AA3;
    padding-left: 4px;
`;
const secondadyAcent = css`
    color: #1885F2;
`;

const titleStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const menuButton = css`
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6;
    margin-right: -56px;
`;

const menuButtonSelected = css`
    opacity: 0.64;
`;

const onLiner = css`
   height: 18px;
   overflow: hidden;
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

const ChatOnlinesTitle = (props: { id: string }) => {
    let client = useClient();
    let [onlineCount, setOnlineCount] = React.useState<number>(0);

    getChatOnlinesCount(props.id, client, count => setOnlineCount(count));

    if (onlineCount <= 0) {
        return null;
    }

    return (
        <span>{', '}<span className={secondadyAcent}>{`${onlineCount} online`}</span></span>
    );
};

const CallButton = (props: { chat: ChatInfo, calls: CallsEngine }) => {
    let callsState = props.calls.useState();

    return callsState.conversationId !== props.chat.id ? (
        <UButton
            text="Call"
            style="secondary"
            marginRight={8}
            onClick={() => props.calls.joinCall(props.chat.id, props.chat.__typename === 'PrivateRoom')}
        />
    ) : null;
};

export const ChatHeader = React.memo((props: { chat: ChatInfo }) => {
    let calls = React.useContext(MessengerContext).calls;
    let title = props.chat.__typename === 'PrivateRoom' ? props.chat.user.name : props.chat.title;
    let photo = props.chat.__typename === 'PrivateRoom' ? props.chat.user.photo : props.chat.photo;
    let router = React.useContext(XViewRouterContext);
    let layout = useLayout();
    const [menuVisible, menuShow] = usePopper(
        { placement: 'bottom-end', hideOnClick: true },
        (ctx) => new UPopperMenuBuilder()
            .item({ title: 'Call', action: () => calls.joinCall(props.chat.id, props.chat.__typename === 'PrivateRoom') })
            .item({
                title: props.chat.__typename === 'PrivateRoom' ? 'Profile' : 'Info',
                action: () => {
                    router!.navigate(props.chat.__typename === 'PrivateRoom' ? `/${props.chat.user.id}` : `/group/${props.chat.id}`);
                }
            })
            .build(ctx)
    );

    return (
        <XView flexDirection="row" flexGrow={1} flexBasis={0} minWidth={0} position="relative">
            <XView paddingTop={8} paddingRight={16}>
                <UAvatar
                    size="medium"
                    title={title}
                    photo={photo}
                    id={props.chat.__typename === 'PrivateRoom' ? props.chat.user.id : props.chat.id}
                    onClick={photo && !photo.startsWith('ph://') ? () => showAvatarModal(photo!) : undefined}
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
                    overflow="hidden"
                    path={props.chat.__typename === 'PrivateRoom' ? `/${props.chat.user.shortname || props.chat.user.id}` : `/group/${props.chat.id}`}
                >
                    <span className={titleStyle}>
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
                    {props.chat.__typename === 'PrivateRoom' && (
                        <HeaderLastSeen id={props.chat.user.id} />
                    )}
                    {props.chat.__typename === 'SharedRoom' && props.chat.membersCount !== null && props.chat.membersCount !== 0 && (
                        <span className={onLiner}>
                            {props.chat.membersCount >= 1 ? `${props.chat.membersCount} members` : `1 member`}
                            <ChatOnlinesTitle id={props.chat.id} />
                        </span>
                    )}
                </XView>
            </XView>
            {layout === 'desktop' && <XView alignSelf="center" flexDirection="row">
                <CallButton chat={props.chat} calls={calls} />
                {props.chat.__typename === 'PrivateRoom'
                    ? (<UButton text="Profile" style="secondary" path={`/${props.chat.user.id}`} />)
                    : (<UButton text="Info" style="secondary" path={`/group/${props.chat.id}`} />)
                }
            </XView>}
            {layout === 'mobile' && (
                <div className={cx(menuButton, menuVisible && menuButtonSelected)} onClick={menuShow}>
                    <UIcon icon={<MoreIcon />} color={ThemeDefault.foregroundTertiary} />
                </div>
            )}
            <MessagesActionsHeader chatId={props.chat.id} />

        </XView>
    );
});