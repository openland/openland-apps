import * as React from 'react';
import { ChatInfo } from '../types';
import { XView } from 'react-mental';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-api/useClient';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessagesActionsHeader } from './MessagesActionsHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import InviteIcon from 'openland-icons/s/ic-invite-24.svg';
import SettingsIcon from 'openland-icons/s/ic-edit-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import AttachIcon from 'openland-icons/s/ic-attach-24-1.svg';
import NotificationsOffIcon from 'openland-icons/s/ic-notifications-off-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import MutedIcon from 'openland-icons/s/ic-muted-16.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { showAddMembersModal } from '../showAddMembersModal';
import {
    showRoomEditModal,
    showLeaveChatConfirmation,
} from 'openland-web/fragments/settings/components/groupProfileModals';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { TextDensed, TextStyles, HoverAlpha } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';
import { useLastSeen, User } from 'openland-y-utils/LastSeen';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { PremiumBadge } from 'openland-web/components/PremiumBadge';
import { useVideoCallModal } from 'openland-web/modules/conference/CallModal';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';

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

const mutedIcon = css`
    margin: 2px 0 0 4px;
    flex-grow: 0;
    flex-shrink: 0;
`;

const disabledBtn = css`
    opacity: 0.24;
    pointer-events: none;
`;

const HeaderLastSeen = (props: { user: User }) => {
    // change to UPresence?
    const [sub, accent] = useLastSeen(props.user);

    return <span className={accent ? secondaryAccent : undefined}>{sub}</span>;
};

const ChatOnlinesTitle = (props: { id: string }) => {
    const client = useClient();
    const [onlineCount, setOnlineCount] = React.useState<number>(0);

    getChatOnlinesCount(props.id, client, (count) => setOnlineCount(count));

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

const CallButton = (props: { chat: ChatInfo; messenger: MessengerEngine }) => {
    const calls = props.messenger.calls;
    const currentSession = calls.useCurrentSession();
    const showVideoCallModal = useVideoCallModal({ chatId: props.chat.id });

    return (
        <div
            className={cx(
                currentSession && currentSession.conversationId === props.chat.id && disabledBtn,
            )}
        >
            <UIconButton
                icon={<PhoneIcon />}
                onClick={() => {
                    calls.joinCall(props.chat.id);
                    showVideoCallModal();
                }}
                size="large"
            />
        </div>
    );
};

const MenuComponent = (props: { ctx: UPopperController; id: string }) => {
    const layout = useLayout();
    const client = useClient();
    const tabRouter = useTabRouter();
    const chat = client.useRoomChat({ id: props.id }, { fetchPolicy: 'cache-first' }).room!;
    const messenger = React.useContext(MessengerContext);
    const [muted, setMuted] = React.useState(chat.settings.mute);
    const sharedRoom = chat.__typename === 'SharedRoom' && chat;
    const calls = messenger.calls;
    const currentSession = calls.useCurrentSession();
    const showVideoCallModal = useVideoCallModal({ chatId: chat.id });
    const chatUser = chat.__typename === 'PrivateRoom' && chat.user;
    const { isContact, addContact, removeContact } = useLocalContact(chatUser ? chatUser.id : '', chatUser ? chatUser.inContacts : false);

    let showInviteButton = layout === 'mobile' && sharedRoom;
    const onlyLinkInvite = sharedRoom && !(!sharedRoom.isPremium || sharedRoom.role === 'OWNER');

    if (sharedRoom && sharedRoom.organization && sharedRoom.organization.private && sharedRoom.role === 'MEMBER') {
        if (onlyLinkInvite) {
            showInviteButton = false;
        }
    }

    let res = new UPopperMenuBuilder();
    if (showInviteButton) {
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
            action: () => {
                calls.joinCall(chat.id);
                showVideoCallModal();
            },
            disabled: currentSession ? currentSession.conversationId === chat.id : false,
        });
    }

    res.item({
        title: `${muted ? 'Unmute' : 'Mute'} notifications`,
        icon: muted ? <NotificationsIcon /> : <NotificationsOffIcon />,
        action: async () => {
            let newMuted = !chat.settings.mute;
            client.mutateRoomSettingsUpdate({ roomId: chat.id, settings: { mute: newMuted } });
            setMuted(newMuted);
        },
        closeDelay: 400,
    });

    res.item({
        title: 'Media, files, links',
        icon: <AttachIcon />,
        path: `/mail/${props.id}/shared`,
        closeDelay: 400,
    });

    let contactsEnabled = false;

    if (
        contactsEnabled &&
        chat.__typename === 'PrivateRoom' &&
        chat.user.id !== messenger.user.id
    ) {

        res.item({
            title: isContact ? 'Remove from contacts' : 'Save to contacts',
            icon: isContact ? <RemoveContactIcon /> : <AddContactIcon />,
            action: async () => {
                if (isContact) {
                    removeContact(chat.user.id);
                    await client.mutateRemoveFromContacts({ userId: chat.user.id });
                } else {
                    addContact(chat.user.id);
                    await client.mutateAddToContacts({ userId: chat.user.id });
                }
            },
            closeDelay: 400,
        });
    }

    if (chat.__typename === 'SharedRoom') {
        if (chat.canEdit) {
            res.item({
                title: chat.isChannel ? 'Edit channel' : 'Edit group',
                icon: <SettingsIcon />,
                action: () => showRoomEditModal(chat.id, chat.isChannel),
            });
        }
        res.item({
            title: 'Leave chat',
            icon: <LeaveIcon />,
            action: () =>
                showLeaveChatConfirmation(
                    client,
                    chat.id,
                    tabRouter,
                    chat.__typename === 'SharedRoom' && chat.isPremium,
                    chat.kind === 'PUBLIC',
                ),
        });
    }

    return res.build(props.ctx, 240);
};

