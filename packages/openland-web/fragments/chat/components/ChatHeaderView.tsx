import * as React from 'react';
import { css } from 'linaria';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import {
    UserShort,
    RoomHeader_room_PrivateRoom,
    RoomHeader_room_SharedRoom,
    RoomHeader_room,
} from 'openland-api/Types';
import { MessagesStateContext } from 'openland-web/fragments/chat/messenger/MessagesStateContext';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { HeaderTitle } from './HeaderTitle';
import { HeaderSubtitle } from './HeaderSubtitle';
import { HeaderLastSeen } from './HeaderLastSeen';
import { HeaderMenu, CallButton } from './HeaderMenu';
import CloseChatIcon from 'openland-icons/ic-chat-back.svg';
import { HideOnDesktop } from 'openland-web/components/Adaptive';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';

const subtitleClassName = css`
    letter-spacing: 0.2px;
`;

export interface ChatHeaderViewProps {
    room: RoomHeader_room;
    me: UserShort;
}

const ChatHeaderViewAbstract = XMemo(
    ({
        headerPath,
        avatar,
        title,
        subtitle,
        rightButtons,
    }: {
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
                alignSelf="stretch"
                maxWidth={820}
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
                    alignItems="center"
                    alignSelf="stretch"
                    path={headerPath}
                    flexGrow={1}
                    minWidth={0}
                    flexShrink={1}
                    paddingRight={16}
                >
                    {avatar}
                    <XView
                        marginLeft={16}
                        minWidth={0}
                        flexShrink={1}
                        alignSelf="stretch"
                        justifyContent="center"
                    >
                        {title}
                        <XView>{subtitle}</XView>
                    </XView>
                </XView>
                {rightButtons}
            </XView>
        );
    },
);

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
    let [onlineCount, setOnlineCount] = React.useState<number>(0);

    getChatOnlinesCount(props.chatId, client, count => setOnlineCount(count));

    if (onlineCount <= 0) {
        return null;
    }

    return (
        <XView
            fontSize={13}
            flexDirection="row"
            alignItems="center"
            fontWeight="400"
            color="#1790ff"
            lineHeight="16px"
            marginLeft={6}
            cursor={'pointer'}
        >
            <XView color="#7A7A7A" marginRight={6}>
                ·
            </XView>
            <XView>{`${onlineCount} online`}</XView>
        </XView>
    );
};

export const ChatHeaderView = XMemo<ChatHeaderViewProps>(({ room, me }) => {
    const isMobile = React.useContext(IsMobileContext);
    const state = React.useContext(MessagesStateContext);

    const sharedRoom =
        room.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);
    const privateRoom =
        room.__typename === 'PrivateRoom' ? (room as RoomHeader_room_PrivateRoom) : null;

    if (state.useForwardHeader) {
        return (
            <ChatForwardHeaderView
                roomId={room.id}
                me={me}
                privateRoom={room.__typename === 'PrivateRoom'}
                isChannel={isChannel}
            />
        );
    }

    let headerPath: string | undefined = undefined;
    let subtitle = undefined;

    if (sharedRoom) {
        if (sharedRoom.kind === 'INTERNAL') {
            headerPath = '/mail/o/' + sharedRoom.organization!.id;
            subtitle = (
                <span className={subtitleClassName}>
                    <HeaderSubtitle value="Organization" />
                </span>
            );
        } else {
            headerPath = '/mail/p/' + sharedRoom.id;
            subtitle = (
                <span className={subtitleClassName}>
                    <XView flexDirection="row">
                        <HeaderSubtitle
                            value={
                                sharedRoom.membersCount +
                                (sharedRoom.membersCount === 1 ? ' member' : ' members')
                            }
                        />
                        {!isMobile && <ChatOnlinesTitle chatId={sharedRoom.id} />}
                    </XView>
                </span>
            );
        }
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

    const avatar = <XAvatar2 size={40} src={photo} title={avatarTitle} id={id} />;
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
            rightButtons={
                <RowWithSeparators separatorWidth={12}>
                    {(privateRoom ? !privateRoom.user.isBot : true) && (
                        <XView>
                            <CallButton room={room} />
                        </XView>
                    )}
                    <HeaderMenu room={room} />
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
    const isMobile = React.useContext(IsMobileContext);
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
                height={56}
                paddingLeft={isMobile ? 20 : 110}
                paddingRight={isMobile ? 20 : 110}
            >
                <ChatHeaderView room={room.room} me={user} />
            </XView>
        </ErrorBoundary>
    );
};
