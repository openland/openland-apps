import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRoom } from '../api/withRoom';
import { withQueryLoader } from '../components/withQueryLoader';
import { MessengerRootComponent } from './MessengerRootComponent';
import { XOverflow } from '../components/Incubator/XOverflow';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XMenuItemWrapper, XMenuItem, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { XCheckbox } from 'openland-x/XCheckbox';
import { delay } from 'openland-y-utils/timer';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../api/withChannelSetFeatured';
import { withConversationSettingsUpdate } from '../api/withConversationSettingsUpdate';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { InviteMembersModal } from '../pages/main/channel/components/inviteMembersModal';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XModalForm as XModalFormOld } from 'openland-x-modal/XModalForm';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { withAlterChat } from '../api/withAlterChat';
import { withOnline } from '../api/withOnline';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { withChannelSetHidden } from '../api/withChannelSetHidden';
import { XTextArea } from 'openland-x/XTextArea';
import { UserSelect } from '../api/UserSelect';
import { XForm } from 'openland-x-forms/XForm';
import { XFormField } from 'openland-x-forms/XFormField';
import { XButton } from 'openland-x/XButton';
import PlusIcon from '../components/icons/ic-add-medium-2.svg';
import { Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { withRoomAddMembers } from '../api/withRoomAddMembers';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDate } from 'openland-x/XDate';
import { MessagesStateContext, MessagesStateContextProps } from '../components/messenger/components/MessagesStateContext';
import CloseIcon from '../components/messenger/components/icons/ic-close.svg';
import { withUserInfo } from '../components/UserInfo';
import { withDeleteMessages } from '../api/withDeleteMessage';
import { XMutation } from 'openland-x/XMutation';
import { AdminTools } from 'openland-web/pages/main/profile/RoomProfileComponent';
import NotificationsIcon from '../components/messenger/components/icons/ic-notifications.svg';
import NotificationsOffIcon from '../components/messenger/components/icons/ic-notifications-off.svg';
import { TalkContext } from 'openland-web/pages/main/mail/components/conference/TalkProviderComponent';
import { TalkBarComponent } from 'openland-web/pages/main/mail/components/conference/TalkBarComponent';
import { XView } from 'react-mental';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XAvatar2 } from 'openland-x/XAvatar2';

const ForwardRoot = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100%',
    padding: 28,
    paddingTop: 0,
    flexShrink: 0,
    left: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    '& > svg': {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 14,
        height: 14,
        cursor: 'pointer',
    },
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1,
});

const Image = Glamorous.div({
    width: 358,
    height: 311,
    backgroundImage: "url('/static/X/messenger/messenger-empty.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    transform: 'scaleX(-1)',
    marginBottom: 50,
});

const InfoTextBold = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)',
});

const InfoText = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
    '& span': {
        fontWeight: 600,
        color: '#4C4C4C',
    },
});

const FrowardPlaceholder = (props: { state: MessagesStateContextProps }) => {
    let { state } = props;
    let msgLength = 0;
    if (state.forwardMessagesId) {
        msgLength = state.forwardMessagesId.size;
    }

    return (
        <ForwardRoot>
            <CloseIcon
                onClick={() => {
                    state.resetAll();
                }}
            />
            <ImageWrapper>
                <Image />
                <XVertical separator={6} alignItems="center">
                    <InfoTextBold>Forwarding messages</InfoTextBold>
                    <InfoText>
                        Select a chat in the left column to forward{' '}
                        <span>
                            {msgLength} {msgLength === 1 ? 'message' : 'messages'}
                        </span>
                    </InfoText>
                </XVertical>
            </ImageWrapper>
        </ForwardRoot>
    );
};

const ChatHeaderWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    flexShrink: 0,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
});

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

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path || props.query ? 'pointer' : undefined,
}));

