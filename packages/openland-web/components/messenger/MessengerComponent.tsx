import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XOverflow } from '../Incubator/XOverflow';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XMenuTitle, XMenuItemWrapper, XMenuItem } from 'openland-x/XMenuItem';
import { XDate } from 'openland-x-format/XDate';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withBlockUser } from '../../api/withBlockUser';
import { delay } from 'openland-y-utils/timer';
import { XWithRole, hasRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../../api/withChannelSetFeatured';
import { XLink } from 'openland-x/XLink';
import { ChannelMembersComponent } from '../../pages/main/channel/components/membersComponent';
import { withConversationSettingsUpdate } from '../../api/withConversationSettingsUpdate';
import { ChannelsInviteComponent } from './ChannelsInviteComponent';
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
import { withSuperAddToChannel } from '../../api/withSuperAddToChannel';
import { XForm } from 'openland-x-forms/XForm';
import { XFormField } from 'openland-x-forms/XFormField';
import IconInfo from './components/icons/ic-info.svg';
import { XButton } from 'openland-x/XButton';
import PlusIcon from '../icons/ic-add-medium-2.svg';

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

const BlockButton = withBlockUser((props) => (
    <BlockSwitcherComponent block={props.block} unblock={props.unblock} blocked={(props as any).blocked} userId={(props as any).userId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ blocked: boolean, userId: string, refetchVars: { conversationId: string } }>;

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

export const ChannelSetFeatured = withChannelSetFeatured((props) => (
    <SwitchComponent mutation={props.setFeatured} val={(props as any).val} fieldName={'featured'} conversationId={(props as any).conversationId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ val: boolean, conversationId: string }>;

export const ChannelSetHidden = withChannelSetHidden((props) => (
    <SwitchComponent mutation={props.setHidden} val={(props as any).val} fieldName={'hidden'} conversationId={(props as any).conversationId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ val: boolean, conversationId: string }>;

class NotificationSettingsComponent extends React.Component<{ mutation: any, settings: { mobileNotifications: string, mute: boolean }, conversationId: string }, { settings: { mobileNotifications: string, mute: boolean } }> {
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
                conversationId: this.props.conversationId,
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
                            onChange={(checked) => {
                                this.apply(checked.checked ? 'ALL' : 'NONE', this.state.settings.mute);
                                this.setState({
                                    settings: { ... this.state.settings, mobileNotifications: checked.checked ? 'ALL' : 'NONE' }
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
                            onChange={(checked) => {
                                this.apply(this.state.settings.mobileNotifications, checked.checked);
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
)) as React.ComponentType<{ settings: { mobileNotifications: string, mute: boolean }, conversationId: string }>;

const ChannelTabs = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
});

const ChannelTab = Glamorous(XLink)({
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

export const ChannelEditComponent = withAlterChat((props) => {
    let editTitle = (props as any).title;
    let editDescription = (props as any).description;
    let editPhotoRef = (props as any).photoRef;
    let editSocialImageRef = (props as any).socialImageRef;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            title="Channel settings"
            defaultAction={(data) => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...newTitle !== editTitle ? { title: newTitle } : {},
                            ...newDescription !== editDescription ? { description: newDescription } : {},
                            ...newLongDescription !== editLongDescription ? { longDescription: newLongDescription } : {},
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
            <XVertical>
                <XHorizontal>
                    <XAvatarUpload size="small" field="input.photoRef" placeholder={{ add: 'Add photo', change: 'Change Photo' }} />
                    <XVertical flexGrow={1}>
                        <XInput field="input.title" placeholder="Title" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput field="input.longDescription" flexGrow={1} placeholder="Embedded attach link" size="large" />
                        </XWithRole>
                        <XTextArea valueStoreKey="fields.input.description" placeholder="Description" resize={false} />
                    </XVertical>
                </XHorizontal>

                <XAvatarUpload cropParams="1:1, free" field="input.socialImageRef" placeholder={{ add: 'Add social image', change: 'Change social image' }} />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ title: string, photoRef: any, description: string, longDescription: string, socialImageRef: any, refetchVars: { conversationId: string } }>;

export const ChatEditComponent = withAlterChat((props) => {
    let editTitle = (props as any).title;
    let editPhotoRef = (props as any).photoRef;
    let editLongDescription = (props as any).longDescription;
    return (
        <XModalForm
            targetQuery="editChat"
            title="Group settings"
            defaultAction={(data) => {
                let newTitle = data.input.title;
                let newPhoto = data.input.photoRef;
                let newLongDescription = data.input.longDescription;

                props.alter({
                    variables: {
                        input: {
                            ...newTitle !== editTitle ? { title: newTitle } : {},
                            ...newPhoto !== editPhotoRef ? { photoRef: newPhoto } : {},
                            ...newLongDescription !== editLongDescription ? { longDescription: newLongDescription } : {},
                        }
                    }
                });
            }}
            defaultData={{
                input: {
                    title: (props as any).title || '',
                    photoRef: sanitizeIamgeRef((props as any).photoRef),
                    longDescription: (props as any).longDescription || '',
                }
            }}
        >
            <XHorizontal>
                <XAvatarUpload size="small" field="input.photoRef" placeholder={{ add: 'Add photo', change: 'Change Photo' }} />
                <XVertical flexGrow={1}>
                    <XInput field="input.title" flexGrow={1} placeholder="Title" size="large" />
                    <XWithRole role="feature-chat-embedded-attach">
                        <XInput field="input.longDescription" flexGrow={1} placeholder="Embedded attach link" size="large" />
                    </XWithRole>
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ title: string, longDescription?: string, photoRef: any, refetchVars: { conversationId: string } }>;

const AddMemberForm = withSuperAddToChannel((props) => {
    return (
        <XModalFormOld
            title="Add member to channel"
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

    constructor (props: MessengerWrapperProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = (this.props.chatType === 'PrivateConversation') ? this.props.userName : this.props.chatTitle;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps (newProps: MessengerWrapperProps) {
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

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    let tab: 'chat' | 'members' = 'chat';
    if (props.router.query.tab === 'members') {
        tab = 'members';
    }

    if (props.data.chat.__typename === 'ChannelConversation' && props.data.chat.myStatus !== 'member') {
        return <ChannelsInviteComponent channel={props.data.chat} onDirectory={(props as any).onDirectory} />;
    }
    let title = props.data.chat.title;
    let titlePath: string | undefined = undefined;

    let subtitle = '';
    let subtitlePath = undefined;
    let uId = null;
    if (props.data.chat.__typename === 'SharedConversation') {
        subtitle = 'Organization';
    } else if (props.data.chat.__typename === 'GroupConversation') {
        subtitle = 'Group';
    } else if (props.data.chat.__typename === 'ChannelConversation') {
        subtitle = 'Channel';
    } else if (props.data.chat.__typename === 'PrivateConversation') {
        uId = props.data.chat.user.id;

        if (props.data.chat.user.primaryOrganization) {
            subtitle = props.data.chat.user.primaryOrganization.name;
            titlePath = '/mail/u/' + props.data.chat.user.id;
            subtitlePath = '/mail/o/' + props.data.chat.user.primaryOrganization.id;
        }
    }

    let chatType = props.data.chat.__typename;
    let userName = (props.data.chat.__typename === 'PrivateConversation') ? props.data.chat.user.name : undefined;

    let ownerRole = false;
    if (props.data.chat.__typename === 'ChannelConversation') {
        ownerRole = props.data.chat.myRole === 'creator' || props.data.chat.myRole === 'admin' || props.data.chat.myRole === 'owner';
    }

    let headerQuery = undefined;
    if (props.data.chat.__typename === 'ChannelConversation') {
        headerQuery = (ownerRole || hasRole(['editor', 'super-admin'])) ? { field: 'editChat', value: 'true' } : undefined;
    } else if (props.data.chat.__typename === 'GroupConversation') {
        headerQuery = { field: 'editChat', value: 'true' };
    }

    return (
        <MessengerWrapper chatTitle={title} chatType={chatType} userName={userName} handlePageTitle={(props as any).handlePageTitle}>
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <NavChatLeftContentStyled
                        path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/mail/o/' + props.data.chat.organization.id : undefined}
                        query={headerQuery}
                        separator={10}
                        alignItems="center"
                        flexGrow={0}
                        maxWidth={subtitle === 'Channel' ? 'calc(100% - 380px)' : 'calc(100% - 100px)'}
                        width={subtitle === 'Channel' ? 'calc(100% - 380px)' : 'calc(100% - 100px)'}
                    >
                        <XHorizontal alignItems="center" separator={8} maxWidth="100%" width="100%" flexBasis={0} flexGrow={1}>
                            <XAvatar
                                path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/mail/o/' + props.data.chat.organization.id : (props.data.chat.__typename === 'PrivateConversation' ? titlePath : undefined)}
                                size="small"
                                style={(props.data.chat.__typename === 'SharedConversation'
                                    ? 'organization'
                                    : props.data.chat.__typename === 'GroupConversation'
                                        ? 'group'
                                        : props.data.chat.__typename === 'ChannelConversation'
                                            ? 'channel'
                                            : props.data.chat.__typename === 'PrivateConversation'
                                                ? 'user'
                                                : 'colorus'
                                )}
                                cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : (props.data.chat as any).photo}
                                objectName={title}
                                objectId={props.data.chat.flexibleId}
                            />
                            <XVertical separator="none" maxWidth="calc(100% - 48px)">
                                <TitleWrapper separator={3}>
                                    <Title path={titlePath}>
                                        {title}
                                    </Title>
                                    {(uId && props.data.chat.__typename === 'PrivateConversation') && (
                                        <SubTitle path={subtitlePath} inTop={true}>{subtitle}</SubTitle>
                                    )}
                                </TitleWrapper>
                                <SubtitleWrapper>
                                    {(props.data.chat.__typename !== 'PrivateConversation') && (
                                        <SubTitle path={subtitlePath}>{subtitle}</SubTitle>
                                    )}
                                    {(uId && props.data.chat.__typename === 'PrivateConversation') && (
                                        <LastSeen variables={{ userId: uId }} />
                                    )}
                                </SubtitleWrapper>
                            </XVertical>
                        </XHorizontal>
                    </NavChatLeftContentStyled>
                    <XHorizontal alignItems="center" separator={5}>
                        {props.data.chat.__typename === 'ChannelConversation' && (
                            <XHorizontal separator={14}>
                                <ChannelTabs>
                                    <ChannelTab query={{ field: 'tab' }} >Discussion</ChannelTab>
                                    <ChannelTab query={{ field: 'tab', value: 'members' }}>
                                        <XHorizontal separator={4} alignItems="center">
                                            <span>Members</span>
                                            {props.data.chat.organization && props.data.chat.organization.isOwner && props.data.chat.memberRequestsCount > 0 && (
                                                <XCounter big={true} count={props.data.chat.memberRequestsCount} />
                                            )}
                                        </XHorizontal>
                                    </ChannelTab>
                                </ChannelTabs>
                                <XHorizontal alignSelf="center" alignItems="center" separator={6}>
                                    <InviteMembersModal
                                        orgId={props.data.chat.organization ? props.data.chat.organization.id : ''}
                                        channelTitle={title}
                                        channelId={props.data.chat.id}
                                        target={(
                                            <InviteButton text="Invite" size="small" icon={<PlusIcon />} />
                                        )}
                                    />
                                    {props.data.chat.description && (
                                        <XPopper
                                            showOnHover={true}
                                            placement="bottom-end"
                                            content={(
                                                <AboutWrapper separator={2} maxWidth={510}>
                                                    <AboutTitle>About channel</AboutTitle>
                                                    <AboutText>{props.data.chat.description}</AboutText>
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

                        {props.data.chat.__typename === 'GroupConversation' && (
                            <XHorizontal separator={14}>
                                <ChannelTabs>
                                    <ChannelTab query={{ field: 'tab' }} >Discussion</ChannelTab>
                                    <ChannelTab query={{ field: 'tab', value: 'members' }}>Members</ChannelTab>
                                </ChannelTabs>
                            </XHorizontal>
                        )}

                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            notificationStyle={true}
                            content={(
                                <div style={{ width: 160 }}>
                                    <XMenuTitle>Notifications</XMenuTitle>
                                    <NotificationSettings settings={props.data.chat.settings} conversationId={props.data.chat.id} />

                                    {props.data.chat.__typename === 'PrivateConversation' && (
                                        <BlockButton
                                            blocked={(props.data.chat as any).blocked}
                                            userId={(props.data.chat as any).user.id}
                                            refetchVars={{ conversationId: props.data.chat.id }}
                                        />
                                    )}
                                </div>
                            )}
                        />
                        {props.data.chat.__typename !== 'PrivateConversation' && (
                            <XOverflow
                                flat={true}
                                placement="bottom-end"
                                content={(
                                    <div style={{ width: 160 }}>
                                        {props.data.chat.__typename === 'ChannelConversation' && (
                                            <>
                                                <XWithRole role={['editor', 'super-admin']}>
                                                    <XMenuTitle>Super admin</XMenuTitle>
                                                    <ChannelSetFeatured conversationId={props.data.chat.id} val={props.data.chat.featured} />
                                                    <ChannelSetHidden conversationId={props.data.chat.id} val={props.data.chat.hidden} />
                                                    <XMenuItem query={{ field: 'addMember', value: 'true' }}>Add Member</XMenuItem>
                                                    <XMenuTitle>Common</XMenuTitle>
                                                    <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                                </XWithRole>

                                                <XWithRole role={['editor', 'super-admin']} negate={true}>
                                                    {ownerRole && (
                                                        <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                                    )}
                                                    {!ownerRole && (
                                                        <XWithRole role={['admin']} orgPermission={props.data.chat.organization ? props.data.chat.organization.id : ''}>
                                                            <XMenuItem query={{ field: 'editChat', value: 'true' }}>Settings</XMenuItem>
                                                        </XWithRole>
                                                    )}
                                                </XWithRole>
                                            </>
                                        )}
                                        <XMenuItem query={{ field: 'leaveFromChat', value: props.data.chat.id }} style="danger">Leave chat</XMenuItem>
                                    </div>
                                )}
                            />
                        )}
                    </XHorizontal>
                </ChatHeaderContent>
            </ChatHeaderWrapper>
            <XHorizontal
                justifyContent="center"
                width="100%"
                height="calc(100% - 56px)"
                separator={0}
            >
                <XWithRole role="feature-chat-embedded-attach">
                    {(props.data.chat as any).longDescription && (props.data.chat as any).longDescription.startsWith('http') && (
                        <iframe allow="microphone; camera" style={{ flexBasis: '150%' }} src={(props.data.chat as any).longDescription} />
                    )}
                </XWithRole>
                {tab === 'chat' && (
                    <MessengerRootComponent
                        conversationId={props.data.chat.id}
                        conversationType={props.data.chat.__typename}
                    />
                )}
                {(props.data.chat.__typename === 'ChannelConversation' && tab === 'members') && (
                    <ChannelMembersComponent
                        channelTitle={title}
                        key={props.data.chat.id + '_members'}
                        variables={{ channelId: props.data.chat.id }}
                        description={props.data.chat.description}
                        longDescription={props.data.chat.longDescription}
                        orgId={props.data.chat.organization ? props.data.chat.organization.id : ''}
                        emptyText="To grow the community, invite people to this channel"
                        removeFrom="channel"
                    />
                )}
                {(props.data.chat.__typename === 'GroupConversation' && tab === 'members') && (
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
            <ChatEditComponent title={props.data.chat.title} longDescription={(props.data.chat as any).longDescription} photoRef={(props.data.chat as any).photoRef} refetchVars={{ conversationId: props.data.chat.id }} />
            {props.data.chat.__typename === 'ChannelConversation' && <ChannelEditComponent title={props.data.chat.title} description={props.data.chat.description} longDescription={props.data.chat.longDescription} socialImageRef={props.data.chat.socialImageRef} photoRef={props.data.chat.photoRef} refetchVars={{ conversationId: props.data.chat.id }} />}

            <XWithRole role={['super-admin']}>
                <AddMemberForm channelId={props.data.chat.id} refetchVars={{ conversationId: props.data.chat.id }} />
            </XWithRole>
        </MessengerWrapper>
    );
})) as React.ComponentType<{ variables: { conversationId: string }, onDirectory?: boolean, handlePageTitle?: any }>;

export const MessengerComponent = (props: { conversationId: string, onDirectory?: boolean, handlePageTitle?: any }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} onDirectory={props.onDirectory} handlePageTitle={props.handlePageTitle} />);
};