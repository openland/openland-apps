import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { InviteFriendsFragment } from '../pages/main/mail/inviteFriends.page';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';
import { Discover } from 'openland-web/pages/onboarding/discover.page';
import { WriteFirstMessageModal } from 'openland-web/components/WriteFirstMessageModal';

export let resolveLinkAction: (url: string) => (() => void) | undefined = (url: string) => {
    console.warn('boom', url);
    if (url === '/onboarding_invite') {
        return () => {
            showModalBox({ fullScreen: true }, ctx => (
                <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                    <InviteFriendsFragment asModalContent modalContext={ctx} />
                </XScrollView3>
            ));
        }
    }
    if (url === '/onboarding_apps') {
        return () => {
            showModalBox({ fullScreen: true }, () => (
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    <NativeAppsModal />
                </XScrollView3>
            ))
        }
    } else if (url === '/onboarding_discover') {
        return () => {
            showModalBox({ fullScreen: true }, () => <Discover />)
        }
    } else if (url === '/onboarding_send_first_message') {
        return () => {
            showModalBox({ fullScreen: true }, () =>
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    <WriteFirstMessageModal />
                </XScrollView3>)
        }
    }

    return undefined;
};
