import * as React from 'react';
import { XView } from 'react-mental';
import { normalizeUrl } from 'openland-x-utils/normalizeUrl';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-api/useClient';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { MessagesActionsHeader } from './MessagesActionsHeader';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import ExternalCallIcon from 'openland-icons/s/ic-call-external-24.svg';
import InviteIcon from 'openland-icons/s/ic-invite-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import SettingsIcon from 'openland-icons/s/ic-edit-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import AttachIcon from 'openland-icons/s/ic-attach-24-1.svg';
import NotificationsOffIcon from 'openland-icons/s/ic-notifications-off-24.svg';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import SearchIcon from 'openland-icons/s/ic-search-24.svg';
import MutedIcon from 'openland-icons/s/ic-muted-16.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { showAddMembersModal } from '../showAddMembersModal';
import {
    showLeaveChatConfirmation,
    showRoomEditModal,
} from 'openland-web/fragments/settings/components/groupProfileModals';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { HoverAlpha, TextDensed, TextStyles } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';
import { useLastSeen, User } from 'openland-y-utils/LastSeen';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { PremiumBadge } from 'openland-web/components/PremiumBadge';
import { useVideoCallModal } from 'openland-web/modules/conference/CallModal';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { groupInviteCapabilities } from 'openland-y-utils/InviteCapabilities';
import { RoomCallsMode, RoomChat_room } from 'openland-api/spacex.types';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';
const secondary = css`
    color: var(--foregroundSecondary);
    padding-left: 4px;
`;

const secondaryAccent = css`
    color: var(--accentPrimary);
`;

