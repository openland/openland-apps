import * as React from 'react';
import { XView } from 'react-mental';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs, tabsT } from '../tabs';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { TextDirectory } from 'openland-text/TextDirectory';
import { ConversationContainerWrapper } from 'openland-web/pages/main/mail/components/Components';
import { ChatHeaderViewLoader } from 'openland-web/fragments/chat/ChatHeaderView';
import { Navigation } from '../../../../components/Navigation';
import { XMemo } from 'openland-y-utils/XMemo';

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
export const MessagesNavigation = XMemo(
    ({ path, cid, oid, uid }: { cid?: string; oid?: string; uid?: string; path?: any }) => {
        let tab: tabsT = tabs.empty;

        let isCompose = path.endsWith('/new');

        let isRooms = path.endsWith('/channels');
        let isCall = path.endsWith('/call');
        let isInvite = path.includes('/joinChannel') || path.includes('/join');
        let isChat = path.includes('/mail');
        let isRoomProfile = path.includes('/mail/p/');

        const chatId = !path.includes('/mail/new') && getId(path, '/mail/');

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
                    <>
                        {chatId && (
                            <ChatHeaderViewLoader
                                variables={{
                                    id: chatId,
                                }}
                            />
                        )}
                        <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                    </>
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
