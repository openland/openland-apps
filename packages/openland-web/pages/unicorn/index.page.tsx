import * as React from 'react';
import { Routing } from './routing';
import { TabRouter } from 'openland-unicorn/components/TabRouter';
import { TabLayout } from 'openland-unicorn/components/TabLayout';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';
import { SettingsFragment } from 'openland-web/fragments/settings/SettingsFragment';
import { DialogsFragment } from 'openland-web/fragments/dialogs/DialogsFragment';
import { DiscoverFragment } from 'openland-web/fragments/discover/DiscoverFragment';
import { XLoader } from 'openland-x/XLoader';
import { AuthRouter } from '../root/AuthRouter';
import { IndexFragment } from 'openland-web/fragments/discussions/IndexFragment';
import { useRole } from 'openland-x-permissions/XWithRole';
import { ContactsFragment } from 'openland-web/fragments/contacts/ContactsFragment';
import { LocalContactsProvider } from 'openland-y-utils/contacts/LocalContacts';
import { UToastProvider } from 'openland-web/components/unicorn/UToast';
import { MessagesActionsStateProvider } from 'openland-y-runtime/MessagesActionsState';
import ProfileIcon from './navigation/icon_profile.svg';
import ProfileActiveIcon from './navigation/icon_profile_active.svg';
import DiscoverIcon from './navigation/icon_discover.svg';
import DiscoverActiveIcon from './navigation/ic_discover_active.svg';
import ChannelsIcon from './navigation/ic-flashlight-24.svg';
import ChannelsActiveIcon from './navigation/ic-flashlight-filled-24.svg';
import ChatIcon from './navigation/icon_chat.svg';
import ChatActiveIcon from './navigation/icon_chat_active.svg';
import SettingsIcon from './navigation/icon_settings.svg';
import SettingsActiveIcon from './navigation/icon_settings_active.svg';

const Unicorn = React.memo(() => {
    const isSuperadmin = useRole('super-admin');
    const router = React.useMemo(
        () =>

            new TabRouter(
                isSuperadmin ? [
                    {
                        icon: <DiscoverIcon />,
                        iconActive: <DiscoverActiveIcon />,
                        path: '/discover',
                        component: <DiscoverFragment />,
                        caption: 'Discover',
                        defaultPage: true
                    },
                    {
                        icon: <ProfileIcon />,
                        iconActive: <ProfileActiveIcon />,
                        path: '/contacts',
                        component: <ContactsFragment />,
                        caption: 'Contacts',
                        defaultPage: true,
                        isStackHidden: true,
                    },
                    {
                        icon: <ChannelsIcon />,
                        iconActive: <ChannelsActiveIcon />,
                        path: '/channels',
                        component: <IndexFragment />,
                        caption: 'Channels',
                        defaultPage: true
                    },
                    {
                        icon: <ChatIcon />,
                        iconActive: <ChatActiveIcon />,
                        path: '/mail',
                        component: <DialogsFragment />,
                        caption: 'Chats',
                        defaultPage: false,
                    },
                    {
                        icon: <SettingsIcon />,
                        iconActive: <SettingsActiveIcon />,
                        path: '/settings',
                        component: <SettingsFragment />,
                        caption: 'Settings',
                        defaultPage: true
                    },
                ] : [
                        {
                            icon: <DiscoverIcon />,
                            iconActive: <DiscoverActiveIcon />,
                            path: '/discover',
                            component: <DiscoverFragment />,
                            caption: 'Discover',
                            defaultPage: true
                        },
                        {
                            icon: <ProfileIcon />,
                            iconActive: <ProfileActiveIcon />,
                            path: '/contacts',
                            component: <ContactsFragment />,
                            caption: 'Contacts',
                            defaultPage: true,
                            isStackHidden: true,
                        },
                        {
                            icon: <ChatIcon />,
                            iconActive: <ChatActiveIcon />,
                            path: '/mail',
                            component: <DialogsFragment />,
                            caption: 'Chats',
                            defaultPage: false,
                        },
                        {
                            icon: <SettingsIcon />,
                            iconActive: <SettingsActiveIcon />,
                            path: '/settings',
                            component: <SettingsFragment />,
                            caption: 'Settings',
                            defaultPage: true
                        },
                    ],
                isSuperadmin ? 3 : 2,
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
                    <LocalContactsProvider>
                        <MessagesActionsStateProvider>
                            <UToastProvider>
                                <Unicorn />
                            </UToastProvider>
                        </MessagesActionsStateProvider>
                    </LocalContactsProvider>
                </AuthRouter>
            </React.Suspense>
        </React.StrictMode>
    );
});
