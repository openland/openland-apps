import * as React from 'react';
import { XView } from 'react-mental';
import NewChatIcon from 'openland-icons/ic-new-chat.svg';
import { tabs, tabsT } from '../tabs';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { TextDirectory } from 'openland-text/TextDirectory';
import { ConversationContainerWrapper } from 'openland-web/pages/main/mail/components/Components';
import { ChatHeaderViewLoader } from 'openland-web/fragments/chat/ChatHeaderView';
import { Navigation } from '../../../../components/Navigation';
import { XMemo } from 'openland-y-utils/XMemo';
import { ErrorPage } from 'openland-web/pages/root/ErrorPage';

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    const result = myPath.split(substring)[1];
    if (result.includes('/')) {
        return null;
    }
    return result;
};

class ErrorBoundary extends React.Component<any, { error: any }> {
    static getDerivedStateFromError(error: any) {
        return { error };
    }

    constructor(props: any) {
        super(props);
        this.state = { error: null };
    }

    componentWillReceiveProps() {
        this.setState({
            error: null,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorPage statusCode={null} message={this.state.error.message} />;
        }

        return this.props.children;
    }
}

export const MessagesNavigation = XMemo(
    ({ path, cid, oid, uid }: { cid?: string; oid?: string; uid?: string; path?: any }) => {
        let tab: tabsT = tabs.empty;

        // let isCompose = path.endsWith('/new');

        let isRooms = path.endsWith('/channels');
        let isCall = path.endsWith('/call');
        let isOrganizationInvite = path.includes('join') && !path.includes('joinChannel');
        let isRoomInvite = path.includes('joinChannel') || path.includes('invite');
        let isChat = path.includes('/mail');
        let isRoomProfile = path.includes('/mail/p/');

        const chatId = !path.includes('/mail/new') && getId(path, '/mail/');

        if (!cid) {
            tab = tabs.empty;
        }

        if (cid) {
            tab = tabs.conversation;
        }

        if (isOrganizationInvite) {
            tab = tabs.organizationInvite;
        }
        if (isRoomInvite) {
            tab = tabs.roomInvite;
        }

        if (isRooms) {
            tab = tabs.rooms;
        }

        if (isCall) {
            tab = tabs.conference;
        }

        if (oid) {
            tab = tabs.organization;
        }

        if (uid) {
            tab = tabs.user;
        }

        if (cid && isChat) {
            tab = tabs.chat;
        }

        if (cid && isRoomProfile) {
            tab = tabs.roomProfile;
        }

        return (
            <Navigation
                title="Messages"
                tab={tab}
                menuRightContent={
                    <PopperOptionsButton
                        icon={<NewChatIcon />}
                        title={TextDirectory.create.title}
                    />
                }
                secondFragmentHeader={
                    <ErrorBoundary>
                        <React.Suspense fallback={null}>
                            {chatId && (
                                <ChatHeaderViewLoader
                                    variables={{
                                        id: chatId,
                                    }}
                                />
                            )}
                            <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                        </React.Suspense>
                    </ErrorBoundary>
                }
                firstFragment={<DialogListFragment />}
                secondFragment={
                    <ErrorBoundary>
                        <React.Suspense fallback={null}>
                            <ConversationContainerWrapper
                                {...{ tab, conversationId: cid, oid, uid, cid }}
                            />
                        </React.Suspense>
                    </ErrorBoundary>
                }
            />
        );
    },
);