class BlockSwitcherComponent extends React.Component<
    {
        unblock: any;
        block: any;
        blocked: boolean;
        userId: string;
        refetchVars: { conversationId: string };
    },
    { blocked: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { blocked: props.blocked };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label="Block"
                        switcher={true}
                        value={this.state.blocked ? 'blocked' : 'unblocked'}
                        trueValue="blocked"
                        onChange={() => {
                            this.setState({ blocked: !this.state.blocked });
                            delay(0).then(() => {
                                this.props.blocked
                                    ? this.props.unblock({
                                          variables: {
                                              userId: this.props.userId,
                                          },
                                      })
                                    : this.props.block({
                                          variables: {
                                              userId: this.props.userId,
                                          },
                                      });
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

class SwitchComponent extends React.Component<
    {
        mutation: any;
        roomId: string;
        val: boolean;
        fieldName: string;
        fieldTitle?: string;
    },
    { val: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { val: props.val };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label={this.props.fieldTitle || this.props.fieldName}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    roomId: this.props.roomId,
                                    [this.props.fieldName]: !this.props.val,
                                },
                            });
                            this.setState({
                                val: !this.state.val,
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

export const RoomSetFeatured = withChannelSetFeatured(props => (
    <SwitchComponent
        mutation={props.setFeatured}
        val={(props as any).val}
        fieldName={'featured'}
        fieldTitle={'Featured'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

export const RoomSetHidden = withChannelSetHidden(props => (
    <SwitchComponent
        mutation={props.setHidden}
        val={(props as any).val}
        fieldName={'listed'}
        fieldTitle={'Listed'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

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

interface MessengerWrapperProps {
    chatTitle: string;
    chatType: string;
    userName?: string;
    children?: any;
}

const MessengerWrapper = (props: MessengerWrapperProps) => {
    return (
        <>
            <XDocumentHead
                title={props.chatType === 'PrivateConversation' ? props.userName : props.chatTitle}
            />
            <XVertical flexGrow={1} separator={'none'} width="100%" height="100%">
                {props.children}
            </XVertical>
        </>
    );
};

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

const ForwardHeader = (props: {
    state: MessagesStateContextProps;
    me: UserShort;
    roomId: string;
}) => {
    const { forwardMessagesId } = props.state;
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
                                props.state.resetAll();
                            }}
                        />
                    </XHorizontal>
                </ClearButton>
                <XHorizontal alignItems="center" separator={5}>
                    <XWithRole role="super-admin">
                        <DeletMessagesButton
                            roomId={props.roomId}
                            messagesIds={Array.from(props.state.selectedMessages).map(m => m.id)}
                            onSuccess={props.state.resetAll}
                        >
                            <XButton text="Delete" style="default" />
                        </DeletMessagesButton>
                    </XWithRole>
                    <XWithRole role="super-admin" negate={true}>
                        {!Array.from(props.state.selectedMessages).find(
                            msg => msg.sender.id !== props.me.id,
                        ) && (
                            <DeletMessagesButton
                                roomId={props.roomId}
                                messagesIds={Array.from(props.state.selectedMessages).map(
                                    m => m.id,
                                )}
                                onSuccess={props.state.resetAll}
                            >
                                <XButton text="Delete" style="default" />
                            </DeletMessagesButton>
                        )}
                    </XWithRole>
                    <XButton
                        text="Reply"
                        style="primary"
                        onClick={() =>
                            props.state.setReplyMessages(props.state.forwardMessagesId, null, null)
                        }
                    />
                    <XButton
                        text="Forward"
                        style="primary"
                        onClick={() => props.state.forwardMessages()}
                    />
                </XHorizontal>
            </ChatHeaderContent>
        );
    } else {
        return null;
    }
};

let MessengerComponentLoader = withRoom(
    withQueryLoader(
        withUserInfo(props => {
            if (!props.data) {
                return <div />;
            }
            let sharedRoom: Room_room_SharedRoom | null =
                props.data.room!.__typename === 'SharedRoom' ? (props.data.room as any) : null;
            let privateRoom: Room_room_PrivateRoom | null =
                props.data.room!.__typename === 'PrivateRoom' ? (props.data.room as any) : null;

            if (
                sharedRoom &&
                sharedRoom.kind !== 'INTERNAL' &&
                sharedRoom.membership !== 'MEMBER'
            ) {
                if (sharedRoom.kind === 'PUBLIC') {
                    return <RoomsInviteComponent room={sharedRoom} />;
                } else {
                    return <XPageRedirect path="/mail" />;
                }
            }
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

            let chatType = props.data.room!.__typename;

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

            const headerRender = () => (
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
                                            roomId={props.data.room!.id}
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
                                                onClick={() => ctx.joinCall(sharedRoom!.id)}
                                            />
                                        )
                                    }
                                </TalkContext.Consumer>
                            </XWithRole>
                        )}

                        <XView marginRight={-3}>
                            <NotificationSettings
                                settings={(sharedRoom || privateRoom)!.settings}
                                roomId={props.data.room!.id}
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
                                                value: props.data.room!.id,
                                            }}
                                            style="danger"
                                        >
                                            Leave room
                                        </XMenuItem>
                                        <XWithRole role="super-admin">
                                            <XMenuItemSeparator />
                                            <AdminTools
                                                id={sharedRoom.id}
                                                variables={{
                                                    id: sharedRoom.id,
                                                }}
                                            />
                                        </XWithRole>
                                    </>
                                }
                            />
                        )}
                    </XHorizontal>
                </ChatHeaderContent>
            );

            let messagesState = (props as any).state as MessagesStateContextProps;
            let selectedHeader = messagesState.useForwardHeader;
            let placeholder = messagesState.useForwardPlaceholder;
            return (
                <MessengerWrapper
                    chatTitle={title}
                    chatType={chatType}
                    userName={privateRoom ? privateRoom.user.name : undefined}
                >
                    {placeholder && <FrowardPlaceholder state={messagesState} />}
                    <ChatHeaderWrapper>
                        {selectedHeader ? (
                            <ForwardHeader
                                state={(props as any).state}
                                roomId={(sharedRoom || privateRoom)!.id}
                                me={props.user!}
                            />
                        ) : (
                            headerRender()
                        )}
                    </ChatHeaderWrapper>
                    <TalkBarComponent conversationId={(sharedRoom || privateRoom)!.id} />
                    <XHorizontal
                        justifyContent="center"
                        width="100%"
                        height="calc(100% - 56px)"
                        separator={0}
                    >
                        <MessengerRootComponent
                            objectName={title}
                            objectId={
                                sharedRoom
                                    ? sharedRoom.organization
                                        ? sharedRoom.organization.id
                                        : sharedRoom.id
                                    : privateRoom
                                        ? privateRoom.user.id
                                        : undefined
                            }
                            cloudImageUuid={
                                (sharedRoom && sharedRoom.photo) ||
                                (privateRoom && privateRoom.user.photo) ||
                                undefined
                            }
                            avatarStyle={
                                sharedRoom && sharedRoom.kind === 'INTERNAL'
                                    ? 'organization'
                                    : sharedRoom && sharedRoom.kind === 'GROUP'
                                        ? 'group'
                                        : sharedRoom && sharedRoom.kind === 'PUBLIC'
                                            ? 'room'
                                            : 'colorus'
                            }
                            organizationId={
                                sharedRoom && sharedRoom.organization
                                    ? sharedRoom.organization.id
                                    : null
                            }
                            conversationId={props.data.room!.id}
                            conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                        />
                    </XHorizontal>
                    {sharedRoom && (
                        <RoomEditComponent
                            title={sharedRoom.title}
                            description={sharedRoom.description}
                            photo={sharedRoom.photo}
                            socialImage={sharedRoom.socialImage}
                            roomId={sharedRoom.id}
                        />
                    )}

                    <AddMemberForm roomId={props.data.room!.id} />
                </MessengerWrapper>
            );
        }),
    ),
) as React.ComponentType<{
    variables: { id: string };
    state: MessagesStateContextProps;
}>;

interface MessengerComponentProps {
    id: string;
}

export const MessengerFragment = (props: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader variables={{ id: props.id }} state={state} />
        )}
    </MessagesStateContext.Consumer>
);
