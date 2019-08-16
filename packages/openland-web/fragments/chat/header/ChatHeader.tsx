import * as React from 'react';
import { ChatInfo } from '../types';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useClient } from 'openland-web/utils/useClient';
import { XDate } from 'openland-x/XDate';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessagesActionsHeader } from './MessagesActionsHeader';
import { showAvatarModal } from 'openland-web/components/showAvatarModal';
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
import { showRoomEditModal, showLeaveChatConfirmation } from 'openland-web/fragments/account/components/groupProfileModals';
import { showAdvancedSettingsModal } from '../AdvancedSettingsModal';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { TextDensed } from 'openland-web/utils/TextStyles';

const secondary = css`
    color: var(--foregroundSecondary);
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

const oneLiner = css`
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
        <span className={secondadyAcent}>&nbsp;&nbsp;{`${onlineCount} online`}</span>
    );
};

const CallButton = (props: { chat: ChatInfo, calls: CallsEngine }) => {
    let callsState = props.calls.useState();
    return callsState.conversationId !== props.chat.id ? (
        <UIconButton
            icon={<PhoneIcon />}
            onClick={() => props.calls.joinCall(props.chat.id, props.chat.__typename === 'PrivateRoom')}
            size="large"
        />
    ) : null;
};

const MenuComponent = (props: { ctx: UPopperController, id: string }) => {
    let layout = useLayout();
    const client = useClient();
    let chat = client.useRoomChat({ id: props.id }, { fetchPolicy: 'cache-first' }).room!;
    let calls = React.useContext(MessengerContext).calls;

    let [muted, setMuted] = React.useState(chat.settings.mute);

    let res = new UPopperMenuBuilder();
    if (layout === 'mobile') {
        res.item({ title: 'Call', icon: <PhoneIcon />, action: () => calls.joinCall(chat.id, chat.__typename === 'PrivateRoom') });
    }

    if (chat.__typename === 'SharedRoom') {
        res.item({ title: 'Add people', icon: <InviteIcon />, action: () => showAddMembersModal({ id: chat.id, isGroup: true, isOrganization: false }) });
    }

    res.item({
        title: `${muted ? 'Unmute' : 'Mute'} notifications`, icon: muted ? <NotificationsOffIcon /> : <NotificationsIcon />,
        action: async () => {
            let newMuted = !chat.settings.mute;
            client.mutateRoomSettingsUpdate({ roomId: chat.id, settings: { mute: newMuted } });
            setMuted(newMuted);
        },
        closeDelay: 400
    });

    if (chat.__typename === 'SharedRoom') {
        res.item({ title: 'Settings', icon: <SettingsIcon />, action: () => showRoomEditModal(chat.id) });
        res.item({ title: 'Advanced settings', icon: <StarIcon />, action: () => showAdvancedSettingsModal(chat.id) });
        res.item({ title: 'Leave chat', icon: <LeaveIcon />, action: () => showLeaveChatConfirmation(client, chat.id) });
    }

    return (
        // hack for fixing jumping nitifications item
        <XView flexDirection="column" width={500} alignItems="flex-end">
            {res.build(props.ctx)}
        </XView>
    );
};

export const ChatHeader = React.memo((props: { chat: ChatInfo }) => {
    const layout = useLayout();
    let calls = React.useContext(MessengerContext).calls;
    let title = props.chat.__typename === 'PrivateRoom' ? props.chat.user.name : props.chat.title;
    let photo = props.chat.__typename === 'PrivateRoom' ? props.chat.user.photo : props.chat.photo;

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
                    color="var(--foregroundPrimary)"
                    hoverColor="var(--accentPrimary)"
                    cursor="pointer"
                    overflow="hidden"
                    path={props.chat.__typename === 'PrivateRoom' ? `/${props.chat.user.shortname || props.chat.user.id}` : `/group/${props.chat.id}`}
                >
                    <span className={titleStyle}>
                        {title}
                        {props.chat.__typename === 'PrivateRoom' && props.chat.user.primaryOrganization && (
                            <span className={cx(secondary, TextDensed)}>{props.chat.user.primaryOrganization.name}</span>
                        )}
                    </span>
                </XView>
                <XView
                    fontSize={13}
                    lineHeight="18px"
                    fontWeight="600"
                    color="var(--foregroundTertiary)"
                >
                    {props.chat.__typename === 'PrivateRoom' && (
                        <HeaderLastSeen id={props.chat.user.id} />
                    )}
                    {props.chat.__typename === 'SharedRoom' && props.chat.membersCount !== null && props.chat.membersCount !== 0 && (
                        <span className={cx(oneLiner, TextDensed)}>
                            {props.chat.membersCount >= 1 ? `${props.chat.membersCount} members` : `1 member`}
                            <ChatOnlinesTitle id={props.chat.id} />
                        </span>
                    )}
                </XView>
            </XView>
            <XView flexDirection="row" alignItems="center">
                {layout === 'desktop' && <CallButton chat={props.chat} calls={calls} />}

                <UMoreButton
                    menu={(ctx) =>
                        <React.Suspense fallback={<div style={{ width: 500, height: 100 }} />}>
                            <MenuComponent ctx={ctx} id={props.chat.id} />
                        </React.Suspense>
                    }
                    useWrapper={false}
                    size="large-wide"
                />
            </XView>
            <MessagesActionsHeader chatId={props.chat.id} />
        </XView>
    );
});