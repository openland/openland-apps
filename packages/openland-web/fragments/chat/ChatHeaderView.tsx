import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/Incubator/XOverflow';
import { XView } from 'react-mental';
import { TalkContext } from 'openland-web/pages/main/mail/components/conference/TalkProviderComponent';
import { XButton } from 'openland-x/XButton';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { InviteMembersModal } from 'openland-web/pages/main/channel/components/inviteMembersModal';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { withConversationSettingsUpdate } from 'openland-web/api/withConversationSettingsUpdate';
import { withOnline } from 'openland-web/api/withOnline';
import { XDate } from 'openland-x/XDate';
import NotificationsIcon from '../../components/messenger/components/icons/ic-notifications.svg';
import NotificationsOffIcon from '../../components/messenger/components/icons/ic-notifications-off.svg';
import PlusIcon from '../../components/icons/ic-add-medium-2.svg';

const LastSeenWrapper = Glamorous.div<{ online: boolean }>(props => ({
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '16px',
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0,
}));

const LastSeen = withOnline(props => {
    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <LastSeenWrapper online={false}>
                Last seen{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </LastSeenWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return <LastSeenWrapper online={true}>Online</LastSeenWrapper>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path || props.query ? 'pointer' : undefined,
}));

const ChatHeaderContent = Glamorous(XHorizontal)({
    alignItems: 'center',
    maxWidth: 950,
    width: '100%',
    flexBasis: '100%',
});

const TitleWrapper = Glamorous(XHorizontal)({
    marginTop: '-2px!important',
});

const Title = makeNavigable(
    Glamorous.div<NavigableChildProps>(props => ({
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: props.href ? 'pointer' : undefined,
        color: '#000000',
    })),
);

const SubtitleWrapper = Glamorous.div({
    marginTop: '4px!important',
    marginBottom: '0px!important',
});

const SubTitle = makeNavigable(
    Glamorous.div<NavigableChildProps & { inTop?: boolean }>(props => ({
        fontSize: 13,
        fontWeight: props.inTop ? 600 : 400,
        color: 'rgba(0, 0, 0, 0.4)',
        lineHeight: props.inTop ? '18px' : '16px',
        letterSpacing: 0,
        cursor: props.href ? 'pointer' : undefined,
    })),
);

const NotificationsWrapper = Glamorous(XVertical)({
    cursor: 'pointer',
    '& svg path:last-child': {
        fill: 'rgba(0, 0, 0, 0.2)',
    },
    '&:hover svg path:last-child': {
        fill: '#1790ff',
    },
});

class NotificationSettingsComponent extends React.Component<
    { mutation: any; settings: { mute: boolean }; roomId: string },
    { settings: { mute: boolean } }
> {
    handleClick = () => {
        let value = !this.props.settings.mute;

        this.props.mutation({
            variables: {
                settings: {
                    mute: value,
                },
                roomId: this.props.roomId,
            },
        });
    };

    render() {
        return (
            <NotificationsWrapper onClick={this.handleClick}>
                {this.props.settings.mute ? <NotificationsOffIcon /> : <NotificationsIcon />}
            </NotificationsWrapper>
        );
    }
}

const NotificationSettings = withConversationSettingsUpdate(props => (
    <NotificationSettingsComponent
        mutation={props.update}
        settings={(props as any).settings}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{
    settings: { mute: boolean | null };
    roomId: string;
}>;

const InviteButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#000000',
        opacity: 0.4,
    },
    '&:active svg > g > path:last-child': {
        fill: '#ffffff',
        opacity: 0.4,
    },
});

let HeaderLeftContent = (props: { chatType?: string; path?: string; children?: any }) => {
    if (props.chatType === 'ChannelConversation') {
        return (
            <NavChatLeftContentStyled
                path={props.path}
                separator={10}
                alignItems="center"
                flexGrow={0}
                maxWidth="calc(100% - 380px)"
                width="calc(100% - 380px)"
            >
                {props.children}
            </NavChatLeftContentStyled>
        );
    } else if (props.chatType === 'GroupConversation') {
        return (
            <NavChatLeftContentStyled
                path={props.path}
                separator={10}
                alignItems="center"
                flexGrow={0}
                maxWidth="calc(100% - 100px)"
                width="calc(100% - 100px)"
            >
                {props.children}
            </NavChatLeftContentStyled>
        );
    } else {
        return (
            <NavChatLeftContentStyled
                path={props.path}
                separator={10}
                alignItems="center"
                flexGrow={0}
                maxWidth="calc(100% - 100px)"
                width="calc(100% - 100px)"
            >
                {props.children}
            </NavChatLeftContentStyled>
        );
    }
};

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
}

