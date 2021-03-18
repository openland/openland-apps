import * as React from 'react';
import { Routing } from './routing';
import { TabRouter } from 'openland-unicorn/components/TabRouter';
import { TabLayout } from 'openland-unicorn/components/TabLayout';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';
import { SettingsFragment } from 'openland-web/fragments/settings/SettingsFragment';
import { DialogsFragment } from 'openland-web/fragments/dialogs/DialogsFragment';
import { XLoader } from 'openland-x/XLoader';
import { IndexFragment } from 'openland-web/fragments/discussions/IndexFragment';
import { useRole } from 'openland-x-permissions/XWithRole';
import { ContactsFragment } from 'openland-web/fragments/contacts/ContactsFragment';
import { LocalContactsProvider } from 'openland-y-utils/contacts/LocalContacts';
import { LocalBlackListProvider } from 'openland-y-utils/blacklist/LocalBlackList';
import { UToastProvider } from 'openland-web/components/unicorn/UToast';
import { MessagesActionsStateProvider } from 'openland-y-runtime/MessagesActionsState';
import { RoomsFragment } from 'openland-web/fragments/rooms/RoomsFragment';
import { VoiceChatsFeedProvider } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';

import ProfileIcon from './navigation/icon_profile.svg';
import ProfileActiveIcon from './navigation/icon_profile_active.svg';
import RoomsIcon from './navigation/ic-room-24.svg';
import RoomsActiveIcon from './navigation/ic-room-filled-24.svg';
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
                isSuperadmin
                    ? [
                          {
                              icon: <RoomsIcon />,
                              iconActive: <RoomsActiveIcon />,
                              path: '/rooms',
                              component: <RoomsFragment />,
                              caption: 'Rooms',
                              defaultPage: true,
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
                              defaultPage: true,
                          },
                      ]
                    : [
                          {
                              icon: <RoomsIcon />,
                              iconActive: <RoomsActiveIcon />,
                              path: '/rooms',
                              component: <RoomsFragment />,
                              caption: 'Rooms',
                              defaultPage: true,
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
                              defaultPage: true,
                          },
                      ],
                0,
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
                <LocalBlackListProvider>
                    <LocalContactsProvider>
                        <MessagesActionsStateProvider>
                            <UToastProvider>
                                <VoiceChatsFeedProvider>
                                    <Unicorn />
                                </VoiceChatsFeedProvider>
                            </UToastProvider>
                        </MessagesActionsStateProvider>
                    </LocalContactsProvider>
                </LocalBlackListProvider>
            </React.Suspense>
        </React.StrictMode>
    );
});
