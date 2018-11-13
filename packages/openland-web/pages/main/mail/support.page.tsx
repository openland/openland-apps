import * as React from 'react';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { withApp } from '../../../components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MessengerComponent } from '../../../components/messenger/MessengerComponent';
import { ChatsComponent } from '../../../components/messenger/ChatsComponent';
import { MessengerContainer } from '../../../components/messenger/MessengerContainer';
import { ComposeComponent } from '../../../components/messenger/ComposeComponent';
import { ChannelsExploreComponent } from '../../../components/messenger/ChannelsExploreComponent';
import { MessengerEmptyComponent } from '../../../components/messenger/MessengerEmptyComponent';
import { OrganizationProfile } from '../profile/ProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';
import PlusIcon from '../../../components/icons/ic-add-medium-2.svg';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { withRouter } from 'openland-x-routing/withRouter';
import { ChatContainer, ChatListContainer, ConversationContainer, Header, Title, OrganizationProfilContainer, ChannelInviteFromLink, AddButton } from './root.page';

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
                                    <OrganizationProfile organizationId={oid} />
                                </OrganizationProfilContainer>
                            )}
                            {tab === 'user' && (
                                <OrganizationProfilContainer>
                                    <UserProfile userId={uid} />
                                </OrganizationProfilContainer>
                            )}
                        </ConversationContainer>
                    </ChatContainer>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));