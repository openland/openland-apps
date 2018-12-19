import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMenuItemSeparator, XMenuItem } from 'openland-x/XMenuItem';
import { AdminTools } from 'openland-web/pages/main/profile/RoomProfileComponent';
import { XOverflow } from 'openland-web/components/Incubator/XOverflow';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { InviteMembersModal } from 'openland-web/pages/main/channel/components/inviteMembersModal';
import { Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { withConversationSettingsUpdate } from 'openland-web/api/withConversationSettingsUpdate';
import { withOnline } from 'openland-web/api/withOnline';
import { XDate } from 'openland-x/XDate';
import NotificationsIcon from 'openland-icons/ic-notifications.svg';
import NotificationsOffIcon from 'openland-icons/ic-notifications-off.svg';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { MessagesStateContext } from 'openland-web/components/messenger/components/MessagesStateContext';
import { css } from 'linaria';
import { RoomEditModal } from '../RoomEditModal';
import { RoomAddMemberModal } from '../RoomAddMemberModal';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { TalkContext } from 'openland-web/modules/conference/TalkProviderComponent';

const StatusWrapperOffline = css`
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
`;

const StatusWrapperOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
`;

const NotificationsWrapper = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: -3px !important;
    & svg path:last-child {
        fill: rgba(0, 0, 0, 0.2);
    }
    &:hover svg path:last-child {
        fill: #1790ff;
    }
`;

const InviteButton = css`
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

const ChatTitleClass = css`
    height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const LastSeen = withOnline(props => {
    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <div className={StatusWrapperOffline}>
                Last seen{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (props.data.user && props.data.user.online) {
        return <div className={StatusWrapperOnline}>Online</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

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
            <div className={NotificationsWrapper} onClick={this.handleClick}>
                {this.props.settings.mute ? <NotificationsOffIcon /> : <NotificationsIcon />}
            </div>
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

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    me: UserShort;
}

export const ChatHeaderView = React.memo<ChatHeaderViewProps>(props => {
    const state = React.useContext(MessagesStateContext);
    let room = props.room;

    if (state.useForwardHeader) {
        return <ChatForwardHeaderView roomId={room.id} me={props.me} />;
    }

    let sharedRoom = room.__typename === 'SharedRoom' ? (room as Room_room_SharedRoom) : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? (room as Room_room_PrivateRoom) : null;

    let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';
    let titlePath: string | undefined = undefined;

    let subtitle = '';
    let subtitlePath: string | undefined = undefined;

    if (sharedRoom && sharedRoom.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (sharedRoom && (sharedRoom.kind === 'PUBLIC' || sharedRoom.kind === 'GROUP')) {
        subtitle =
            sharedRoom.membersCount + (sharedRoom.membersCount === 1 ? ' member' : ' members');
    } else if (privateRoom) {
        let user = privateRoom.user;
        if (user.primaryOrganization) {
            subtitle = user.primaryOrganization.name;
            titlePath = '/mail/u/' + user.id;
            subtitlePath = '/mail/o/' + user.primaryOrganization.id;
        }
    }

    let headerPath: string | undefined = undefined;
    if (privateRoom) {
        headerPath = '/mail/u/' + privateRoom.user.id;
    } else if (sharedRoom) {
        if (sharedRoom.kind === 'INTERNAL') {
            headerPath = '/mail/o/' + sharedRoom.organization!.id;
        } else if (sharedRoom.kind === 'PUBLIC' || sharedRoom.kind === 'GROUP') {
            headerPath = '/mail/p/' + sharedRoom.id;
        }
    }

    let callButton = (
        <XWithRole role="feature-non-production">
            {sharedRoom && (
                <TalkContext.Consumer>
                    {ctx =>
                        ctx.cid !== sharedRoom!.id && (
                            <XButton
                                text="Call"
                                size="small"
                                onClick={() => ctx.joinCall(sharedRoom!.id)}
                            />
                        )
                    }
                </TalkContext.Consumer>
            )}
            {privateRoom && (
                <TalkContext.Consumer>
                    {ctx =>
                        ctx.cid !== privateRoom!.id && (
                            <XButton
                                text="Call"
                                size="small"
                                onClick={() => ctx.joinCall(privateRoom!.id)}
                            />
                        )
                    }
                </TalkContext.Consumer>
            )}
        </XWithRole>
    );

    let inviteButton = sharedRoom && sharedRoom.kind === 'PUBLIC' && (
        <InviteMembersModal
            channelTitle={title}
            roomId={room.id}
            target={
                <XButton text="Invite" size="small" icon={<PlusIcon />} className={InviteButton} />
            }
        />
    );

    let muteButton = <NotificationSettings settings={room.settings} roomId={room.id} />;

    let menu = sharedRoom && (
        <XOverflow
            flat={true}
            placement="bottom-end"
            content={
                <>
                    <XWithRole
                        role="super-admin"
                        or={sharedRoom.role === 'OWNER' || sharedRoom.role === 'ADMIN'}
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
                            value: room.id,
                        }}
                        style="danger"
                    >
                        Leave room
                    </XMenuItem>
                    <XWithRole role="super-admin">
                        <XMenuItemSeparator />
                        <AdminTools id={room.id} variables={{ id: room.id }} />
                    </XWithRole>
                </>
            }
        />
    );

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
            <XView
                flexDirection="row"
                path={headerPath}
                flexGrow={1}
                minWidth={0}
                flexShrink={1}
                paddingRight={16}
            >
                <XAvatar2
                    size={36}
                    src={
                        (sharedRoom && sharedRoom.photo) || (privateRoom && privateRoom.user.photo)
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
                <XView marginLeft={16} minWidth={0} flexShrink={1}>
                    <XView marginTop={-2} minWidth={0} flexShrink={1} flexDirection="row">
                        <XView
                            as="a"
                            fontSize={14}
                            fontWeight="600"
                            lineHeight="18px"
                            color="#000000"
                            path={titlePath}
                            minWidth={0}
                            flexShrink={1}
                        >
                            <div className={ChatTitleClass}>{title}</div>
                        </XView>
                        {privateRoom && (
                            <XView
                                as="a"
                                marginLeft={6}
                                fontSize={13}
                                fontWeight="600"
                                color="rgba(0, 0, 0, 0.4)"
                                lineHeight="18px"
                                path={subtitlePath}
                            >
                                {subtitle}
                            </XView>
                        )}
                    </XView>
                    <XView marginTop={4}>
                        {privateRoom && <LastSeen variables={{ userId: privateRoom.user.id }} />}
                        {!privateRoom && (
                            <XView
                                as="a"
                                fontSize={13}
                                fontWeight="400"
                                color="rgba(0, 0, 0, 0.4)"
                                lineHeight="16px"
                                path={subtitlePath}
                            >
                                {subtitle}
                            </XView>
                        )}
                    </XView>
                </XView>
            </XView>

            <XHorizontal alignItems="center" separator={8}>
                {callButton}
                {inviteButton}
                {muteButton}
                {menu}
            </XHorizontal>

            {sharedRoom && (
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
            )}
        </XView>
    );
});
