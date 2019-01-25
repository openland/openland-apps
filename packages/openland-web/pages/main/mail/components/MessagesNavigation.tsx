import * as React from 'react';
import { XView } from 'react-mental';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs, tabsT } from '../tabs';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { TextDirectory } from 'openland-text/TextDirectory';
import { ConversationContainerWrapper } from 'openland-web/pages/main/mail/components/Components';
import { ChatHeaderViewLoader } from 'openland-web/fragments/chat/ChatHeaderView';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { Navigation } from '../../../../components/Navigation';

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
export const MessagesNavigation = React.memo(
    ({ path, cid, oid, uid }: { cid?: string; oid?: string; uid?: string; path?: any }) => {
        let tab: tabsT = tabs.empty;

        let isCompose = path.endsWith('/new');
        let pageTitle = isCompose ? 'New chat' : undefined;
        if (!canUseDOM) {
            return (
                <>
                    <XDocumentHead title={pageTitle} />
                    <Scaffold>{}</Scaffold>
                </>
            );
        }
        let isRooms = path.endsWith('/channels');
        let isCall = path.endsWith('/call');
        let isInvite = path.includes('joinChannel');
        let isChat = path.includes('/mail');
        let isRoomProfile = path.includes('/mail/p/');

        const chatId = getId(path, '/mail/');

        if (isCompose) {
            tab = tabs.compose;
        }

        if (!isCompose && !cid) {
            tab = tabs.empty;
        }

        if (!isCompose && cid) {
            tab = tabs.conversation;
        }

        if (isInvite) {
            tab = tabs.invite;
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

        if (tab === tabs.empty) {
            pageTitle = undefined;
        }

        return (
            <Navigation
                title="Messages"
                tab={tab}
                menuRightContent={
                    <PopperOptionsButton
                        path="/mail/new"
                        icon={<PlusIcon />}
                        title={TextDirectory.create.title}
                    />
                }
                secondFragmentHeader={
                    !!chatId && (
                        <>
                            <ChatHeaderViewLoader
                                variables={{
                                    id: chatId,
                                }}
                            />
                            <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                        </>
                    )
                }
                firstFragment={<DialogListFragment />}
                secondFragment={
                    <ConversationContainerWrapper
                        {...{ tab, conversationId: cid, oid, uid, cid }}
                    />
                }
            />
        );
    },
);
