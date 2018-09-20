import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { withAllChats } from '../../../api/withAllChats';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';
import { ComposeComponent } from '../../../components/messenger/ComposeComponent';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
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
import PlusIcon from '../../../components/icons/ic-add-medium.svg';

let ChatContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    height: '100vh',
    width: '100%',
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'hidden'
});

let ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: 300,
    flexShrink: 0,
    borderRight: '1px solid rgba(216, 218, 229, 0.7)',
    backgroundColor: '#ffffff',
    '@media (max-width: 950px)': {
        width: 200
    }
});

let ConversationContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    width: 'calc(100% - 300px)',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 950px)': {
        width: 'calc(100% - 200px)',
    }
});

const Header = Glamorous(XHorizontal)({
    height: 48,
    paddingLeft: 16,
    paddingRight: 12,
    marginTop: 3,
    marginBottom: 4,
    flexShrink: 0,
});

const Title = Glamorous.div({
    fontSize: 18,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.4,
    color: '#334562'
});

const OrganizationProfilContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0
});

const ChannelInviteFromLink = withChannelInviteInfo((props) => (
    props.data && props.data.invite
        ? props.data.invite.channel.myStatus === 'member'
            ? <XPageRedirect path={'/mail/' + props.data.invite.channel.id} />
            : <ChannelsInviteComponent inviteLink={props.router.routeQuery.uuid} channel={props.data.invite.channel} invite={props.data.invite} />
        : <XLoader loading={true} />
));

const AddButton = Glamorous(XButton)({
    marginTop: 5,
    '& svg > g > path': {
        transition: 'all .2s'
    },
    '&:active svg > g > path:last-child': {
        fill: '#fff'
    }
});

let returnPath: string | undefined = undefined;

export default withApp('Mail', 'viewer', withAllChats(withQueryLoader((props) => {

    let isCompose = props.router.path.endsWith('/new');
    let isChannels = props.router.path.endsWith('/channels');
    let isInvite = props.router.path.includes('joinChannel');
    let oid = props.router.routeQuery.organizationId;
    let uid = props.router.routeQuery.userId;

    let tab: 'empty' | 'conversation' | 'compose' | 'channels' | 'invite' | 'organization' | 'user' = 'empty';

    if (isCompose && canUseDOM) {
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
            <XDocumentHead title={isCompose ? 'Compose' : 'Mail'} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ChatContainer>
                        <ChatListContainer>
                            <Header alignItems="center" justifyContent="space-between">
                                <Title>Messenger</Title>
                                <AddButton
                                    path="/mail/new"
                                    text="New chat"
                                    icon={<PlusIcon />}
                                    size="r-small"
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