const featuredIcon = css`
    display: var(--featured-icon-display);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: 4px;
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

const CallButton = (props: { chat: RoomChat_room; messenger: MessengerEngine }) => {
    const calls = props.messenger.calls;
    const callSettings =
        props.chat.__typename === 'SharedRoom' ? props.chat.callSettings : undefined;
    const currentSession = calls.useCurrentSession();
    const showVideoCallModal = useVideoCallModal({ chatId: props.chat.id });

    return (
        <div
            className={cx(
                currentSession && currentSession.conversationId === props.chat.id && disabledBtn,
            )}
        >
            {callSettings && callSettings.mode === RoomCallsMode.LINK ? (
                <UIconButton
                    icon={<ExternalCallIcon />}
                    as={'a'}
                    href={normalizeUrl(callSettings.callLink)}
                    target={'_blank'}
                    size="large"
                />
            ) : (
                <UIconButton
                    icon={<PhoneIcon />}
                    onClick={() => {
                        calls.joinCall(props.chat.id);
                        showVideoCallModal();
                    }}
                    size="large"
                />
            )}
        </div>
    );
};

const MenuComponent = (props: { ctx: UPopperController; id: string; savedMessages?: boolean, onSearchClick: () => void }) => {
    const layout = useLayout();
    const client = useClient();
    const tabRouter = useTabRouter();
    const chat = client.useRoomChat({ id: props.id }, { fetchPolicy: 'cache-first' }).room!;
    const messenger = React.useContext(MessengerContext);
    const [muted, setMuted] = React.useState(chat.settings.mute);
    const calls = messenger.calls;
    const currentSession = calls.useCurrentSession();
    const showVideoCallModal = useVideoCallModal({ chatId: chat.id });

    const privateRoom = chat.__typename === 'PrivateRoom' ? chat : undefined;
    const sharedRoom = chat.__typename === 'SharedRoom' ? chat : undefined;

    const chatUser = privateRoom && privateRoom.user;
    const { isContact } = useLocalContact(
        chatUser ? chatUser.id : '',
        chatUser ? chatUser.inContacts : false,
    );
    const toastHandlers = useToast();

    const { canAddDirectly, canGetInviteLink } = groupInviteCapabilities(chat);
    const showInviteButton = layout === 'mobile' && (canAddDirectly || canGetInviteLink);

    let res = new UPopperMenuBuilder();
    if (showInviteButton) {
        res.item({
            title: 'Add people',
            icon: <InviteIcon />,
            action: () =>
                showAddMembersModal({ id: chat.id, isGroup: true, isOrganization: false }),
        });
    }

    if (
        !props.savedMessages &&
        layout === 'mobile' &&
        (privateRoom
            ? !privateRoom.user.isBot
            : sharedRoom
            ? sharedRoom.callSettings.mode === RoomCallsMode.STANDARD
            : true)
    ) {
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

    if (
        sharedRoom &&
        sharedRoom.callSettings.mode === RoomCallsMode.LINK &&
        sharedRoom.callSettings.callLink
    ) {
        res.item({
            title: 'Call',
            icon: <ExternalCallIcon />,
            action: () => {
                window.open(normalizeUrl(sharedRoom.callSettings.callLink), '_blank');
            },
        });
    }

    if (!props.savedMessages) {
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
    }

    res.item({
        title: 'Search messages',
        icon: <SearchIcon />,
        action: props.onSearchClick,
        closeDelay: 400,
    });

    res.item({
        title: 'Media, files, links',
        icon: <AttachIcon />,
        path: `/mail/${props.id}/shared`,
        closeDelay: 400,
    });

    if (privateRoom && privateRoom.user.id !== messenger.user.id) {
        res.item({
            title: isContact ? 'Remove from contacts' : 'Add to contacts',
            icon: isContact ? <RemoveContactIcon /> : <AddContactIcon />,
            closeAfterAction: false,
            action: async () => {
                if (isContact) {
                    await client.mutateRemoveFromContacts({ userId: privateRoom.user.id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Removed from contacts',
                    });
                } else {
                    await client.mutateAddToContacts({ userId: privateRoom.user.id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Added to contacts',
                    });
                }
            },
            closeDelay: 400,
        });
    }

    if (sharedRoom) {
        if (sharedRoom.canEdit) {
            res.item({
                title: sharedRoom.isChannel ? 'Edit channel' : 'Edit group',
                icon: <SettingsIcon />,
                action: () => showRoomEditModal(sharedRoom.id, sharedRoom.isChannel),
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
                    sharedRoom && sharedRoom.isPremium,
                    sharedRoom.kind === 'PUBLIC',
                ),
        });
    }

    return res.build(props.ctx, 240);
};

export const ChatHeader = React.memo((props: { chat: RoomChat_room, onSearchClick: () => void }) => {
    const { chat, onSearchClick } = props;
    const layout = useLayout();
    const messenger = React.useContext(MessengerContext);

    const privateRoom = chat.__typename === 'PrivateRoom' ? chat : undefined;
    const sharedRoom = chat.__typename === 'SharedRoom' ? chat : undefined;

    const isSavedMessages = privateRoom && messenger.user.id === privateRoom.user.id;
    const title = privateRoom ? privateRoom.user.name : sharedRoom!.title;
    const photo = privateRoom ? privateRoom.user.photo : sharedRoom!.photo;
    const path = isSavedMessages
        ? `/mail/${chat.id}/shared`
        : privateRoom
        ? `/${privateRoom.user.shortname || privateRoom.user.id}`
        : `/group/${chat.id}`;
    const showCallButton =
        !isSavedMessages &&
        layout === 'desktop' &&
        (privateRoom
            ? !privateRoom.user.isBot
            : sharedRoom
            ? sharedRoom.callSettings.mode !== RoomCallsMode.DISABLED
            : true);
    const titleEmojify = isSavedMessages
        ? 'Saved messages'
        : React.useMemo(() => emoji(title), [title]);

    const { canAddDirectly, canGetInviteLink } = groupInviteCapabilities(chat);
    const showInviteButton = layout === 'desktop' && (canAddDirectly || canGetInviteLink);

    const highlightFeaturedChat = sharedRoom && sharedRoom.featured;

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
                        id={privateRoom ? privateRoom.user.id : sharedRoom!.id}
                        savedMessages={isSavedMessages}
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
                        justifyContent={isSavedMessages ? 'center' : undefined}
                    >
                        <XView
                            fontSize={15}
                            marginTop={isSavedMessages ? 0 : 6}
                            height={24}
                            lineHeight="24px"
                            fontWeight="600"
                            overflow="hidden"
                            flexDirection="row"
                            alignItems="center"
                        >
                            {sharedRoom && sharedRoom.isPremium && <PremiumBadge />}
                            <span className={titleStyle}>
                                {titleEmojify}
                                {!isSavedMessages &&
                                    privateRoom &&
                                    privateRoom.user.primaryOrganization && (
                                        <span className={cx(secondary, TextDensed)}>
                                            {privateRoom.user.primaryOrganization.name}
                                        </span>
                                    )}
                            </span>
                            {highlightFeaturedChat && (
                                <div className={featuredIcon}>
                                    <UIcon
                                        icon={<IcFeatured />}
                                        color={'#3DA7F2' /* special: verified/featured color */}
                                    />
                                </div>
                            )}
                            {chat.settings.mute && (
                                <UIcon
                                    className={mutedIcon}
                                    icon={<MutedIcon />}
                                    color="var(--foregroundQuaternary)"
                                    size={16}
                                />
                            )}
                        </XView>
                        {!isSavedMessages && (
                            <XView {...TextStyles.Densed} color="var(--foregroundSecondary)">
                                <span className={oneLiner}>
                                    {privateRoom && <HeaderLastSeen user={privateRoom.user} />}
                                    {sharedRoom &&
                                        sharedRoom.membersCount !== null &&
                                        sharedRoom.membersCount !== 0 && (
                                            <>
                                                {sharedRoom.membersCount >= 1
                                                    ? `${sharedRoom.membersCount} members`
                                                    : `1 member`}
                                                <ChatOnlinesTitle id={chat.id} />
                                            </>
                                        )}
                                </span>
                            </XView>
                        )}
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
                            <MenuComponent ctx={ctx} id={chat.id} savedMessages={isSavedMessages} onSearchClick={onSearchClick}/>
                        </React.Suspense>
                    )}
                    size="large-densed"
                />
            </XView>
            <MessagesActionsHeader chat={chat} />
        </XView>
    );
});
