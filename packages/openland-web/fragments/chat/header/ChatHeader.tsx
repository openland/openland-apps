import * as React from 'react';
import { ChatInfo } from '../types';
import { XView, XViewRouterContext } from 'react-mental';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-web/utils/useClient';
import { XDate } from 'openland-x/XDate';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessagesActionsHeader } from './MessagesActionsHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import InviteIcon from 'openland-icons/s/ic-invite-24.svg';
import SettingsIcon from 'openland-icons/s/ic-settings-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import NotificationsOffIcon from 'openland-icons/s/ic-notifications-off-24.svg';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { showAddMembersModal } from '../showAddMembersModal';
import {
    showRoomEditModal,
    showLeaveChatConfirmation,
} from 'openland-web/fragments/account/components/groupProfileModals';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { TextDensed, TextStyles, HoverAlpha } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';
import { useLastSeen } from 'openland-y-utils/LastSeen';

const secondary = css`
    color: var(--foregroundSecondary);
    padding-left: 4px;
`;
const secondaryAccent = css`
    color: var(--accentPrimary);
`;

const titleStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const oneLiner = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const HeaderLastSeen = (props: { id: string }) => {
    const client = useClient();
    const data = client.useWithoutLoaderOnline(
        { userId: props.id },
        {
            fetchPolicy: 'network-only',
        },
    );

    useLastSeen(data ? data.user.online : false);

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
        return <span className={secondaryAccent}>online</span>;
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
        <span className={secondaryAccent}>
            &nbsp;&nbsp;
            {`${onlineCount} online`}
        </span>
    );
};

const CallButton = (props: { chat: ChatInfo; calls: CallsEngine }) => {
    let callsState = props.calls.useState();
    return callsState.conversationId !== props.chat.id ? (
        <UIconButton
            icon={<PhoneIcon />}
            onClick={() =>
                props.calls.joinCall(
                    props.chat.id,
                    props.chat.__typename === 'PrivateRoom',
                    props.chat.__typename === 'PrivateRoom'
                        ? {
                            id: props.chat.user.id,
                            title: props.chat.user.name,
                            picture: props.chat.user.photo,
                        }
                        : { id: props.chat.id, title: props.chat.title, picture: props.chat.photo },
                )
            }
            size="large"
        />
    ) : null;
};

const MenuComponent = (props: { ctx: UPopperController; id: string }) => {
    let layout = useLayout();
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
    let chat = client.useRoomChat({ id: props.id }, { fetchPolicy: 'cache-first' }).room!;
    let calls = React.useContext(MessengerContext).calls;

    let [muted, setMuted] = React.useState(chat.settings.mute);

    let res = new UPopperMenuBuilder();
    if (layout === 'mobile' && chat.__typename === 'SharedRoom') {
        res.item({
            title: 'Add people',
            icon: <InviteIcon />,
            action: () =>
                showAddMembersModal({ id: chat.id, isGroup: true, isOrganization: false }),
        });
    }

    if (layout === 'mobile' && (chat.__typename === 'PrivateRoom' ? !chat.user.isBot : true)) {
        res.item({
            title: 'Call',
            icon: <PhoneIcon />,
            action: () =>
                calls.joinCall(
                    chat.id,
                    chat.__typename === 'PrivateRoom',
                    chat.__typename === 'PrivateRoom'
                        ? { id: chat.user.id, title: chat.user.name, picture: chat.user.photo }
                        : { id: chat.id, title: chat.title, picture: chat.photo },
                ),
        });
    }

    res.item({
        title: `${muted ? 'Unmute' : 'Mute'} notifications`,
        icon: muted ? <NotificationsOffIcon /> : <NotificationsIcon />,
        action: async () => {
            let newMuted = !chat.settings.mute;
            client.mutateRoomSettingsUpdate({ roomId: chat.id, settings: { mute: newMuted } });
            setMuted(newMuted);
        },
        closeDelay: 400,
    });

    if (chat.__typename === 'SharedRoom') {
        res.item({
            title: 'Settings',
            icon: <SettingsIcon />,
            action: () => showRoomEditModal(chat.id),
        });
        if (
            chat.role === 'OWNER' ||
            chat.role === 'ADMIN' ||
            (chat.organization && (chat.organization.isAdmin || chat.organization.isOwner))
        ) {
            res.item({
                title: 'Advanced settings',
                icon: <StarIcon />,
                action: () => router.navigate(`/advanced/${chat.id}`),
            });
        }
        res.item({
            title: 'Leave chat',
            icon: <LeaveIcon />,
            action: () => showLeaveChatConfirmation(client, chat.id),
        });
    }

    return res.build(props.ctx, 240);
};