export const ChatHeader = React.memo((props: { chat: ChatInfo }) => {
    const { chat } = props;
    const layout = useLayout();
    const messenger = React.useContext(MessengerContext);
    const sharedRoom = chat.__typename === 'SharedRoom' && chat;
    const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;
    const path =
        chat.__typename === 'PrivateRoom'
            ? `/${chat.user.shortname || chat.user.id}`
            : `/group/${chat.id}`;
    const showCallButton =
        layout === 'desktop' && (chat.__typename === 'PrivateRoom' ? !chat.user.isBot : true);
    const titleEmojify = React.useMemo(() => emoji(title), [title]);

    let showInviteButton = layout === 'desktop' && sharedRoom;
    const onlyLinkInvite = sharedRoom && !(!sharedRoom.isPremium || sharedRoom.role === 'OWNER');

    if (sharedRoom && sharedRoom.organization && sharedRoom.organization.private && sharedRoom.role === 'MEMBER') {
        if (onlyLinkInvite) {
            showInviteButton = false;
        }
    }

    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexBasis={0}
            minWidth={0}
            position="relative"
            justifyContent="space-between"
            paddingHorizontal={16}
        >
            <XView
                hoverOpacity={HoverAlpha}
                flexDirection="row"
                flexShrink={1}
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
                            flexDirection="row"
                            alignItems="center"
                        >
                            {chat.__typename === 'SharedRoom' && chat.isPremium && <PremiumBadge />}
                            <span className={titleStyle}>
                                {titleEmojify}
                                {chat.__typename === 'PrivateRoom' &&
                                    chat.user.primaryOrganization && (
                                        <span className={cx(secondary, TextDensed)}>
                                            {chat.user.primaryOrganization.name}
                                        </span>
                                    )}
                            </span>
                            {chat.settings.mute && (
                                <UIcon
                                    className={mutedIcon}
                                    icon={<MutedIcon />}
                                    color="var(--foregroundQuaternary)"
                                    size={16}
                                />
                            )}
                        </XView>
                        <XView {...TextStyles.Densed} color="var(--foregroundSecondary)">
                            <span className={oneLiner}>
                                {chat.__typename === 'PrivateRoom' && (
                                    <HeaderLastSeen user={chat.user} />
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
                {showCallButton && <CallButton chat={chat} messenger={messenger} />}

                <UMoreButton
                    menu={(ctx) => (
                        <React.Suspense fallback={<div style={{ width: 240, height: 100 }} />}>
                            <MenuComponent ctx={ctx} id={chat.id} />
                        </React.Suspense>
                    )}
                    useWrapper={false}
                    size="large-densed"
                />
            </XView>
            <MessagesActionsHeader chat={chat} />
        </XView>
    );
});
