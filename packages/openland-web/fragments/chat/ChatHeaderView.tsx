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
import { Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { withConversationSettingsUpdate } from 'openland-web/api/withConversationSettingsUpdate';
import { withOnline } from 'openland-web/api/withOnline';
import { XDate } from 'openland-x/XDate';
import NotificationsIcon from 'openland-icons/ic-notifications.svg';
import NotificationsOffIcon from 'openland-icons/ic-notifications-off.svg';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { MessagesStateContext } from 'openland-web/components/messenger/components/MessagesStateContext';
import { withDeleteMessages } from 'openland-web/api/withDeleteMessage';
import { XMutation } from 'openland-x/XMutation';
import { XModalForm as XModalFormOld } from 'openland-x-modal/XModalForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XForm } from 'openland-x-forms/XForm';
import { UserSelect } from 'openland-web/api/UserSelect';
import { withRoomAddMembers } from 'openland-web/api/withRoomAddMembers';
import { withAlterChat } from 'openland-web/api/withAlterChat';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeIamgeRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';

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

const ClearButton = Glamorous.div({
    fontSize: 16,
    lineHeight: 1.38,
    color: '#000',
    '& svg': {
        marginTop: 3,
        cursor: 'pointer',

        '&:hover > g > path:last-child': {
            fill: '#000',
        },
    },
});

const DeletMessagesButton = withDeleteMessages(p => {
    return (
        <XMutation
            mutation={p.deleteMessages}
            onSuccess={(p as any).onSuccess}
            variables={{
                roomId: (p as any).roomId,
                mids: (p as any).messagesIds,
            }}
        >
            {p.children}
        </XMutation>
    );
}) as React.ComponentType<{
    roomId: string;
    messagesIds: string[];
    onSuccess: () => void;
}>;

export const RoomEditComponent = withAlterChat(props => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photo;
    let editSocialImageRef = (props as any).socialImage;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            useTopCloser={true}
            title="Room settings"
            defaultAction={data => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                console.warn(newPhoto, newSocialImage);
                props.alter({
                    variables: {
                        roomId: (props as any).roomId,
                        input: {
                            ...(newTitle !== editTitle ? { title: newTitle } : {}),
                            ...(newDescription !== editDescription
                                ? { description: newDescription }
                                : {}),
                            ...(newPhoto && newPhoto.uuid !== editPhotoRef
                                ? { photoRef: sanitizeIamgeRef(newPhoto) }
                                : {}),
                            ...(newSocialImage && newSocialImage.uuid !== editSocialImageRef
                                ? {
                                    socialImageRef: sanitizeIamgeRef(newSocialImage),
                                }
                                : {}),
                        },
                    },
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    photoRef: { uuid: (props as any).photo },
                    socialImageRef: (props as any).socialImage
                        ? { uuid: (props as any).socialImage }
                        : undefined,
                },
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload
                        size="default"
                        field="input.photoRef"
                        placeholder={{
                            add: 'Add photo',
                            change: 'Change Photo',
                        }}
                    />
                    <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                        <XInput title="Room name" field="input.title" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput
                                field="input.longDescription"
                                flexGrow={1}
                                title="Attach link"
                                size="large"
                            />
                        </XWithRole>
                    </XVertical>
                </XHorizontal>
                <XTextArea
                    valueStoreKey="fields.input.description"
                    placeholder="Description"
                    resize={false}
                />
                <XAvatarUpload
                    cropParams="1:1, free"
                    field="input.socialImageRef"
                    placeholder={{
                        add: 'Add social image',
                        change: 'Change social image',
                    }}
                />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
}>;

const ForwardHeader = (props: {
    me: UserShort;
    roomId: string;
}) => {
    const state = React.useContext(MessagesStateContext);
    const { forwardMessagesId } = state;
    if (forwardMessagesId && forwardMessagesId.size) {
        let size = forwardMessagesId.size;
        return (
            <ChatHeaderContent justifyContent="space-between" alignItems="center">
                <ClearButton>
                    <XHorizontal separator={4} alignItems="center">
                        <span>
                            {size} {size === 1 ? 'message selected' : 'messages selected'}
                        </span>
                        <CloseIcon
                            onClick={() => {
                                state.resetAll();
                            }}
                        />
                    </XHorizontal>
                </ClearButton>
                <XHorizontal alignItems="center" separator={5}>
                    <XWithRole role="super-admin">
                        <DeletMessagesButton
                            roomId={props.roomId}
                            messagesIds={Array.from(state.selectedMessages).map(m => m.id)}
                            onSuccess={state.resetAll}
                        >
                            <XButton text="Delete" style="default" />
                        </DeletMessagesButton>
                    </XWithRole>
                    <XWithRole role="super-admin" negate={true}>
                        {!Array.from(state.selectedMessages).find(
                            msg => msg.sender.id !== props.me.id,
                        ) && (
                                <DeletMessagesButton
                                    roomId={props.roomId}
                                    messagesIds={Array.from(state.selectedMessages).map(
                                        m => m.id,
                                    )}
                                    onSuccess={state.resetAll}
                                >
                                    <XButton text="Delete" style="default" />
                                </DeletMessagesButton>
                            )}
                    </XWithRole>
                    <XButton
                        text="Reply"
                        style="primary"
                        onClick={() =>
                            state.setReplyMessages(state.forwardMessagesId, null, null)
                        }
                    />
                    <XButton
                        text="Forward"
                        style="primary"
                        onClick={() => state.forwardMessages()}
                    />
                </XHorizontal>
            </ChatHeaderContent>
        );
    } else {
        return null;
    }
};

export const AddMemberForm = withRoomAddMembers(props => {
    return (
        <XModalFormOld
            title="Add member to room"
            submitMutation={props.addMember}
            mutationDirect={true}
            actionName="Add"
            targetQuery="addMember"
            defaultValues={{ roomId: (props as any).roomId }}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalFormOld>
    );
}) as React.ComponentType<{ roomId: string }>;

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    me: UserShort;
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

    const state = React.useContext(MessagesStateContext);
    if (state.useForwardHeader) {
        return (
            <ForwardHeader
                roomId={(sharedRoom || privateRoom)!.id}
                me={props.me}
            />
        );
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
                {sharedRoom && (
                    <AddMemberForm roomId={props.room.id} />
                )}
                {sharedRoom && (
                    <RoomEditComponent
                        title={sharedRoom.title}
                        description={sharedRoom.description}
                        photo={sharedRoom.photo}
                        socialImage={sharedRoom.socialImage}
                        roomId={sharedRoom.id}
                    />
                )}
            </XHorizontal>
        </ChatHeaderContent>
    );
});