import * as React from 'react';
import { Routing } from './routing';
import { TabRouter } from 'openland-unicorn/components/TabRouter';
import { TabLayout } from 'openland-unicorn/components/TabLayout';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';
import { SettingsFragment } from 'openland-web/fragments/settings/SettingsFragment';
import { DialogsFragment } from 'openland-web/fragments/dialogs/DialogsFragment';
import { XLoader } from 'openland-x/XLoader';
import { ContactsFragment } from 'openland-web/fragments/contacts/ContactsFragment';
import { LocalContactsProvider } from 'openland-y-utils/contacts/LocalContacts';
import { LocalBlackListProvider } from 'openland-y-utils/blacklist/LocalBlackList';
import { UToastProvider } from 'openland-web/components/unicorn/UToast';
import { MessagesActionsStateProvider } from 'openland-y-runtime/MessagesActionsState';
import { RoomsFragment } from 'openland-web/fragments/rooms/RoomsFragment';
import { VoiceChatsFeedProvider } from 'openland-y-utils/voiceChat/voiceChatsFeedWatcher';

import ProfileIcon from './navigation/ic-user-24.svg';
import ProfileActiveIcon from './navigation/ic-user-filled-24.svg';
import RoomsIcon from './navigation/ic-room-24.svg';
import RoomsActiveIcon from './navigation/ic-room-filled-24.svg';
import ChatIcon from './navigation/ic-message-24.svg';
import ChatActiveIcon from './navigation/ic-message-filled-24.svg';
import SettingsIcon from './navigation/ic-settings-24.svg';
import SettingsActiveIcon from './navigation/ic-settings-filled-24.svg';

const Unicorn = React.memo(() => {
    const router = React.useMemo(
        () =>
            new TabRouter([
                          {
                              icon: <RoomsIcon />,
                              iconActive: <RoomsActiveIcon />,
                              path: '/discover',
                              component: <RoomsFragment />,
                              caption: 'Discover',
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
                2,
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
