import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withChat } from '../../api/withChat';
import { withQueryLoader } from '../withQueryLoader';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XOverflow } from '../Incubator/XOverflow';
import { XAvatar } from 'openland-x/XAvatar';
import { makeNavigable } from 'openland-x/Navigable';
import { XMenuTitle, XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XCheckbox, XCheckboxBasic } from 'openland-x/XCheckbox';
import { XButton } from 'openland-x/XButton';
import { withBlockUser } from '../../api/withBlockUser';
import { XLoadingCircular } from 'openland-x/XLoadingCircular';
import { delay } from 'openland-y-utils/timer';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withChannelSetFeatured } from '../../api/withChannelSetFeatured';
import { XLink } from 'openland-x/XLink';
import { ChannelMembersComponent } from '../../pages/main/channel/components/membersComponent';
import { withConversationSettingsUpdate } from '../../api/withConversationSettingsUpdate';
import { ChannelsInviteComponent } from './ChannelsInviteComponent';
import { InviteMembersModal } from '../../pages/main/channel/components/inviteMembersModal';
import { withChannelInviteInfo } from '../../api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

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
    maxWidth: '100%',
    width: '100%',
    flexBasis: '100%'
});

const Title = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1790ff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
});

const SubTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.1,
    color: '#5c6a81',
    opacity: 0.5
});

const NavChatLeftContent = makeNavigable(XHorizontal);

const NavChatLeftContentStyled = Glamorous<{ path?: string } & any>(NavChatLeftContent)(props => ({
    cursor: props.path ? 'pointer' : undefined
}));

const XButtonMargin = Glamorous(XButton)({
    margin: 4
});

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

                        }
                        }
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

const BlockButton = withBlockUser((props) => (
    <BlockSwitcherComponent block={props.block} unblock={props.unblock} blocked={(props as any).blocked} userId={(props as any).userId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ blocked: boolean, userId: string, refetchVars: { conversationId: string } }>;

class ChannelSetFeaturedComponent extends React.Component<{ mutation: any, conversationId: string, featured: boolean, refetchVars: { conversationId: string } }, { featured: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { featured: props.featured };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label="Featured"
                        value={this.state.featured ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    channelId: this.props.conversationId,
                                    featured: !this.props.featured
                                }
                            });
                            this.setState({
                                featured: !this.state.featured
                            });
                        }
                        }
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

const ChannelSetFeatured = withChannelSetFeatured((props) => (
    <ChannelSetFeaturedComponent mutation={props.setFeatured} featured={(props as any).featured} conversationId={(props as any).conversationId} refetchVars={(props as any).refetchVars} />
)) as React.ComponentType<{ featured: boolean, conversationId: string, refetchVars: { conversationId: string } }>;

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
            <XVertical>
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

let MessengerComponentLoader = withChat(withQueryLoader((props) => {
    let tab: 'chat' | 'members' = 'chat';
    if (props.router.query.tab === 'members') {
        tab = 'members';
    }

    if (props.data.chat.__typename === 'ChannelConversation' && props.data.chat.myStatus !== 'member') {
        return <ChannelsInviteComponent channel={props.data.chat} />;
    }
    let title = props.data.chat.__typename === 'ChannelConversation' ?
        ((!props.data.chat.isRoot && props.data.chat.organization ? props.data.chat.organization.name + '/' : '') + props.data.chat.title) :
        props.data.chat.title;
    return (
        <XVertical flexGrow={1} separator={'none'} width="100%" height="100%">
            <ChatHeaderWrapper>
                <ChatHeaderContent justifyContent="space-between">
                    <NavChatLeftContentStyled
                        path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                        separator={10}
                        alignItems="center"
                        flexGrow={0}
                    >
                        <XHorizontal alignItems="center" separator={6}>
                            <XAvatar
                                path={props.data.chat.__typename === 'SharedConversation' && props.data.chat.organization ? '/o/' + props.data.chat.organization.id : undefined}
                                size="small"
                                style={(props.data.chat.__typename === 'SharedConversation'
                                    ? 'organization'
                                    : props.data.chat.__typename === 'ChannelConversation'
                                        ? 'channel' : undefined
                                )}
                                cloudImageUuid={props.data.chat.photos.length > 0 ? props.data.chat.photos[0] : undefined}
                            />
                            <XHorizontal alignItems="center" separator={6}>
                                <Title>{title}</Title>
                                <SubTitle>
                                    {(props.data.chat.__typename === 'SharedConversation'
                                        ? 'Organization'
                                        : props.data.chat.__typename === 'GroupConversation'
                                            ? 'Group'
                                            : props.data.chat.__typename === 'ChannelConversation'
                                                ? 'Channel' : 'Person'
                                    )}
                                </SubTitle>
                            </XHorizontal>
                        </XHorizontal>
                    </NavChatLeftContentStyled>
                    <XHorizontal alignItems="center">
                        {props.data.chat.__typename === 'ChannelConversation' && (
                            <>
                                <ChannelTabs>
                                    <ChannelTab query={{ field: 'tab' }} >Discussion</ChannelTab>
                                    <ChannelTab query={{ field: 'tab', value: 'members' }}>Members</ChannelTab>
                                </ChannelTabs>
                                <InviteMembersModal
                                    channelTitle={title}
                                    channelId={props.data.chat.id}
                                    target={
                                        <XButton text="Invite" iconResponsive="add" icon="add" size="r-default" />
                                    }
                                />
                            </>
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
                        {props.data.chat.__typename === 'ChannelConversation' && <XWithRole role={['editor', 'super-admin']}>
                            <XOverflow
                                flat={true}
                                placement="bottom-end"
                                content={(
                                    <div style={{ width: 160 }}>
                                        <XMenuTitle>Super admin</XMenuTitle>
                                        <ChannelSetFeatured conversationId={props.data.chat.id} featured={props.data.chat.featured} refetchVars={{ conversationId: props.data.chat.id }} />
                                    </div>
                                )}
                            />
                        </XWithRole>}
                    </XHorizontal>
                </ChatHeaderContent>
            </ChatHeaderWrapper>
            <XHorizontal
                justifyContent="center"
                width="100%"
                height="calc(100% - 56px)"
                maxHeight="calc(100% - 56px)"
            >
                {tab === 'chat' && <MessengerRootComponent key={props.data.chat.id} conversationId={props.data.chat.id} />}
                {props.data.chat.__typename === 'ChannelConversation' && tab === 'members' && <ChannelMembersComponent key={props.data.chat.id + '_members'} variables={{ channelId: props.data.chat.id }} {...{ isMyOrganization: props.data.chat.organization && props.data.chat.organization.isMine }} />}
            </XHorizontal>
        </XVertical>
    );
}));

export const MessengerComponent = (props: { conversationId: string }) => {
    return (<MessengerComponentLoader variables={{ conversationId: props.conversationId }} />);
};