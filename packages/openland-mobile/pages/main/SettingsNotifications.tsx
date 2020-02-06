import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { NotificationPreview, UpdateSettingsInput } from 'openland-api/spacex.types';
import { ZCheckmarkGroup } from 'openland-mobile/components/ZCheckmarkGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { backoff, debounce } from 'openland-y-utils/timer';

let isMountedSettingsPage = false;

const sendMutate = async (state: SettingsState) => {
    const input: UpdateSettingsInput = {
        excludeMutedChats: state.excludeMutedChats,
        countUnreadChats: state.countUnreadChats,

        mobile: {
            direct: {
                showNotification: state.directShowNotification,
                sound: state.directSound
            },
            secretChat: {
                showNotification: state.secretChatShowNotification,
                sound: state.secretChatSound
            },
            organizationChat: {
                showNotification: state.organizationChatShowNotification,
                sound: state.organizationChatSound
            },
            communityChat: {
                showNotification: state.communityChatShowNotification,
                sound: state.communityChatSound
            },
            comments: {
                showNotification: state.commentsShowNotification,
                sound: state.commentsSound
            },
            notificationPreview: state.notificationPreview
        }
    };

    await backoff(async () => {
        await getClient().mutateSettingsUpdate({ input });
    });
};

const sendMutateDelayed = debounce((state: SettingsState) => {
    if (isMountedSettingsPage) {
        sendMutate(state);
    }
}, 3000);

type SettingsStateKeys = 'excludeMutedChats' | 'countUnreadChats' | 'directShowNotification' | 'directSound' | 'secretChatShowNotification' | 'secretChatSound' | 'organizationChatShowNotification' | 'organizationChatSound' | 'communityChatShowNotification' | 'communityChatSound' | 'commentsShowNotification' | 'commentsSound' | 'notificationPreview';
interface SettingsState {
    excludeMutedChats: boolean;
    countUnreadChats: boolean;

    directShowNotification: boolean;
    directSound: boolean;
    secretChatShowNotification: boolean;
    secretChatSound: boolean;
    organizationChatShowNotification: boolean;
    organizationChatSound: boolean;
    communityChatShowNotification: boolean;
    communityChatSound: boolean;
    commentsShowNotification: boolean;
    commentsSound: boolean;
    notificationPreview: NotificationPreview;
}

const SettingsNotificationsContent = XMemo<PageProps>(props => {
    const settingsData = getClient().useSettings({ fetchPolicy: 'network-only' }).settings;
    const [settings, setSettings] = React.useState<SettingsState>({
        excludeMutedChats: settingsData.excludeMutedChats,
        countUnreadChats: settingsData.countUnreadChats,

        directShowNotification: settingsData.mobile.direct.showNotification,
        directSound: settingsData.mobile.direct.sound,
        secretChatShowNotification: settingsData.mobile.secretChat.showNotification,
        secretChatSound: settingsData.mobile.secretChat.sound,
        organizationChatShowNotification: settingsData.mobile.organizationChat.showNotification,
        organizationChatSound: settingsData.mobile.organizationChat.sound,
        communityChatShowNotification: settingsData.mobile.communityChat.showNotification,
        communityChatSound: settingsData.mobile.communityChat.sound,
        commentsShowNotification: settingsData.mobile.comments.showNotification,
        commentsSound: settingsData.mobile.comments.sound,
        notificationPreview: settingsData.mobile.notificationPreview
    });

    const handleSave: <T>(field: SettingsStateKeys, value: T) => void = (field, value) => {
        setSettings((prevState) => ({ ...prevState, [field]: value }));
    };

    React.useEffect(() => {
        isMountedSettingsPage = true;
        return () => { isMountedSettingsPage = false; };
    }, []);

    React.useEffect(() => {
        sendMutateDelayed(settings);

        return () => {
            if (!isMountedSettingsPage) {
                sendMutate(settings);
            }
        };
    }, [settings]);

    return (
        <SScrollView>
            <ZListGroup header="Direct messages">
                <ZListItem
                    text="Show notifications"
                    onToggle={value => handleSave('directShowNotification', value)}
                    toggle={settings.directShowNotification}
                />
                <ZListItem
                    text="Sound"
                    onToggle={value => handleSave('directSound', value)}
                    toggle={settings.directSound}
                />
            </ZListGroup>

            <ZListGroup header="Secret groups messages">
                <ZListItem
                    text="Show notifications"
                    onToggle={value => handleSave('secretChatShowNotification', value)}
                    toggle={settings.secretChatShowNotification}
                />
                <ZListItem
                    text="Sound"
                    onToggle={value => handleSave('secretChatSound', value)}
                    toggle={settings.secretChatSound}
                />
            </ZListGroup>

            <ZListGroup header="Organization groups messages">
                <ZListItem
                    text="Show notifications"
                    onToggle={value => handleSave('organizationChatShowNotification', value)}
                    toggle={settings.organizationChatShowNotification}
                />
                <ZListItem
                    text="Sound"
                    onToggle={value => handleSave('organizationChatSound', value)}
                    toggle={settings.organizationChatSound}
                />
            </ZListGroup>

            <ZListGroup header="Community groups messages">
                <ZListItem
                    text="Show notifications"
                    onToggle={value => handleSave('communityChatShowNotification', value)}
                    toggle={settings.communityChatShowNotification}
                />
                <ZListItem
                    text="Sound"
                    onToggle={value => handleSave('communityChatSound', value)}
                    toggle={settings.communityChatSound}
                />
            </ZListGroup>

            <ZListGroup header="New comments">
                <ZListItem
                    text="Show notifications"
                    onToggle={value => handleSave('commentsShowNotification', value)}
                    toggle={settings.commentsShowNotification}
                />
                <ZListItem
                    text="Sound"
                    onToggle={value => handleSave('commentsSound', value)}
                    toggle={settings.commentsSound}
                />
            </ZListGroup>

            <ZCheckmarkGroup
                header="Notifications preview"
                value={settings.notificationPreview}
                onChange={item => handleSave('notificationPreview', item.value)}
                items={[
                    { label: 'Show name and text', value: NotificationPreview.NAME_TEXT },
                    { label: 'Show name only', value: NotificationPreview.NAME },
                ]}
            />

            <ZListGroup
                header="Badge counter"
                footer="Push notification settings apply to all your mobile devices and don't affect desktop. Badge settings affect all your devices"
            >
                <ZListItem
                    text="Include muted chats"
                    onToggle={value => handleSave('excludeMutedChats', !value)}
                    toggle={!settings.excludeMutedChats}
                />
                <ZListItem
                    text="Count chats instead of messages"
                    onToggle={value => handleSave('countUnreadChats', value)}
                    toggle={settings.countUnreadChats}
                />
            </ZListGroup>
        </SScrollView>
    );
});

class SettingsNotifciationsComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Notifications" />
                <SettingsNotificationsContent {...this.props} />
            </>
        );
    }
}

export const SettingsNotifications = withApp(SettingsNotifciationsComponent);
