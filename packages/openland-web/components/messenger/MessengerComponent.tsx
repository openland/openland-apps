import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withRoom } from '../../api/withRoom';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XOverflow } from '../Incubator/XOverflow';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XMenuTitle, XMenuItemWrapper, XMenuItem } from 'openland-x/XMenuItem';
import { XCheckbox } from 'openland-x/XCheckbox';
import { delay } from 'openland-y-utils/timer';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../../api/withChannelSetFeatured';
import { XLink } from 'openland-x/XLink';
import { ChannelMembersComponent } from '../../pages/main/channel/components/membersComponent';
import { withConversationSettingsUpdate } from '../../api/withConversationSettingsUpdate';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { InviteMembersModal } from '../../pages/main/channel/components/inviteMembersModal';
import { XCounter } from 'openland-x/XCounter';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XModalForm as XModalFormOld } from 'openland-x-modal/XModalForm';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { withAlterChat } from '../../api/withAlterChat';
import { withOnline } from '../../api/withOnline';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { withChannelSetHidden } from '../../api/withChannelSetHidden';
import { XTextArea } from 'openland-x/XTextArea';
import { UserSelect } from '../../api/UserSelect';
import { XForm } from 'openland-x-forms/XForm';
import { XFormField } from 'openland-x-forms/XFormField';
import IconInfo from './components/icons/ic-info.svg';
import { XButton } from 'openland-x/XButton';
import PlusIcon from '../icons/ic-add-medium-2.svg';
import { ConferenceComponent } from '../conference/ConferenceComponent';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { withRoomAddMembers } from 'openland-web/api/withRoomAddMembers';

import { TalkBarComponent } from '../conference/TalkBarComponent';
import { TalkContext } from '../conference/TalkProviderComponent';
import { XDate } from 'openland-x/XDate';
import { MessagesStateContext, MessagesStateContextProps } from './components/MessagesStateContext';
import CloseIcon from './components/icons/ic-close.svg';

const ForwardRoot = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100%',
    padding: 28,
    flexShrink: 0,
    left: 0,
    top: 0,
    zIndex: 2,
    backgroundColor: '#fff',
    '& > svg': {
        position: 'absolute',
        right: 20,
        top: 20,
        width: 20,
        height: 20,
        cursor: 'pointer'
    }
});

const ImageWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 1
});

const Image = Glamorous.div({
    width: 358,
    height: 311,
    backgroundImage: 'url(\'/static/X/messenger/messenger-empty.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    transform: 'scaleX(-1)',
    marginBottom: 50
});

const InfoTextBold = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 1.11,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.9)'
});

const InfoText = Glamorous.div({
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)'
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
                    <InfoText>Select a chat in the left column to forward {msgLength} messages</InfoText>
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
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const ChatHeaderContent = Glamorous(XHorizontal)({
    alignItems: 'center',
    maxWidth: 920,
    width: '100%',
    flexBasis: '100%'
});

const TitleWrapper = Glamorous(XHorizontal)({
    marginTop: '-2px!important',
});

const Title = makeNavigable(Glamorous.div<NavigableChildProps>(props => ({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: props.href ? 'pointer' : undefined,
    color: '#000000'
})));

const SubtitleWrapper = Glamorous.div({
    marginTop: '4px!important',
    marginBottom: '0px!important',
});

const SubTitle = makeNavigable(Glamorous.div<NavigableChildProps & { inTop?: boolean }>(props => ({
    fontSize: 13,
    fontWeight: props.inTop ? 600 : 400,
    color: 'rgba(0, 0, 0, 0.4)',
    lineHeight: props.inTop ? '18px' : '16px',
    letterSpacing: 0,
    cursor: props.href ? 'pointer' : undefined,
})));

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path || props.query ? 'pointer' : undefined
}));

class BlockSwitcherComponent extends React.Component<{ unblock: any, block: any, blocked: boolean, userId: string, refetchVars: { conversationId: string } }, { blocked: boolean }> {
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
                                this.props.blocked ?
                                    this.props.unblock({
                                        variables: {
                                            userId: this.props.userId
                                        }
                                    }) :
                                    this.props.block({
                                        variables: {
                                            userId: this.props.userId
                                        }
                                    });
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

class SwitchComponent extends React.Component<{ mutation: any, conversationId: string, val: boolean, fieldName: string, refetchVars: { conversationId: string } }, { val: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { val: props.val };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label={this.props.fieldName}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    channelId: this.props.conversationId,
                                    [this.props.fieldName]: !this.props.val
                                }
                            });
                            this.setState({
                                val: !this.state.val
                            });
                        }
                        }
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

