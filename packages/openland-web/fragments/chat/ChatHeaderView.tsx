import * as React from 'react';
import { css } from 'linaria';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { Room, Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { RoomEditModal } from './RoomEditModal';
import { RoomAddMemberModal } from './RoomAddMemberModal';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { HeaderTitle } from './components/HeaderTitle';
import { HeaderSubtitle } from './components/HeaderSubtitle';
import { HeaderMuteButton } from './components/HeaderMuteButton';
import { HeaderLastSeen } from './components/HeaderLastSeen';
import { HeaderMenu } from './components/HeaderMenu';
import CloseChatIcon from 'openland-icons/ic-chat-back.svg';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { HideOnDesktop } from 'openland-web/components/Adaptive';
import { withRoom } from 'openland-web/api/withRoom';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { MessagesStateContextProps } from 'openland-web/components/messenger/MessagesStateContext';
import { XLoader } from 'openland-x/XLoader';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { InviteMembersModal } from 'openland-web/pages/main/channel/components/inviteMembersModal';
import { MessengerContext } from 'openland-engines/MessengerEngine';

const inviteButtonClass = css`
    & svg > g > path {
        transition: all 0.2s;
    }
    & svg > g > path:last-child {
        fill: #000000;
        opacity: 0.4;
    }
    &:active svg > g > path:last-child {
        fill: #ffffff;
        opacity: 0.4;
    }
`;

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    me: UserShort;
}

const ChatHeaderViewAbstract = XMemo(
    ({
        modals,
        headerPath,
        avatar,
        title,
        subtitle,
        rightButtons,
    }: {
        modals?: any;
        headerPath?: string;
        avatar?: any;
        title?: any;
        subtitle?: any;
        rightButtons?: any;
    }) => {
        return (
            <XView
                flexDirection="row"
                alignItems="center"
                maxWidth={950}
                width="100%"
                justifyContent="space-between"
                minWidth={0}
                flexShrink={1}
            >
                <HideOnDesktop>
                    <XView
                        as="a"
                        marginRight={20}
                        alignItems="center"
                        flexDirection="row"
                        path="/mail"
                    >
                        <CloseChatIcon />
                    </XView>
                </HideOnDesktop>
                <XView
                    flexDirection="row"
                    path={headerPath}
                    flexGrow={1}
                    minWidth={0}
                    flexShrink={1}
                    paddingRight={16}
                >
                    {avatar}
                    <XView marginLeft={16} minWidth={0} flexShrink={1}>
                        {title}
                        <XView marginTop={4}>{subtitle}</XView>
                    </XView>
                </XView>
                {rightButtons}

                {modals}
            </XView>
        );
    },
);

const CallButton = ({ room }: { room: Room_room_SharedRoom | Room_room_PrivateRoom }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callsState =  calls.useState();
    // const ctx = React.useContext(TalkContext);

    return callsState.conversationId !== room.id ? (
        <XButton text="Call" size="small" onClick={() => calls.joinCall(room.id)} />
    ) : null;
};

const RowWithSeparators = ({
    separatorWidth,
    children,
}: {
    separatorWidth: number;
    children: any;
}) => {
    const notEmptyChildrens = children.filter((item: any) => !!item);
    const finalChildren = [];
    for (let i = 0; i < notEmptyChildrens.length; i++) {
        if (i > 0) {
            finalChildren.push(<XView key={'separator_' + i} width={separatorWidth} />);
        }
        finalChildren.push(<div key={'item_' + i}>{notEmptyChildrens[i]}</div>);
    }
    return (
        <XView flexDirection="row" alignItems="center">
            {finalChildren}
        </XView>
    );
};

