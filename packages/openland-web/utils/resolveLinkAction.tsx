import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { showWriteFirstMessageModal } from 'openland-web/fragments/onboarding/showWriteFirstMessageModal';
import { InviteFriendsComponent } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { DownloadAppsComponent } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { trackEvent } from 'openland-x-analytics';
import { OpenlandClient } from 'openland-api/spacex';
import { XViewRouter } from 'react-mental';
import AlertBlanket from 'openland-x/AlertBlanket';
import { showPremiumPayConfirm } from 'openland-web/fragments/discover/components/ShowPremiumPayConfirm';

const showRevokedInviteModal = () => {
    AlertBlanket.builder()
        .message('This invitation has been revoked.')
        .action('OK', async () => { return; })
        .show();
};

export const resolveInvite = async (url: string, client: OpenlandClient, router: XViewRouter, fallback?: () => void, ignoreJoin?: boolean) => {
    if (url.includes('/invite/')) {
        let split = url.split('/');
        let key = split[split.length - 1];
        let invite = await client.queryResolvedInvite({ key }, { fetchPolicy: 'network-only' });
        // must show prview on matchmaking, just join/open in other cases
        if (invite.invite && invite.invite.__typename === 'RoomInvite') {
            if (invite.invite.room.membership !== 'MEMBER') {
                if (ignoreJoin) {
                    router.navigate(`/invite/${key}`);
                    return;
                } else {
                    if (invite.invite.room.isPremium && !invite.invite.room.premiumPassIsActive) {
                        showPremiumPayConfirm({ group: invite.invite.room }, client, router);
                    } else {
                        await client.mutateRoomJoinInviteLink({ invite: key });
                        router.navigate(`/mail/${invite.invite.room.id}`);
                    }
                    return;
                }
            } else {
                router.navigate(`/mail/${invite.invite.room.id}`);
                return;
            }

        }
        if (!invite.invite) {
            showRevokedInviteModal();
            return;
        }
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
    } else if (url) {
        return resolveInvite(url, client, router, fallback);
    } else if (fallback) {
        fallback();
    }
    return undefined;
};
