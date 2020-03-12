import * as React from 'react';
import { Routing } from './routing';
import { TabRouter } from 'openland-unicorn/components/TabRouter';
import { TabLayout } from 'openland-unicorn/components/TabLayout';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';
import { AccountFragment } from 'openland-web/fragments/account/AccountFragment';
import { DialogsFragment } from 'openland-web/fragments/dialogs/DialogsFragment';
import { DiscoverFragment } from 'openland-web/fragments/discover/DiscoverFragment';
import { XLoader } from 'openland-x/XLoader';
import DiscoverIcon from './navigation/icon_discover.svg';
import DiscoverActiveIcon from './navigation/icon_discover_active.svg';
import ChatIcon from './navigation/icon_chat.svg';
import ChatActiveIcon from './navigation/icon_chat_active.svg';
import ProfileIcon from './navigation/icon_profile.svg';
import ProfileActiveIcon from './navigation/icon_profile_active.svg';
import { AuthRouter } from '../root/AuthRouter';

const Unicorn = React.memo(() => {
    const router = React.useMemo(
        () =>
            new TabRouter(
                [
                    {
                        icon: <DiscoverIcon />,
                        iconActive: <DiscoverActiveIcon />,
                        path: '/discover',
                        component: <DiscoverFragment />,
                        caption: 'Discover',
                    },
                    {
                        icon: <ChatIcon />,
                        iconActive: <ChatActiveIcon />,
                        path: '/mail',
                        component: <DialogsFragment />,
                        caption: 'Chats',
                    },
                    {
                        icon: <ProfileIcon />,
                        iconActive: <ProfileActiveIcon />,
                        path: '/account',
                        component: <AccountFragment />,
                        caption: 'Account',
                    },
                ],
                1,
                Routing,
            ),
        [],
    );
    return (
        <LayoutProvider>
            <TabLayout router={router} />
        </LayoutProvider>
    );
});

export default React.memo(() => {
    return (
        <React.StrictMode>
            <React.Suspense fallback={<XLoader loading={true} />}>
                <AuthRouter>
                    <Unicorn />
                </AuthRouter>
            </React.Suspense>
        </React.StrictMode>
    );
});