export const RoomSetFeatured = withChannelSetFeatured((props) => (
    <SwitchComponent mutation={props.setFeatured} val={(props as any).val} fieldName={'featured'} conversationId={(props as any).conversationId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ val: boolean, conversationId: string }>;

export const RoomSetHidden = withChannelSetHidden((props) => (
    <SwitchComponent mutation={props.setHidden} val={(props as any).val} fieldName={'hidden'} conversationId={(props as any).conversationId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ val: boolean, conversationId: string }>;

class NotificationSettingsComponent extends React.Component<{ mutation: any, settings: { mute: boolean }, conversationId: string }, { settings: { mute: boolean } }> {
    constructor(props: any) {
        super(props);
        this.state = { settings: props.settings };
    }

    apply = (mute: boolean) => {
        this.props.mutation({
            variables: {
                settings: {
                    mute: mute
                },
                conversationId: this.props.conversationId,
            }
        });
    }

    render() {
        return (
            <XVertical separator={0}>

                <XMenuItemWrapper key="mute">
                    <XVertical>
                        <XCheckbox
                            label="Mute"
                            switcher={true}
                            value={this.state.settings.mute ? 'true' : 'false'}
                            trueValue="true"
                            onChange={(checked) => {
                                this.apply(checked.checked);
                                this.setState({
                                    settings: { ... this.state.settings, mute: !this.state.settings.mute }
                                });
                            }}
                        />
                    </XVertical>
                </XMenuItemWrapper>
            </XVertical>
        );
    }
}

const NotificationSettings = withConversationSettingsUpdate((props) => (
    <NotificationSettingsComponent mutation={props.update} settings={(props as any).settings} conversationId={(props as any).conversationId} />
)) as React.ComponentType<{ settings: { mute: boolean | null }, conversationId: string }>;

const RoomTabs = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
});

const RoomTab = Glamorous(XLink)({
    padding: '20px 5px 17px',
    borderBottom: '3px solid transparent',
    color: 'rgba(51, 69, 98, 0.5)',
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 500,
    margin: '0 0 -1px 19px',
    display: 'block',
    letterSpacing: -0.4,

    '&:hover': {
        color: '#334562'
    },

    '&.is-active': {
        color: '#334562',
        borderColor: '#1790ff'
    }
});

export const RoomEditComponent = withAlterChat((props) => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photoRef;
    let editSocialImageRef = (props as any).socialImageRef;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            useTopCloser={true}
            title="Room settings"
            defaultAction={(data) => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;

                props.alter({
                    variables: {
                        input: {
                            ...newTitle !== editTitle ? { title: newTitle } : {},
                            ...newDescription !== editDescription ? { description: newDescription } : {},
                            ...newPhoto !== editPhotoRef ? { photoRef: newPhoto } : {},
                            ...newSocialImage !== editSocialImageRef ? { socialImageRef: newSocialImage } : {}
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    longDescription: (props as any).longDescription || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    socialImageRef: sanitizeIamgeRef((props as any).socialImageRef)
                }
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload size="default" field="input.photoRef" placeholder={{ add: 'Add photo', change: 'Change Photo' }} />
                    <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                        <XInput title="Room name" field="input.title" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput field="input.longDescription" flexGrow={1} title="Attach link" size="large" />
                        </XWithRole>
                    </XVertical>
                </XHorizontal>
                <XTextArea valueStoreKey="fields.input.description" placeholder="Description" resize={false} />
                <XAvatarUpload cropParams="1:1, free" field="input.socialImageRef" placeholder={{ add: 'Add social image', change: 'Change social image' }} />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ title: string, photoRef: any, description: string | null, socialImageRef: any, refetchVars: { conversationId: string } }>;

export const GroupEditComponent = withAlterChat((props) => {
    let editTitle = (props as any).title;
    let editPhotoRef = (props as any).photoRef;
    let editDescription = (props as any).description;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            targetQuery="editChat"
            title="Group settings"
            useTopCloser={true}
            defaultAction={(data) => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;

                props.alter({
                    variables: {
                        input: {
                            ...newTitle !== editTitle ? { title: newTitle } : {},
                            ...newDescription !== editDescription ? { description: newDescription } : {},
                            ...newPhoto !== editPhotoRef ? { photoRef: newPhoto } : {},
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    longDescription: (props as any).longDescription || '',
                }
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload size="default" field="input.photoRef" placeholder={{ add: 'Add photo', change: 'Change Photo' }} />
                    <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                        <XInput field="input.title" flexGrow={1} title="Group name" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput field="input.longDescription" flexGrow={1} title="Attach link" size="large" />
                        </XWithRole>
                    </XVertical>
                </XHorizontal>
                <XTextArea valueStoreKey="fields.input.description" placeholder="Description" resize={false} />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ title: string, description: string | null, longDescription?: string, photoRef: any, refetchVars: { conversationId: string } }>;

export const AddMemberForm = withRoomAddMembers((props) => {
    return (
        <XModalFormOld
            title="Add member to room"
            submitMutation={props.addMember}
            mutationDirect={true}
            actionName="Add"
            targetQuery="addMember"
            defaultValues={{ id: (props as any).channelId }}
        >
            <XFormField title="User">
                <XForm.Select field="userId" component={UserSelect} />
            </XFormField>
        </XModalFormOld>
    );
}) as React.ComponentType<{ refetchVars: { conversationId: string }, channelId: string }>;

const InviteButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s'
    },
    '& svg > g > path:last-child': {
        fill: '#000000',
        opacity: 0.4
    },
    '&:active svg > g > path:last-child': {
        fill: '#ffffff',
        opacity: 0.4
    }
});

const InfoButton = Glamorous.div({
    width: 32,
    height: 32,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    '& svg > *': {
        fill: 'rgba(0, 0, 0, 0.2)'
    },
    '&:hover svg > *': {
        fill: '#1790ff'
    }
});

const AboutWrapper = Glamorous(XVertical)({
    padding: 6
});

const AboutTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#99A2B0'
});

const AboutText = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: -0.2,
    color: '#334562'
});

const LastSeenWrapper = Glamorous.div<{ online: boolean }>(props => ({
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '16px',
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0,
}));

const LastSeen = withOnline(props => {
    if (props.data.user && (props.data.user.lastSeen && props.data.user.lastSeen !== 'online' && !props.data.user.online)) {
        return (
            <LastSeenWrapper online={false}>
                Last seen {props.data.user.lastSeen === 'never_online' ? 'moments ago' : <XDate value={props.data.user.lastSeen} format="humanize_cute" />}
            </LastSeenWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return (
            <LastSeenWrapper online={true}>
                Online
            </LastSeenWrapper>
        );
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

interface MessengerWrapperProps {
    chatTitle: string;
    chatType: string;
    userName?: string;
    handlePageTitle?: any;
}

class MessengerWrapper extends React.Component<MessengerWrapperProps> {
    pageTitle: string | undefined = undefined;

    constructor(props: MessengerWrapperProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = (this.props.chatType === 'PrivateConversation') ? this.props.userName : this.props.chatTitle;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps(newProps: MessengerWrapperProps) {
        if (newProps.handlePageTitle) {
            let title = (newProps.chatType === 'PrivateConversation') ? newProps.userName : newProps.chatTitle;

            if (title !== this.pageTitle) {
                this.pageTitle = title;

                newProps.handlePageTitle(title);
            }
        }
    }

    render() {
        return (
            <XVertical flexGrow={1} separator={'none'} width="100%" height="100%">
                {this.props.children}
            </XVertical>
        );
    }
}

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
            fill: '#000'
        }
    }
});

const ForwardHeader = (props: { state: MessagesStateContextProps }) => {
    const { forwardMessagesId } = props.state;
    if (forwardMessagesId && forwardMessagesId.size) {
        let size = forwardMessagesId.size;
        return (
            <ChatHeaderContent justifyContent="space-between" alignItems="center">
                <ClearButton>
                    <XHorizontal separator={2} alignItems="center">
                        <span>{size} {size === 1 ? 'message selected' : 'messages selected'}</span>
                        <CloseIcon
                            onClick={() => {
                                props.state.resetAll();
                            }}
                        />
                    </XHorizontal>
                </ClearButton>
                <XHorizontal alignItems="center" separator={5}>
                    <XButton
                        text="Reply"
                        style="primary"
                        onClick={() => props.state.setReplyMessages(props.state.forwardMessagesId, null, null)}
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

let MessengerComponentLoader = withRoom(withQueryLoader((props) => {
    let tab: 'chat' | 'members' | 'call' = 'chat';
    if (props.router.query.tab === 'members') {
        tab = 'members';
    }
    if (props.router.query.tab === 'call') {
        tab = 'call';
    }

    let sharedRoom: Room_room_SharedRoom | null = props.data.room!.__typename === 'SharedRoom' ? props.data.room as any : null;
    let privateRoom: Room_room_PrivateRoom | null = props.data.room!.__typename === 'PrivateRoom' ? props.data.room as any : null;

    if (sharedRoom && sharedRoom.membership !== 'MEMBER') {
        return <RoomsInviteComponent room={sharedRoom} />;
    }
    let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';
    let titlePath: string | undefined = undefined;

    let subtitle = '';

    let subtitlePath: string | undefined = undefined;
    let uId: string | null = null;
    if (sharedRoom && sharedRoom.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (sharedRoom && sharedRoom.kind === 'GROUP') {
        subtitle = 'Group';
    } else if (sharedRoom && sharedRoom.kind === 'PUBLIC') {
        subtitle = 'Room';
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
                <XHorizontal alignItems="center" separator={8} maxWidth="100%" width="100%" flexBasis={0} flexGrow={1}>
                    <XAvatar
                        path={headerPath}
                        size="small"
                        style={(sharedRoom && sharedRoom.kind === 'INTERNAL'
                            ? 'organization'
                            : sharedRoom && sharedRoom.kind === 'GROUP'
                                ? 'group'
                                : sharedRoom && sharedRoom.kind === 'PUBLIC'
                                    ? 'room'
                                    : privateRoom
                                        ? 'user'
                                        : 'colorus'
                        )}
                        cloudImageUuid={sharedRoom && sharedRoom.photo || privateRoom && privateRoom.user.photo || undefined}
                        objectName={title}
                        objectId={sharedRoom ? (sharedRoom.organization ? sharedRoom.organization.id : sharedRoom.id) : privateRoom ? privateRoom.user.id : undefined}
                    />
                    <XVertical separator="none" maxWidth="calc(100% - 48px)">
                        <TitleWrapper separator={3}>
                            <Title path={titlePath}>
                                {title}
                            </Title>
                            {privateRoom && (
                                <SubTitle path={subtitlePath} inTop={true}>{subtitle}</SubTitle>
                            )}
                        </TitleWrapper>
                        <SubtitleWrapper>
                            {!privateRoom && (
                                <SubTitle path={subtitlePath}>{subtitle}</SubTitle>
                            )}
                            {uId && (
                                <LastSeen variables={{ userId: uId }} />
                            )}
                        </SubtitleWrapper>
                    </XVertical>
                </XHorizontal>
            </HeaderLeftContent>
            <XHorizontal alignItems="center" separator={5}>
                {sharedRoom && sharedRoom.kind === 'PUBLIC' && (
                    <XHorizontal separator={14}>
                        <RoomTabs>
                            <RoomTab query={{ field: 'tab' }} >Discussion</RoomTab>
                            <RoomTab query={{ field: 'tab', value: 'members' }}>
                                <XHorizontal separator={4} alignItems="center">
                                    <span>Members</span>
                                    {sharedRoom && (sharedRoom.role === 'ADMIN' || sharedRoom.role === 'OWNER') && sharedRoom.members.filter(m => m.membership === 'REQUESTED').length > 0 && (
                                        <XCounter big={true} count={sharedRoom.members.filter(m => m.membership === 'REQUESTED').length} />
                                    )}
                                </XHorizontal>
                            </RoomTab>
                        </RoomTabs>
                        <XHorizontal alignSelf="center" alignItems="center" separator={6}>
                            <InviteMembersModal
                                orgId={sharedRoom.organization ? sharedRoom.organization.id : ''}
                                channelTitle={title}
                                channelId={props.data.room!.id}
                                target={(
                                    <InviteButton text="Invite" size="small" icon={<PlusIcon />} />
                                )}
                            />
                            {sharedRoom.description && (
                                <XPopper
                                    showOnHover={true}
                                    placement="bottom-end"
                                    content={(
                                        <AboutWrapper separator={2} maxWidth={510}>
                                            <AboutTitle>About room</AboutTitle>
                                            <AboutText>{sharedRoom.description}</AboutText>
                                        </AboutWrapper>
                                    )}
                                >
                                    <InfoButton>
                                        <IconInfo />
                                    </InfoButton>
                                </XPopper>
                            )}
                        </XHorizontal>
                    </XHorizontal>
                )}

                {sharedRoom && sharedRoom.kind === 'GROUP' && (
                    <XHorizontal separator={14}>
                        <RoomTabs>
                            <RoomTab query={{ field: 'tab' }} >Discussion</RoomTab>
                            <RoomTab query={{ field: 'tab', value: 'members' }}>Members</RoomTab>
                            <XWithRole role="feature-non-production">
                                <RoomTab query={{ field: 'tab', value: 'call' }}>Call</RoomTab>
                            </XWithRole>
                        </RoomTabs>
                    </XHorizontal>
                )}

                <XOverflow
                    flat={true}
                    placement="bottom-end"
                    notificationStyle={true}
                    content={(
                        <div style={{ width: 160 }}>
                            <XMenuTitle>Notifications</XMenuTitle>
                            <NotificationSettings settings={(sharedRoom || privateRoom)!.settings} conversationId={props.data.room!.id} />
                        </div>
                    )}
                />
                {sharedRoom && (
                    <XOverflow
                        flat={true}
                        placement="bottom-end"
                        content={(
                            <div style={{ width: 160 }}>
                                {sharedRoom.kind === 'PUBLIC' && (
                                    <>
                                        <XMenuTitle>Super admin</XMenuTitle>
                                        {/* TODO recover admin features: */}
                                        {/* <RoomSetFeatured conversationId={props.data.room!.id} val={props.data.room!.featured} />
                                                <RoomSetHidden conversationId={props.data.room!.id} val={props.data.room!.hidden} /> */}
                                        <XMenuItem query={{ field: 'addMember', value: 'true' }}>Add Member</XMenuItem>
                                        <XMenuTitle>Common</XMenuTitle>
                                        <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                    </>
                                )}
                                {sharedRoom.kind === 'GROUP' && (
                                    <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                )}
                                <XMenuItem query={{ field: 'leaveFromChat', value: props.data.room!.id }} style="danger">Leave chat</XMenuItem>
                            </div>
                        )}
                    />
                )}
            </XHorizontal>
        </ChatHeaderContent>
    );

    let messagesState = ((props as any).state as MessagesStateContextProps);
    let selectedHeader = messagesState.useForwardHeader;
    let placeholder = messagesState.useForwardPlaceholder;
    return (
        <MessengerWrapper chatTitle={title} chatType={chatType} userName={privateRoom ? privateRoom.user.name : undefined} handlePageTitle={(props as any).handlePageTitle}>
            {placeholder && <FrowardPlaceholder state={messagesState} />}
            <ChatHeaderWrapper>
                {selectedHeader ? (
                    <ForwardHeader state={(props as any).state} />
                ) : headerRender()}
            </ChatHeaderWrapper>
            <TalkBarComponent conversationId={(sharedRoom || privateRoom)!.id} />
            <XHorizontal
                justifyContent="center"
                width="100%"
                height="calc(100% - 56px)"
                separator={0}
            >
                {tab === 'chat' && (
                    <MessengerRootComponent
                        conversationId={props.data.room!.id}
                        conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                    />
                )}
                {(sharedRoom && tab === 'members') && (
                    <ChannelMembersComponent
                        channelTitle={title}
                        key={props.data.room!.id + '_members'}
                        variables={{ channelId: sharedRoom.id }}
                        description={sharedRoom.description}
                        orgId={sharedRoom.organization ? sharedRoom.organization.id : ''}
                        removeFrom="room"
                    />
                )}

                {(sharedRoom && sharedRoom.kind === 'GROUP' && tab === 'call') && (
                    <XWithRole role="feature-non-production">
                        <ConferenceComponent conversationId={props.data.room!.id} />
                    </XWithRole>
                )}
            </XHorizontal>
            {sharedRoom && sharedRoom.kind === 'PUBLIC' && <RoomEditComponent title={sharedRoom.title} description={sharedRoom.description} socialImageRef={undefined} photoRef={sharedRoom.photo} refetchVars={{ conversationId: props.data.room!.id }} />}

            <AddMemberForm channelId={props.data.room!.id} refetchVars={{ conversationId: props.data.room!.id }} />
        </MessengerWrapper >
    );
})) as React.ComponentType<{ variables: { id: string }, handlePageTitle?: any, state: MessagesStateContextProps }>;

interface MessengerComponentProps {
    id: string;
    handlePageTitle?: any;
}

export const MessengerComponent = (props: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader
                variables={{ id: props.id }}
                handlePageTitle={props.handlePageTitle}
                state={state}
            />
        )}
    </MessagesStateContext.Consumer>
);
