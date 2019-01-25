import * as React from 'react';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { Room, Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { RoomEditModal } from './RoomEditModal';
import { RoomAddMemberModal } from './RoomAddMemberModal';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { TalkContext } from 'openland-web/modules/conference/TalkProviderComponent';
import { HeaderTitle } from './components/HeaderTitle';
import { HeaderSubtitle } from './components/HeaderSubtitle';
import { HeaderMuteButton } from './components/HeaderMuteButton';
import { HeaderLastSeen } from './components/HeaderLastSeen';
import { HeaderInviteButton } from './components/HeaderInviteButton';
import { HeaderMenu } from './components/HeaderMenu';
import CloseChatIcon from 'openland-icons/ic-chat-back.svg';
import { HideOnMobile, HideOnDesktop } from 'openland-web/components/Adaptive';
import { withRoom } from 'openland-web/api/withRoom';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { MessagesStateContextProps } from 'openland-web/components/messenger/MessagesStateContext';
import { XLoader } from 'openland-x/XLoader';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    me: UserShort;
}

const ChatHeaderViewAbstract = React.memo(
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
    const ctx = React.useContext(TalkContext);

    return ctx.cid !== room.id ? (
        <XButton text="Call" onClick={() => ctx.joinCall(room.id)} />
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
            finalChildren.push(<XView width={separatorWidth} />);
        }
        finalChildren.push(notEmptyChildrens[i]);
    }
    return (
        <XView flexDirection="row" alignItems="center">
            {finalChildren}
        </XView>
    );
};

export const ChatHeaderView = React.memo<ChatHeaderViewProps>(({ room, me }) => {
    const { isMobile } = React.useContext(MobileSidebarContext);
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

            if (sharedRoom.kind === 'PUBLIC') {
                inviteButton = <HeaderInviteButton room={sharedRoom} />;
            }
        }
        modals = (
            <>
                <RoomAddMemberModal roomId={room.id} />
                <RoomEditModal
                    title={sharedRoom.title}
                    description={sharedRoom.description}
                    photo={sharedRoom.photo}
                    socialImage={sharedRoom.socialImage}
                    roomId={sharedRoom.id}
                />
            </>
        );
    }

    if (privateRoom) {
        headerPath = '/mail/u/' + privateRoom.user.id;

        subtitle = <HeaderLastSeen variables={{ userId: privateRoom.user.id }} />;
    }

    const photo = sharedRoom ? sharedRoom.photo : privateRoom!!.user.photo;
    const avatarTitle = sharedRoom ? sharedRoom.title : privateRoom!!.user.name;
    const id = sharedRoom ? sharedRoom.id : privateRoom!!.user.id;

    const avatar = <XAvatar2 size={36} src={photo} title={avatarTitle} id={id} />;
    const title = sharedRoom ? (
        <HeaderTitle value={sharedRoom.title} />
    ) : (
        <HeaderTitle
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
                <RowWithSeparators separatorWidth={20}>
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
        >
            {modals}
        </ChatHeaderViewAbstract>
    );
});

interface MessengerComponentLoaderProps {
    variables: { id: string };
    state?: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

export const ChatHeaderViewLoader = withRoom(withQueryLoader(
    withUserInfo(({ user, data, loading }: MessengerComponentLoaderProps) => {
        if (!data || !data.room || loading) {
            if (loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
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
    }),
) as any) as React.ComponentType<{
    variables: { id: string };
    state?: MessagesStateContextProps;
}>;
