import * as React from 'react';
import { css } from 'linaria';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import {
    UserShort,
    RoomHeader_room_PrivateRoom,
    RoomHeader_room_SharedRoom,
    RoomHeader_room,
} from 'openland-api/Types';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { RoomEditModal } from './RoomEditModal';
import { AdvancedSettingsModal } from './AdvancedSettingsModal';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { HeaderTitle } from './components/HeaderTitle';
import { HeaderSubtitle } from './components/HeaderSubtitle';
import { HeaderMuteButton } from './components/HeaderMuteButton';
import { HeaderLastSeen } from './components/HeaderLastSeen';
import { HeaderMenu } from './components/HeaderMenu';
import CloseChatIcon from 'openland-icons/ic-chat-back.svg';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { HideOnDesktop } from 'openland-web/components/Adaptive';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { AddMembersModal } from 'openland-web/fragments/AddMembersModal';
import { CommentsModal } from 'openland-web/components/messenger/message/content/comments/CommentsModal';
import { TypingsViewProps } from '../../components/messenger/typings/TypingsView';
import { forever } from '../../../openland-engines/utils/forever';

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
    room: RoomHeader_room;
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

const CallButton = ({ room }: { room: RoomHeader_room }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callsState = calls.useState();

    return callsState.conversationId !== room.id ? (
        <XButton
            text="Call"
            size="small"
            onClick={() => calls.joinCall(room.id, room.__typename === 'PrivateRoom')}
        />
    ) : null;
};

export const RowWithSeparators = ({
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

export const ChatOnlinesTitle = (props: { chatId: string }) => {
    let client = useClient();
    let [onlineCount, setOnlineCount] = React.useState<number | null>(null);

    React.useEffect(
        () => {
            let sub = client.subscribeChatOnlinesCountWatch({ chatId: props.chatId });

            forever(async () => {
                setOnlineCount((await sub.get()).chatOnlinesCount.onlineMembers);
            });

            return () => {
                sub.destroy();
            };
        },
        [props.chatId],
    );

    if (!onlineCount) {
        return null;
    }

    return (
        <XView
            fontSize={13}
            fontWeight="400"
            color="#1790ff"
            lineHeight="16px"
            marginLeft={6}
            cursor={'pointer'}
        >
            {`${onlineCount} online`}
        </XView>
    );
};

export const ChatHeaderView = XMemo<ChatHeaderViewProps>(({ room, me }) => {
    const isMobile = React.useContext(IsMobileContext);
    const state = React.useContext(MessagesStateContext);
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    let sharedRoom = room.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;
    let privateRoom =
        room.__typename === 'PrivateRoom' ? (room as RoomHeader_room_PrivateRoom) : null;

    if (state.useForwardHeader) {
        return (
            <ChatForwardHeaderView
                roomId={room.id}
                me={me}
                privateRoom={room.__typename === 'PrivateRoom'}
                isChannel={!!(sharedRoom && sharedRoom.isChannel)}
                canMePinMessage={!!(sharedRoom && sharedRoom.canEdit)}
                myId={myId}
            />
        );
    }

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
                <XView flexDirection="row">
                    <HeaderSubtitle
                        value={
                            sharedRoom.membersCount +
                            (sharedRoom.membersCount === 1 ? ' member' : ' members')
                        }
                    />
                    <ChatOnlinesTitle chatId={sharedRoom.id} />
                </XView>
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
                    <AddMembersModal
                        id={room.id}
                        isRoom={true}
                        isOrganization={false}
                        isChannel={(room as RoomHeader_room_SharedRoom).isChannel}
                    />
                </>
            );
        }

        modals = (
            <>
                {sharedRoom.welcomeMessage && (
                    <AdvancedSettingsModal
                        roomId={sharedRoom.id}
                        socialImage={sharedRoom.socialImage}
                        welcomeMessageText={sharedRoom.welcomeMessage!!.message}
                        welcomeMessageSender={sharedRoom.welcomeMessage!!.sender}
                        welcomeMessageIsOn={sharedRoom.welcomeMessage!!.isOn}
                    />
                )}
                <CommentsModal />
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

        subtitle = (
            <React.Suspense fallback={<div />}>
                <HeaderLastSeen variables={{ userId: privateRoom.user.id }} />
            </React.Suspense>
        );
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
                    {inviteButton}
                    <HeaderMuteButton settings={room.settings} roomId={room.id} />
                    {threeDots}
                </RowWithSeparators>
            }
        />
    );
});

class ErrorBoundary extends React.Component<any, { error: any }> {
    static getDerivedStateFromError(error: any) {
        return { error };
    }

    constructor(props: any) {
        super(props);
        this.state = { error: null };
    }

    componentWillReceiveProps() {
        this.setState({
            error: null,
        });
    }

    render() {
        if (this.state.error) {
            return null;
        }

        return this.props.children;
    }
}

export const ChatHeaderViewLoader = (props: {
    variables: {
        id: string;
    };
}) => {
    if (!canUseDOM) {
        return <XLoader loading={true} />;
    }
    const client = useClient();
    let room = client.useRoomHeader({ id: props.variables.id });
    let ctx = React.useContext(UserInfoContext);
    const user = ctx!!.user!!;

    if (!room || !room.room) {
        return <XLoader loading={true} />;
    }

    return (
        <ErrorBoundary>
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height={55}
                paddingLeft={20}
                paddingRight={20}
            >
                <ChatHeaderView room={room.room} me={user} />
            </XView>
        </ErrorBoundary>
    );
};
