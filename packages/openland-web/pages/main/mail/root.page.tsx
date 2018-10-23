import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';
import { ComposeComponent } from '../../../components/messenger/ComposeComponent';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { ChannelsExploreComponent } from '../../../components/messenger/ChannelsExploreComponent';
import { MessengerEmptyComponent } from '../../../components/messenger/MessengerEmptyComponent';
import { ChannelsInviteComponent } from '../../../components/messenger/ChannelsInviteComponent';
import { OrganizationProfile } from '../profile/ProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import { withChannelInviteInfo } from '../../../api/withChannelInviteInfo';
import { XLoader } from 'openland-x/XLoader';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import PlusIcon from '../../../components/icons/ic-add-medium-2.svg';
import { XFont } from 'openland-x/XFont';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XThemeDefault } from 'openland-x/XTheme';
import { withRouter } from 'openland-x-routing/withRouter';

export let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden'
});

export let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 345,
    flexShrink: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: XThemeDefault.separatorColor,
    backgroundColor: XThemeDefault.backgroundColor,
    '@media (max-width: 1100px)': {
        width: 300
    },
    '@media (max-width: 950px)': {
        width: 230
    }
});

export let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: '100%',
    maxHeight: '100vh',
    width: 'calc(100% - 345px)',
    backgroundColor: XThemeDefault.backgroundColor,
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 1100px)': {
        width: 'calc(100% - 300px)',
    },
    '@media (max-width: 950px)': {
        width: 'calc(100% - 230px)',
    }
});

export const Header = Glamorous(XHorizontal)({
    height: 48,
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 4,
    marginBottom: 3,
    flexShrink: 0,
});

export const Title = Glamorous.div({
    ...XFont.h600
});

export const OrganizationProfilContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0
});

export const ChannelInviteFromLink = withChannelInviteInfo((props) => (
    props.data && props.data.invite
        ? props.data.invite.channel.myStatus === 'member'
            ? <XPageRedirect path={'/mail/' + props.data.invite.channel.id} />
            : <ChannelsInviteComponent inviteLink={props.router.routeQuery.uuid} channel={props.data.invite.channel} invite={props.data.invite} />
        : <XLoader loading={true} />
));

export const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s'
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5
    }
});

let returnPath: string | undefined = undefined;

export default withApp('Mail', 'viewer', withRouter(withQueryLoader((props) => {
    let isCompose = props.router.path.endsWith('/new');
    if (!canUseDOM) {
        return (
            <>
                <XDocumentHead title={isCompose ? 'Compose' : 'Messages'} titleWithoutReverse={!isCompose} />
                <Scaffold>
                    {}
                </Scaffold>
            </>
        );
    }

    let isChannels = props.router.path.endsWith('/channels');
    let isInvite = props.router.path.includes('joinChannel');
    let oid = props.router.routeQuery.organizationId;
    let uid = props.router.routeQuery.userId;

    let tab: 'empty' | 'conversation' | 'compose' | 'channels' | 'invite' | 'organization' | 'user' = 'empty';

    if (isCompose) {
        tab = 'compose';
    }

    if (!isCompose && !props.router.routeQuery.conversationId) {
        tab = 'empty';
    }

    if (!isCompose && props.router.routeQuery.conversationId) {
        tab = 'conversation';
        // returnPath = props.router.path;

        let r = props.router;
        returnPath = r.href.replace(r.protocol + '://' + r.hostName, '');
    }

    if (isInvite) {
        tab = 'invite';
    }

    if (isChannels) {
        tab = 'channels';
    }

    if (oid) {
        tab = 'organization';
    }

    if (uid) {
        tab = 'user';
    }

    return (
        <>
            <XDocumentHead title={isCompose ? 'Compose' : 'Messages'} titleWithoutReverse={!isCompose} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChatContainer>
                        <ChatListContainer>
                            <Header alignItems="center" justifyContent="space-between">
                                <Title>Messages</Title>
                                <AddButton
                                    style="light"
                                    path="/mail/new"
                                    text="New"
                                    icon={<PlusIcon />}
                                    size="small"
                                />
                            </Header>
                            <ChatsComponent emptyState={tab === 'empty'} />
                        </ChatListContainer>
                        <ConversationContainer>
                            {tab === 'compose' && (
                                <MessengerContainer>
                                    <ComposeComponent conversationId={props.router.routeQuery.conversationId} />
                                </MessengerContainer>
                            )}
                            {tab === 'empty' && (
                                <MessengerEmptyComponent />
                            )}
                            {tab === 'conversation' && (
                                <MessengerComponent conversationId={props.router.routeQuery.conversationId} />
                            )}
                            {tab === 'channels' && (
                                <ChannelsExploreComponent />
                            )}
                            {tab === 'invite' && (
                                <ChannelInviteFromLink />
                            )}
                            {tab === 'organization' && (
                                <OrganizationProfilContainer>
                                    <OrganizationProfile organizationId={oid} onBack={() => returnPath ? props.router.push(returnPath) : null} />
                                </OrganizationProfilContainer>
                            )}
                            {tab === 'user' && (
                                <OrganizationProfilContainer>
                                    <UserProfile userId={uid} onBack={() => returnPath ? props.router.push(returnPath) : null} />
                                </OrganizationProfilContainer>
                            )}
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));