export const ChatHeader = React.memo((props: { chat: ChatInfo }) => {
    const { chat } = props;
    const layout = useLayout();
    const calls = React.useContext(MessengerContext).calls;
    const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;
    const path =
        chat.__typename === 'PrivateRoom'
            ? `/${chat.user.shortname || chat.user.id}`
            : `/group/${chat.id}`;
    const showCallButton =
        layout === 'desktop' && (chat.__typename === 'PrivateRoom' ? !chat.user.isBot : true);
    const showInviteButton = !!(layout === 'desktop' && chat.__typename === 'SharedRoom');
    const titleEmojify = React.useMemo(() => emoji(title), [title]);

    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexBasis={0}
            minWidth={0}
            position="relative"
            justifyContent="space-between"
        >
            <XView
                hoverOpacity={HoverAlpha}
                flexDirection="row"
                flexGrow={0}
                minWidth={0}
                path={path}
                cursor="pointer"
            >
                <XView paddingTop={8} paddingRight={16}>
                    <UAvatar
                        size="medium"
                        title={title}
                        photo={photo}
                        id={chat.__typename === 'PrivateRoom' ? chat.user.id : chat.id}
                    />
                </XView>
                <XView
                    flexDirection="column"
                    flexGrow={1}
                    flexBasis={0}
                    minWidth={0}
                    paddingRight={16}
                >
                    <XView
                        flexDirection="column"
                        flexGrow={1}
                        flexBasis={0}
                        minWidth={0}
                        maxWidth="100%"
                        alignSelf="flex-start"
                        color="var(--foregroundPrimary)"
                    >
                        <XView
                            fontSize={15}
                            marginTop={6}
                            height={24}
                            lineHeight="24px"
                            fontWeight="600"
                            overflow="hidden"
                        >
                            <span className={titleStyle}>
                                {titleEmojify}
                                {chat.__typename === 'PrivateRoom' &&
                                    chat.user.primaryOrganization && (
                                        <span className={cx(secondary, TextDensed)}>
                                            {chat.user.primaryOrganization.name}
                                        </span>
                                    )}
                            </span>
                        </XView>
                        <XView {...TextStyles.Densed} color="var(--foregroundSecondary)">
                            <span className={oneLiner}>
                                {chat.__typename === 'PrivateRoom' && (
                                    <HeaderLastSeen id={chat.user.id} />
                                )}
                                {chat.__typename === 'SharedRoom' &&
                                    chat.membersCount !== null &&
                                    chat.membersCount !== 0 && (
                                        <>
                                            {chat.membersCount >= 1
                                                ? `${chat.membersCount} members`
                                                : `1 member`}
                                            <ChatOnlinesTitle id={chat.id} />
                                        </>
                                    )}
                            </span>
                        </XView>
                    </XView>
                </XView>
            </XView>
            <XView flexDirection="row" alignItems="center">
                {showInviteButton && (
                    <UIconButton
                        icon={<InviteIcon />}
                        onClick={() =>
                            showAddMembersModal({
                                id: chat.id,
                                isGroup: true,
                                isOrganization: false,
                            })
                        }
                        size="large"
                    />
                )}
                {showCallButton && <CallButton chat={chat} calls={calls} />}

                <UMoreButton
                    menu={ctx => (
                        <React.Suspense fallback={<div style={{ width: 240, height: 100 }} />}>
                            <MenuComponent ctx={ctx} id={chat.id} />
                        </React.Suspense>
                    )}
                    useWrapper={false}
                    size="large-densed"
                />
            </XView>
            <MessagesActionsHeader chatId={chat.id} />
        </XView>
    );
});