export const ChatHeaderView = XMemo<ChatHeaderViewProps>(({ room, me }) => {
    const isMobile = React.useContext(IsMobileContext);
    const state = React.useContext(MessagesStateContext);

    if (state.useForwardHeader) {
        return <ChatForwardHeaderView roomId={room.id} me={me} />;
    }

    let sharedRoom = room.__typename === 'SharedRoom' ? (room as Room_room_SharedRoom) : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? (room as Room_room_PrivateRoom) : null;

    let headerPath: string | undefined = undefined;
    let subtitle = undefined;
    let inviteButton = undefined;
    let threeDots = undefined;
    let modals = undefined;

    if (sharedRoom) {
        if (sharedRoom.kind === 'INTERNAL') {
            headerPath = '/mail/o/' + sharedRoom.organization!.id;
            subtitle = <HeaderSubtitle value="Organization" />;
        } else {
            headerPath = '/mail/p/' + sharedRoom.id;
            subtitle = (
                <HeaderSubtitle
                    value={
                        sharedRoom.membersCount +
                        (sharedRoom.membersCount === 1 ? ' member' : ' members')
                    }
                />
            );

            threeDots = <HeaderMenu room={sharedRoom} />;

            inviteButton = (
                <>
                    <XButton
                        text="Invite"
                        size="small"
                        icon={<PlusIcon />}
                        className={inviteButtonClass}
                        query={{ field: 'inviteMembers', value: 'true' }}
                    />
                    <RoomAddMemberModal
                        roomId={room.id}
                        refetchVars={{
                            roomId: room.id,
                        }}
                    />
                    <InviteMembersModal roomId={room.id} />
                </>
            );
        }
        modals = (
            <RoomEditModal
                title={sharedRoom.title}
                description={sharedRoom.description}
                photo={sharedRoom.photo}
                socialImage={sharedRoom.socialImage}
                roomId={sharedRoom.id}
            />
        );
    }

    if (privateRoom) {
        headerPath = '/mail/u/' + privateRoom.user.id;

        subtitle = <HeaderLastSeen variables={{ userId: privateRoom.user.id }} />;
    }

    const photo = sharedRoom ? sharedRoom.photo : privateRoom!!.user.photo;
    const avatarTitle = sharedRoom ? sharedRoom.title : privateRoom!!.user.name;
    const id = sharedRoom ? sharedRoom.id : privateRoom ? privateRoom.user.id : '';

    const avatar = <XAvatar2 size={36} src={photo} title={avatarTitle} id={id} />;
    const title = sharedRoom ? (
        <HeaderTitle key={sharedRoom.id} value={sharedRoom.title} />
    ) : (
        <HeaderTitle
            key={privateRoom!!.user.id}
            value={privateRoom!!.user.name}
            path={'/mail/u/' + privateRoom!!.user.id}
            organization={privateRoom!!.user.primaryOrganization}
        />
    );

    return (
        <ChatHeaderViewAbstract
            headerPath={headerPath}
            avatar={avatar}
            title={title}
            subtitle={subtitle}
            modals={modals}
            rightButtons={
                <RowWithSeparators separatorWidth={25}>
                    {!isMobile && (
                        <XView>
                            <CallButton room={room} />
                        </XView>
                    )}
                    {!isMobile && inviteButton}
                    <HeaderMuteButton settings={room.settings} roomId={room.id} />
                    {!isMobile && threeDots}
                </RowWithSeparators>
            }
        />
    );
});

interface MessengerComponentLoaderProps {
    variables: { id: string };
    state?: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

const ChatHeaderViewLoaderInner = withRoom(withUserInfo(
    ({ user, data, loading }: MessengerComponentLoaderProps) => {
        if (!data || !data.room) {
            return <XLoader loading={true} />;
        }

        return (
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height={55}
                paddingLeft={20}
                paddingRight={20}
            >
                <ChatHeaderView room={data.room} me={user} />
            </XView>
        );
    },
) as any) as React.ComponentType<{
    variables: { id: string };
    state?: MessagesStateContextProps;
}>;

export const ChatHeaderViewLoader = (props: {
    variables: {
        id?: string | false | null;
    };
}) => {
    if (!props.variables.id) {
        return <div />;
    }
    if (!canUseDOM || !props.variables.id) {
        return <XLoader loading={true} />;
    }
    return (
        <ChatHeaderViewLoaderInner
            variables={{
                id: props.variables.id,
            }}
        />
    );
};