export const ChatHeaderView = React.memo<ChatHeaderViewProps>((props) => {
    let sharedRoom: Room_room_SharedRoom | null =
        props.room.__typename === 'SharedRoom' ? (props.room as Room_room_SharedRoom) : null;
    let privateRoom: Room_room_PrivateRoom | null =
        props.room.__typename === 'PrivateRoom' ? props.room as Room_room_PrivateRoom : null;

    let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';
    let titlePath: string | undefined = undefined;

    let subtitle = '';

    let subtitlePath: string | undefined = undefined;
    let uId: string | null = null;
    if (sharedRoom && sharedRoom.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (
        sharedRoom &&
        (sharedRoom.kind === 'PUBLIC' || sharedRoom.kind === 'GROUP')
    ) {
        subtitle =
            sharedRoom.membersCount +
            (sharedRoom.membersCount === 1 ? ' member' : ' members');
    } else if (privateRoom) {
        uId = privateRoom && privateRoom.user.id;
        let user = privateRoom.user;
        if (user.primaryOrganization) {
            subtitle = user.primaryOrganization.name;
            titlePath = '/mail/u/' + user.id;
            subtitlePath = '/mail/o/' + user.primaryOrganization.id;
        }
    }

    let chatType = props.room.__typename;

    let headerPath: string | undefined;
    if (privateRoom) {
        headerPath = '/mail/u/' + privateRoom.user.id;
    } else if (sharedRoom) {
        if (sharedRoom.kind === 'INTERNAL') {
            headerPath = '/mail/o/' + sharedRoom.organization!.id;
        } else if (sharedRoom.kind === 'PUBLIC' || sharedRoom.kind === 'GROUP') {
            headerPath = '/mail/p/' + sharedRoom.id;
        }
    }

    return (
        <ChatHeaderContent justifyContent="space-between">
            <HeaderLeftContent chatType={chatType} path={headerPath}>
                <XHorizontal
                    alignItems="center"
                    separator={8}
                    maxWidth="100%"
                    width="100%"
                    flexBasis={0}
                    flexGrow={1}
                >
                    <XAvatar2
                        size={36}
                        src={
                            (sharedRoom && sharedRoom.photo) ||
                            (privateRoom && privateRoom.user.photo)
                        }
                        title={title}
                        id={
                            sharedRoom
                                ? sharedRoom.organization
                                    ? sharedRoom.organization.id
                                    : sharedRoom.id
                                : privateRoom
                                    ? privateRoom.user.id
                                    : ''
                        }
                    />
                    <XVertical separator="none" maxWidth="calc(100% - 48px)">
                        <TitleWrapper separator={3}>
                            <Title path={titlePath}>{title}</Title>
                            {privateRoom && (
                                <SubTitle path={subtitlePath} inTop={true}>
                                    {subtitle}
                                </SubTitle>
                            )}
                        </TitleWrapper>
                        <SubtitleWrapper>
                            {!privateRoom && (
                                <SubTitle path={subtitlePath}>{subtitle}</SubTitle>
                            )}
                            {uId && <LastSeen variables={{ userId: uId }} />}
                        </SubtitleWrapper>
                    </XVertical>
                </XHorizontal>
            </HeaderLeftContent>
            <XHorizontal alignItems="center" separator={8}>
                {sharedRoom &&
                    sharedRoom.kind === 'PUBLIC' && (
                        <XHorizontal separator={8}>
                            <XHorizontal
                                alignSelf="center"
                                alignItems="center"
                                separator={12}
                            >
                                <XWithRole role="feature-non-production">
                                    <TalkContext.Consumer>
                                        {ctx =>
                                            ctx.cid !== sharedRoom!.id && (
                                                <XButton
                                                    text="Call"
                                                    onClick={() =>
                                                        ctx.joinCall(sharedRoom!.id)
                                                    }
                                                />
                                            )
                                        }
                                    </TalkContext.Consumer>
                                </XWithRole>
                                <InviteMembersModal
                                    channelTitle={title}
                                    roomId={props.room.id}
                                    target={
                                        <InviteButton
                                            text="Invite"
                                            size="small"
                                            icon={<PlusIcon />}
                                        />
                                    }
                                />
                            </XHorizontal>
                        </XHorizontal>
                    )}

                {sharedRoom &&
                    sharedRoom.kind === 'GROUP' && (
                        <XWithRole role="feature-non-production">
                            <TalkContext.Consumer>
                                {ctx =>
                                    ctx.cid !== sharedRoom!.id && (
                                        <XButton
                                            text="Call"
                                            onClick={() => ctx.joinCall(sharedRoom!.id)}
                                        />
                                    )
                                }
                            </TalkContext.Consumer>
                        </XWithRole>
                    )}

                {privateRoom && (
                    <XWithRole role="feature-non-production">
                        <TalkContext.Consumer>
                            {ctx =>
                                ctx.cid !== privateRoom!.id && (
                                    <XButton
                                        text="Call"
                                        onClick={() => ctx.joinCall(privateRoom!.id)}
                                    />
                                )
                            }
                        </TalkContext.Consumer>
                    </XWithRole>
                )}

                <XView marginRight={-3}>
                    <NotificationSettings
                        settings={props.room.settings}
                        roomId={props.room.id}
                    />
                </XView>

                {sharedRoom && (
                    <XOverflow
                        flat={true}
                        placement="bottom-end"
                        content={
                            <>
                                <XWithRole
                                    role="super-admin"
                                    or={
                                        sharedRoom.role === 'OWNER' ||
                                        sharedRoom.role === 'ADMIN'
                                    }
                                >
                                    <XMenuItem
                                        query={{
                                            field: 'editChat',
                                            value: 'true',
                                        }}
                                    >
                                        Settings
                                    </XMenuItem>
                                </XWithRole>
                                <XMenuItem
                                    query={{
                                        field: 'leaveFromChat',
                                        value: props.room.id,
                                    }}
                                    style="danger"
                                >
                                    Leave room
                                </XMenuItem>
                                <XWithRole role="super-admin">
                                    <XMenuItemSeparator />
                                    <AdminTools id={props.room.id} variables={{ id: props.room.id }} />
                                </XWithRole>
                            </>
                        }
                    />
                )}
            </XHorizontal>
        </ChatHeaderContent>
    );
});