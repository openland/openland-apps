import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { showWriteFirstMessageModal } from 'openland-web/fragments/onboarding/showWriteFirstMessageModal';
import { InviteFriendsComponent } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { DownloadAppsComponent } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { trackEvent } from 'openland-x-analytics';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { XViewRouter } from 'react-mental';

const resolveInvite = async (url: string, client: OpenlandClient, router: XViewRouter, fallback?: () => void) => {
    let split = url.split('/');
    let key = split[split.length - 1];
    let invite = await client.queryResolvedInvite({ key });
    // must show prview on matchmaking, just join/open in other cases
    if (invite.invite && invite.invite.__typename === 'RoomInvite' && (!invite.invite.room.matchmaking || !invite.invite.room.matchmaking.enabled)) {
        if (invite.invite.room.membership !== 'MEMBER') {
            await client.mutateRoomJoinInviteLink({ invite: key });
        }
        router.navigate(`/mail/${invite.invite.room.id}`);
        return;
    }
    if (fallback) {
        fallback();
    }
};

export const resolveLinkAction = (url: string | null, client: OpenlandClient, router: XViewRouter, fallback?: () => void): Promise<any> | undefined => {
    if (url === '/onboarding_invite') {
        trackEvent('billy_bot_button_action', {
            action_type: 'invite_friends'
        });
        showModalBox({ fullScreen: true }, ctx => (
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <InviteFriendsComponent modalContext={ctx} />
            </XScrollView3>
        ));
    } else if (url === '/onboarding_apps') {
        trackEvent('billy_bot_button_action', {
            action_type: 'install_apps'
        });
        showModalBox({ fullScreen: true }, () => (
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <DownloadAppsComponent />
            </XScrollView3>
        ));
    } else if (url === '/onboarding_discover') {
        trackEvent('billy_bot_button_action', {
            action_type: 'complete_chat_navigator'
        });
        showModalBox({ fullScreen: true }, ctx => (
            <DiscoverOnLocalState fullHeight={true} onJoinChats={ctx.hide} />
        ));
    } else if (url === '/onboarding_send_first_message') {
        trackEvent('billy_bot_button_action', {
            action_type: 'write_first_message'
        });
        showWriteFirstMessageModal();
    } else if (url && url.includes('/invite')) {
        return resolveInvite(url, client, router, fallback);
    } else if (fallback) {
        fallback();
    }
    return undefined;
};
