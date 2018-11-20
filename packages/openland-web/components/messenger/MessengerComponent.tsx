import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XOverflow } from '../Incubator/XOverflow';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XMenuTitle, XMenuItemWrapper, XMenuItem } from 'openland-x/XMenuItem';
import { XDate } from 'openland-x/XDate';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withBlockUser } from '../../api/withBlockUser';
import { delay } from 'openland-y-utils/timer';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../../api/withChannelSetFeatured';
import { XLink } from 'openland-x/XLink';
import { ChannelMembersComponent } from '../../pages/main/modals/membersComponent';
import { InviteMembersModal } from '../../pages/main/modals/inviteMembersModal';
import { withConversationSettingsUpdate } from '../../api/withConversationSettingsUpdate';
import { RoomsInviteComponent } from './RoomsInviteComponent';
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
import { withSuperAddToChannel } from '../../api/withSuperAddToChannel';
import { XForm } from 'openland-x-forms/XForm';
import { XFormField } from 'openland-x-forms/XFormField';
import IconInfo from './components/icons/ic-info.svg';
import { XButton } from 'openland-x/XButton';
import PlusIcon from '../icons/ic-add-medium-2.svg';
import { TalkBarComponent } from '../conference/TalkBarComponent';
import { TalkContext } from '../conference/TalkProviderComponent';

const ChatHeaderWrapper = Glamorous.div<{ loading?: boolean; children: any }>(
    ({ loading }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        flexShrink: 0,
        paddingLeft: 20,
        paddingRight: 20,
        ...(loading
            ? {}
            : {
                  borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
              })
    })
);

const ChatHeaderContent = Glamorous(XHorizontal)({
    alignItems: 'center',
    maxWidth: 920,
    width: '100%',
    flexBasis: '100%'
});

const TitleWrapper = Glamorous(XHorizontal)({
    marginTop: '-2px!important'
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
        color: '#000000'
    }))
);

const SubtitleWrapper = Glamorous.div({
    marginTop: '4px!important',
    marginBottom: '0px!important'
});

