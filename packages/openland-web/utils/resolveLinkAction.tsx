import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { showWriteFirstMessageModal } from 'openland-web/fragments/onboarding/showWriteFirstMessageModal';
import { InviteFriendsComponent } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { DownloadAppsComponent } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';
import { trackEvent } from 'openland-x-analytics';

export const resolveLinkAction = (url: string) => {
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
    }
};
