import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { showWriteFirstMessageModal } from 'openland-web/fragments/onboarding/showWriteFirstMessageModal';
import { InviteFriendsComponent } from 'openland-web/fragments/account/SettingsInviteFriendsFragment';
import { DownloadAppsComponent } from 'openland-web/fragments/account/SettingsDownloadAppsFragment';

export const resolveLinkAction = (url: string) => {
    if (url === '/onboarding_invite') {
        showModalBox({ fullScreen: true }, ctx => (
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                <InviteFriendsComponent modalContext={ctx} />
            </XScrollView3>
        ));
    } else if (url === '/onboarding_apps') {
        showModalBox({ fullScreen: true }, () => (
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                <DownloadAppsComponent />
            </XScrollView3>
        ));
    } else if (url === '/onboarding_discover') {
        showModalBox({ fullScreen: true }, ctx => (
            <DiscoverOnLocalState fullHeight={true} onJoinChats={ctx.hide} />
        ));
    } else if (url === '/onboarding_send_first_message') {
        showWriteFirstMessageModal();
    }
};