const SubTitle = makeNavigable(
    Glamorous.div<NavigableChildProps & { inTop?: boolean }>(props => ({
        fontSize: 13,
        fontWeight: props.inTop ? 600 : 400,
        color: 'rgba(0, 0, 0, 0.4)',
        lineHeight: props.inTop ? '18px' : '16px',
        letterSpacing: 0,
        cursor: props.href ? 'pointer' : undefined
    }))
);

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(
    NavChatLeftContent
)(props => ({
    cursor: props.path || props.query ? 'pointer' : undefined
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
                                              userId: this.props.userId
                                          }
                                      })
                                    : this.props.block({
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

const BlockButton = withBlockUser(props => (
    <BlockSwitcherComponent
        block={props.block}
        unblock={props.unblock}
        blocked={(props as any).blocked}
        userId={(props as any).userId}
        refetchVars={(props as any).refetchVars}
    />
)) as React.ComponentType<{
    blocked: boolean;
    userId: string;
    refetchVars: { conversationId: string };
}>;

class SwitchComponent extends React.Component<
    {
        mutation: any;
        conversationId: string;
        val: boolean;
        fieldName: string;
        refetchVars: { conversationId: string };
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
        conversationId={(props as any).conversationId}
        refetchVars={(props as any).refetchVars}
    />
)) as React.ComponentType<{ val: boolean; conversationId: string }>;

export const RoomSetHidden = withChannelSetHidden(props => (
    <SwitchComponent
        mutation={props.setHidden}
        val={(props as any).val}
        fieldName={'hidden'}
        conversationId={(props as any).conversationId}
        refetchVars={(props as any).refetchVars}
    />
)) as React.ComponentType<{ val: boolean; conversationId: string }>;

class NotificationSettingsComponent extends React.Component<
    {
        mutation: any;
        settings: { mobileNotifications: string; mute: boolean };
        conversationId: string;
    },
    { settings: { mobileNotifications: string; mute: boolean } }
> {
    constructor(props: any) {
        super(props);
        this.state = { settings: props.settings };
    }

    apply = (mobile: string, mute: boolean) => {
        this.props.mutation({
            variables: {
                settings: {
                    mobileNotifications: mobile,
                    mute: mute
                },
                conversationId: this.props.conversationId
            }
        });
    }

    render() {
        return (
            <XVertical separator={0}>
                <XMenuItemWrapper key="mobile">
                    <XVertical>
                        <XCheckbox
                            label="Mobile"
                            switcher={true}
                            value={this.state.settings.mobileNotifications}
                            trueValue="ALL"
                            onChange={checked => {
                                this.apply(
                                    checked.checked ? 'ALL' : 'NONE',
                                    this.state.settings.mute
                                );
                                this.setState({
                                    settings: {
                                        ...this.state.settings,
                                        mobileNotifications: checked.checked
                                            ? 'ALL'
                                            : 'NONE'
                                    }
                                });
                            }}
                        />
                    </XVertical>
                </XMenuItemWrapper>
                <XMenuItemWrapper key="mute">
                    <XVertical>
                        <XCheckbox
                            label="Mute"
                            switcher={true}
                            value={this.state.settings.mute ? 'true' : 'false'}
                            trueValue="true"
                            onChange={checked => {
                                this.apply(
                                    this.state.settings.mobileNotifications,
                                    checked.checked
                                );
                                this.setState({
                                    settings: {
                                        ...this.state.settings,
                                        mute: !this.state.settings.mute
                                    }
                                });
                            }}
                        />
                    </XVertical>
                </XMenuItemWrapper>
            </XVertical>
        );
    }
}

const NotificationSettings = withConversationSettingsUpdate(props => (
    <NotificationSettingsComponent
        mutation={props.update}
        settings={(props as any).settings}
        conversationId={(props as any).conversationId}
    />
)) as React.ComponentType<{
    settings: { mobileNotifications: string; mute: boolean };
    conversationId: string;
}>;

const RoomTabs = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
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

export const GroupEditComponent = withAlterChat(props => {
    let editTitle = (props as any).title;
    let editPhotoRef = (props as any).photoRef;
    let editDescription = (props as any).description;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            targetQuery="editChat"
            title="Group settings"
            useTopCloser={true}
            defaultAction={data => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...(newTitle !== editTitle
                                ? { title: newTitle }
                                : {}),
                            ...(newDescription !== editDescription
                                ? { description: newDescription }
                                : {}),
                            ...(newPhoto !== editPhotoRef
                                ? { photoRef: newPhoto }
                                : {}),
                            ...(newLongDescription !== editLongDescription
                                ? { longDescription: newLongDescription }
                                : {})
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    longDescription: (props as any).longDescription || ''
                }
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload
                        size="default"
                        field="input.photoRef"
                        placeholder={{
                            add: 'Add photo',
                            change: 'Change Photo'
                        }}
                    />
                    <XVertical
                        flexGrow={1}
                        separator={10}
                        alignSelf="flex-start"
                    >
                        <XInput
                            field="input.title"
                            flexGrow={1}
                            title="Group name"
                            size="large"
                        />
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
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{
    title: string;
    description: string | null;
    longDescription?: string;
    photoRef: any;
    refetchVars: { conversationId: string };
}>;

export const RoomEditComponent = withAlterChat(props => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photoRef;
    let editSocialImageRef = (props as any).socialImageRef;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            title="Room settings"
            defaultAction={data => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...(newTitle !== editTitle
                                ? { title: newTitle }
                                : {}),
                            ...(newDescription !== editDescription
                                ? { description: newDescription }
                                : {}),
                            ...(newLongDescription !== editLongDescription
                                ? { longDescription: newLongDescription }
                                : {}),
                            ...(newPhoto !== editPhotoRef
                                ? { photoRef: newPhoto }
                                : {}),
                            ...(newSocialImage !== editSocialImageRef
                                ? { socialImageRef: newSocialImage }
                                : {})
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
                    socialImageRef: sanitizeIamgeRef(
                        (props as any).socialImageRef
                    )
                }
            }}
        >
            <XVertical>
                <XHorizontal>
                    <XAvatarUpload
                        size="small"
                        field="input.photoRef"
                        placeholder={{
                            add: 'Add photo',
                            change: 'Change Photo'
                        }}
                    />
                    <XVertical flexGrow={1}>
                        <XInput
                            field="input.title"
                            placeholder="Title"
                            size="large"
                        />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput
                                field="input.longDescription"
                                flexGrow={1}
                                placeholder="Embedded attach link"
                                size="large"
                            />
                        </XWithRole>
                        <XTextArea
                            valueStoreKey="fields.input.description"
                            placeholder="Description"
                            resize={false}
                        />
                    </XVertical>
                </XHorizontal>

                <XAvatarUpload
                    cropParams="1:1, free"
                    field="input.socialImageRef"
                    placeholder={{
                        add: 'Add social image',
                        change: 'Change social image'
                    }}
                />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{
    title: string;
    photoRef: any;
    description: string | null;
    longDescription: string | null;
    socialImageRef: any;
    refetchVars: { conversationId: string };
}>;

export const ChatEditComponent = withAlterChat(props => {
    let editTitle = (props as any).title;
    let editPhotoRef = (props as any).photoRef;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            targetQuery="editChat"
            title="Group settings"
            defaultAction={data => {
                let newTitle = data.input.title;
                let newPhoto = data.input.photoRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...(newTitle !== editTitle
                                ? { title: newTitle }
                                : {}),
                            ...(newPhoto !== editPhotoRef
                                ? { photoRef: newPhoto }
                                : {}),
                            ...(newLongDescription !== editLongDescription
                                ? { longDescription: newLongDescription }
                                : {})
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    longDescription: (props as any).longDescription || ''
                }
            }}
        >
            <XHorizontal>
                <XAvatarUpload
                    size="small"
                    field="input.photoRef"
                    placeholder={{ add: 'Add photo', change: 'Change Photo' }}
                />
                <XVertical flexGrow={1}>
                    <XInput
                        field="input.title"
                        flexGrow={1}
                        placeholder="Title"
                        size="large"
                    />
                    <XWithRole role="feature-chat-embedded-attach">
                        <XInput
                            field="input.longDescription"
                            flexGrow={1}
                            placeholder="Embedded attach link"
                            size="large"
                        />
                    </XWithRole>
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{
    title: string;
    longDescription?: string;
    photoRef: any;
    refetchVars: { conversationId: string };
}>;

export const AddMemberForm = withSuperAddToChannel(props => {
    return (
        <XModalFormOld
            title="Add member to room"
            submitMutation={props.add}
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
}) as React.ComponentType<{
    refetchVars: { conversationId: string };
    channelId: string;
}>;

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
    letterSpacing: 0
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
                    <XDate
                        value={props.data.user.lastSeen}
                        format="humanize_cute"
                    />
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
    handlePageTitle?: any;
    data: any;
    loading: boolean;
}

const getTitle = (data: any) => {
    return data.chat.title;
};

const getTypename = (data: any) => {
    return data.chat.__typename;
};

const getUsername = (data: any) => {
    return data.chat.__typename === 'PrivateConversation'
        ? data.chat.user.name
        : undefined;
};

const getPageTitle = (data: any) => {
    let chatType = getTypename(data);
    let userName = getUsername(data);
    let title = getTitle(data);

    return chatType === 'PrivateConversation' ? userName : title;
};

class MessengerWrapper extends React.Component<MessengerWrapperProps> {
    pageTitle: string | undefined = undefined;

    constructor(props: MessengerWrapperProps) {
        super(props);

        const data = props.data;

        if (this.props.handlePageTitle && !props.loading) {
            this.pageTitle = getPageTitle(data);
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps(newProps: MessengerWrapperProps) {
        const data = newProps.data;
        if (newProps.handlePageTitle && !newProps.loading) {
            let title = getPageTitle(data);

            if (title !== this.pageTitle) {
                this.pageTitle = title;
                newProps.handlePageTitle(title);
            }
        }
    }

    render() {
        return (
            <XVertical
                flexGrow={1}
                separator={'none'}
                width="100%"
                height="100%"
            >
                {this.props.children}
            </XVertical>
        );
    }
}

let HeaderLeftContent = (props: {
    chatType?: string;
    ownerRole?: boolean;
    path?: string;
    children?: any;
}) => {
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

type ChatHeaderWrapperInnerProps = {
    data: any;
    loading: any;
};

// let userName =
// props.data.chat.__typename === 'PrivateConversation'
//   ? props.data.chat.user.name
//   : undefined;
class ChatHeaderWrapperInner extends React.PureComponent<
    ChatHeaderWrapperInnerProps
> {
    render() {
        const { data, loading } = this.props;

        if (loading) {
            return (
                <ChatHeaderWrapper loading={loading}>
                    <ChatHeaderContent justifyContent="space-between">
                        <div />
                    </ChatHeaderContent>
                </ChatHeaderWrapper>
            );
        }

        const props = this.props;

        let title = getTitle(data);
        let chatType = getTypename(data);

        let titlePath: string | undefined = undefined;

        let subtitle = '';
        let subtitlePath = undefined;
        let uId = null;
        if (data.chat.__typename === 'SharedConversation') {
            subtitle = 'Organization';
        } else if (data.chat.__typename === 'GroupConversation') {
            subtitle = 'Group';
        } else if (data.chat.__typename === 'ChannelConversation') {
            subtitle = 'Room';
        } else if (data.chat.__typename === 'PrivateConversation') {
            uId = data.chat.user.id;

            if (data.chat.user.primaryOrganization) {
                subtitle = data.chat.user.primaryOrganization.name;
                titlePath = '/mail/u/' + data.chat.user.id;
                subtitlePath =
                    '/mail/o/' + data.chat.user.primaryOrganization.id;
            }
        }

        let ownerRole = false;
        if (data.chat.__typename === 'ChannelConversation') {
            ownerRole =
                data.chat.myRole === 'creator' ||
                data.chat.myRole === 'admin' ||
                data.chat.myRole === 'owner';
        }

        let headerPath =
            data.chat.__typename === 'SharedConversation' &&
            data.chat.organization
                ? '/mail/o/' + data.chat.organization.id
                : undefined;

        if (
            chatType === 'ChannelConversation' ||
            chatType === 'GroupConversation'
        ) {
            headerPath = '/mail/p/' + data.chat.id;
        }
        return (
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <HeaderLeftContent
                        chatType={chatType}
                        ownerRole={ownerRole}
                        path={headerPath}
                    >
                        <XHorizontal
                            alignItems="center"
                            separator={8}
                            maxWidth="100%"
                            width="100%"
                            flexBasis={0}
                            flexGrow={1}
                        >
                            <XAvatar
                                path={
                                    data.chat.__typename ===
                                        'SharedConversation' &&
                                    data.chat.organization
                                        ? '/mail/o/' + data.chat.organization.id
                                        : data.chat.__typename ===
                                          'PrivateConversation'
                                        ? titlePath
                                        : undefined
                                }
                                size="small"
                                style={
                                    data.chat.__typename ===
                                    'SharedConversation'
                                        ? 'organization'
                                        : data.chat.__typename ===
                                          'GroupConversation'
                                        ? 'group'
                                        : data.chat.__typename ===
                                          'ChannelConversation'
                                        ? 'room'
                                        : data.chat.__typename ===
                                          'PrivateConversation'
                                        ? 'user'
                                        : 'colorus'
                                }
                                cloudImageUuid={
                                    data.chat.photos.length > 0
                                        ? data.chat.photos[0]
                                        : (data.chat as any).photo
                                }
                                objectName={title}
                                objectId={data.chat.flexibleId}
                            />
                            <XVertical
                                separator="none"
                                maxWidth="calc(100% - 48px)"
                            >
                                <TitleWrapper separator={3}>
                                    <Title path={titlePath}>{title}</Title>
                                    {uId &&
                                        data.chat.__typename ===
                                            'PrivateConversation' && (
                                            <SubTitle
                                                path={subtitlePath}
                                                inTop={true}
                                            >
                                                {subtitle}
                                            </SubTitle>
                                        )}
                                </TitleWrapper>
                                <SubtitleWrapper>
                                    {data.chat.__typename !==
                                        'PrivateConversation' && (
                                        <SubTitle path={subtitlePath}>
                                            {subtitle}
                                        </SubTitle>
                                    )}
                                    {uId &&
                                        data.chat.__typename ===
                                            'PrivateConversation' && (
                                            <LastSeen
                                                variables={{ userId: uId }}
                                            />
                                        )}
                                </SubtitleWrapper>
                            </XVertical>
                        </XHorizontal>
                    </HeaderLeftContent>
                    <XHorizontal alignItems="center" separator={5}>
                        {data.chat.__typename === 'ChannelConversation' && (
                            <XHorizontal separator={14}>
                                <RoomTabs>
                                    <RoomTab query={{ field: 'tab' }}>
                                        Discussion
                                    </RoomTab>
                                    <RoomTab
                                        query={{
                                            field: 'tab',
                                            value: 'members'
                                        }}
                                    >
                                        <XHorizontal
                                            separator={4}
                                            alignItems="center"
                                        >
                                            <span>Members</span>
                                            {data.chat.organization &&
                                                data.chat.organization
                                                    .isOwner &&
                                                data.chat.memberRequestsCount >
                                                    0 && (
                                                    <XCounter
                                                        big={true}
                                                        count={
                                                            data.chat
                                                                .memberRequestsCount
                                                        }
                                                    />
                                                )}
                                        </XHorizontal>
                                    </RoomTab>
                                </RoomTabs>
                                <XHorizontal
                                    alignSelf="center"
                                    alignItems="center"
                                    separator={6}
                                >
                                    <XWithRole role="feature-non-production">
                                        <TalkContext.Consumer>
                                            {ctx =>
                                                ctx.cid !==
                                                    props.data.chat.id && (
                                                    <XButton
                                                        text="Call"
                                                        onClick={() =>
                                                            ctx.joinCall(
                                                                props.data.chat
                                                                    .id
                                                            )
                                                        }
                                                    />
                                                )
                                            }
                                        </TalkContext.Consumer>
                                    </XWithRole>
                                    <InviteMembersModal
                                        orgId={
                                            data.chat.organization
                                                ? data.chat.organization.id
                                                : ''
                                        }
                                        channelTitle={title}
                                        channelId={data.chat.id}
                                        target={
                                            <InviteButton
                                                text="Invite"
                                                size="small"
                                                icon={<PlusIcon />}
                                            />
                                        }
                                    />
                                    {data.chat.description && (
                                        <XPopper
                                            showOnHover={true}
                                            placement="bottom-end"
                                            content={
                                                <AboutWrapper
                                                    separator={2}
                                                    maxWidth={510}
                                                >
                                                    <AboutTitle>
                                                        About room
                                                    </AboutTitle>
                                                    <AboutText>
                                                        {data.chat.description}
                                                    </AboutText>
                                                </AboutWrapper>
                                            }
                                        >
                                            <InfoButton>
                                                <IconInfo />
                                            </InfoButton>
                                        </XPopper>
                                    )}
                                </XHorizontal>
                            </XHorizontal>
                        )}

                        {data.chat.__typename === 'GroupConversation' && (
                            <XHorizontal separator={14}>
                                <RoomTabs>
                                    <RoomTab
                                        query={{
                                            field: 'tab',
                                            value: 'discussion'
                                        }}
                                    >
                                        Discussion
                                    </RoomTab>
                                    <RoomTab
                                        query={{
                                            field: 'tab',
                                            value: 'members'
                                        }}
                                    >
                                        Members
                                    </RoomTab>
                                    <XWithRole role="feature-non-production">
                                        <RoomTab
                                            query={{
                                                field: 'tab',
                                                value: 'call'
                                            }}
                                        >
                                            Call
                                        </RoomTab>
                                    </XWithRole>
                                </RoomTabs>
                            </XHorizontal>
                        )}

                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            notificationStyle={true}
                            content={
                                <div style={{ width: 160 }}>
                                    <XMenuTitle>Notifications</XMenuTitle>
                                    <NotificationSettings
                                        settings={data.chat.settings}
                                        conversationId={data.chat.id}
                                    />

                                    {data.chat.__typename ===
                                        'PrivateConversation' && (
                                        <BlockButton
                                            blocked={(data.chat as any).blocked}
                                            userId={(data.chat as any).user.id}
                                            refetchVars={{
                                                conversationId: data.chat.id
                                            }}
                                        />
                                    )}
                                </div>
                            }
                        />
                        {data.chat.__typename !== 'PrivateConversation' && (
                            <XOverflow
                                flat={true}
                                placement="bottom-end"
                                content={
                                    <div style={{ width: 160 }}>
                                        {data.chat.__typename ===
                                            'ChannelConversation' && (
                                            <>
                                                <XMenuTitle>
                                                    Super admin
                                                </XMenuTitle>
                                                <RoomSetFeatured
                                                    conversationId={
                                                        data.chat.id
                                                    }
                                                    val={data.chat.featured}
                                                />
                                                <RoomSetHidden
                                                    conversationId={
                                                        data.chat.id
                                                    }
                                                    val={data.chat.hidden}
                                                />
                                                <XMenuItem
                                                    query={{
                                                        field: 'addMember',
                                                        value: 'true'
                                                    }}
                                                >
                                                    Add Member
                                                </XMenuItem>
                                                <XMenuTitle>Common</XMenuTitle>
                                                <XMenuItem
                                                    query={{
                                                        field: 'editChat',
                                                        value: 'true'
                                                    }}
                                                >
                                                    Settings
                                                </XMenuItem>
                                            </>
                                        )}
                                        {data.chat.__typename ===
                                            'GroupConversation' && (
                                            <XMenuItem
                                                query={{
                                                    field: 'editChat',
                                                    value: 'true'
                                                }}
                                            >
                                                Settings
                                            </XMenuItem>
                                        )}
                                        <XMenuItem
                                            query={{
                                                field: 'leaveFromChat',
                                                value: data.chat.id
                                            }}
                                            style="danger"
                                        >
                                            Leave chat
                                        </XMenuItem>
                                    </div>
                                }
                            />
                        )}
                    </XHorizontal>
                </ChatHeaderContent>
            </ChatHeaderWrapper>
        );
    }
}

let MessengerComponentLoader = withChat(class extends React.PureComponent<any> {
    render() {
        const props = this.props;

        let tab: 'chat' | 'members' | 'call' = 'chat';
        if (props.router.query.tab === 'members') {
            tab = 'members';
        }
        if (props.router.query.tab === 'call') {
            tab = 'call';
        }

        console.log(tab);

        if (
            props.data.chat &&
            props.data.chat.__typename === 'ChannelConversation' &&
            props.data.chat.myStatus !== 'member'
        ) {
            return <RoomsInviteComponent room={props.data.chat} />;
        }

        let title = this.props.data.chat && this.props.data.chat.title;

        console.log(this.props);

        return (
            <MessengerWrapper
                loading={props.loading}
                data={props.data}
                handlePageTitle={(props as any).handlePageTitle}
            >
                <ChatHeaderWrapperInner
                    {...{ data: props.data, loading: props.loading }}
                />
                {!props.loading && (
                    <TalkBarComponent conversationId={props.data.chat!.id} />
                )}
                <XHorizontal
                    justifyContent="center"
                    width="100%"
                    height="calc(100% - 56px)"
                    separator={0}
                >
                    {!props.loading && (
                        <XWithRole role="feature-chat-embedded-attach">
                            {(props.data.chat as any).longDescription &&
                                (props.data
                                    .chat as any).longDescription.startsWith(
                                    'http'
                                ) && (
                                    <iframe
                                        allow="microphone; camera"
                                        style={{ flexBasis: '150%' }}
                                        src={
                                            (props.data.chat as any)
                                                .longDescription
                                        }
                                    />
                                )}
                        </XWithRole>
                    )}
                    {tab === 'chat' && (
                        <MessengerRootComponent
                            loading={props.loading}
                            data={props.data}
                        />
                    )}
                    {!props.loading &&
                        props.data.chat.__typename === 'ChannelConversation' &&
                        tab === 'members' && (
                            <ChannelMembersComponent
                                channelTitle={title}
                                key={props.data.chat.id + '_members'}
                                variables={{ channelId: props.data.chat.id }}
                                description={props.data.chat.description}
                                longDescription={
                                    props.data.chat.longDescription
                                }
                                orgId={
                                    props.data.chat.organization
                                        ? props.data.chat.organization.id
                                        : ''
                                }
                                emptyText="To grow the community, invite people to this room"
                                removeFrom="room"
                            />
                        )}
                    {!props.loading &&
                        props.data.chat.__typename === 'GroupConversation' &&
                        tab === 'members' && (
                            <ChannelMembersComponent
                                channelTitle={title}
                                key={props.data.chat.id + '_members'}
                                variables={{ channelId: props.data.chat.id }}
                                description={undefined}
                                longDescription={undefined}
                                orgId={''}
                                removeFrom="group"
                            />
                        )}
                </XHorizontal>

                {!props.loading && (
                    <ChatEditComponent
                        title={props.data.chat.title}
                        longDescription={
                            (props.data.chat as any).longDescription
                        }
                        photoRef={(props.data.chat as any).photoRef}
                        refetchVars={{ conversationId: props.data.chat.id }}
                    />
                )}
                {!props.loading &&
                    props.data.chat.__typename === 'ChannelConversation' && (
                        <RoomEditComponent
                            title={props.data.chat.title}
                            description={props.data.chat.description}
                            longDescription={props.data.chat.longDescription}
                            socialImageRef={props.data.chat.socialImageRef}
                            photoRef={props.data.chat.photoRef}
                            refetchVars={{ conversationId: props.data.chat.id }}
                        />
                    )}
                {!props.loading && (
                    <AddMemberForm
                        channelId={props.data.chat.id}
                        refetchVars={{ conversationId: props.data.chat.id }}
                    />
                )}
            </MessengerWrapper>
        );
    }
} as any) as React.ComponentType<{
    variables: { conversationId: string };
    handlePageTitle?: any;
}>;

export const MessengerComponent = (props: {
    conversationId: string;
    handlePageTitle?: any;
}) => {
    return (
        <MessengerComponentLoader
            variables={{ conversationId: props.conversationId }}
            handlePageTitle={props.handlePageTitle}
        />
    );
};
