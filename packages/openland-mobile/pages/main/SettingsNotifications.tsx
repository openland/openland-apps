import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { NotificationPreview, UpdateSettingsInput } from 'openland-api/spacex.types';
import { ZCheckmarkGroup } from 'openland-mobile/components/ZCheckmarkGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { backoff, debounce } from 'openland-y-utils/timer';
import { useText } from 'openland-mobile/text/useText';

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
            communityChat: {
                showNotification: state.communityChatShowNotification,
                sound: state.communityChatSound
            },
            comments: {
                showNotification: state.commentsShowNotification,
                sound: state.commentsSound
            },
            channels: {
                showNotification: state.channelsShowNotification,
                sound: state.channelsSound,
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

type SettingsStateKeys = 'excludeMutedChats' | 'countUnreadChats' | 'directShowNotification' | 'directSound' | 'secretChatShowNotification' | 'secretChatSound' | 'organizationChatShowNotification' | 'organizationChatSound' | 'communityChatShowNotification' | 'communityChatSound' | 'commentsShowNotification' | 'commentsSound' | 'channelsShowNotification' | 'channelsSound' | 'notificationPreview';
interface SettingsState {
    excludeMutedChats: boolean;
    countUnreadChats: boolean;

    directShowNotification: boolean;
    directSound: boolean;
    secretChatShowNotification: boolean;
    secretChatSound: boolean;
    communityChatShowNotification: boolean;
    communityChatSound: boolean;
    commentsShowNotification: boolean;
    commentsSound: boolean;
    channelsShowNotification: boolean;
    channelsSound: boolean;
    notificationPreview: NotificationPreview;
}

const SettingsNotificationsContent = React.memo(() => {
    const { t } = useText();
    const settingsData = getClient().useSettings({ fetchPolicy: 'network-only' }).settings;
    const [settings, setSettings] = React.useState<SettingsState>({
        excludeMutedChats: settingsData.excludeMutedChats,
        countUnreadChats: settingsData.countUnreadChats,

        directShowNotification: settingsData.mobile.direct.showNotification,
        directSound: settingsData.mobile.direct.sound,
        secretChatShowNotification: settingsData.mobile.secretChat.showNotification,
        secretChatSound: settingsData.mobile.secretChat.sound,
        communityChatShowNotification: settingsData.mobile.communityChat.showNotification,
        communityChatSound: settingsData.mobile.communityChat.sound,
        commentsShowNotification: settingsData.mobile.comments.showNotification,
        commentsSound: settingsData.mobile.comments.sound,
        channelsShowNotification: settingsData.mobile.channels.showNotification,
        channelsSound: settingsData.mobile.channels.sound,
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
            <ZListGroup header={t('directMessages', 'Direct messages')}>
                <ZListItem
                    text={t('notificationsShow', 'Show notifications')}
                    onToggle={value => handleSave('directShowNotification', value)}
                    toggle={settings.directShowNotification}
                />
                <ZListItem
                    text={t('sound', 'Sound')}
                    onToggle={value => handleSave('directSound', value)}
                    toggle={settings.directSound}
                />
            </ZListGroup>

            <ZListGroup header={t('notificationsSecretGroups', 'Secret groups messages')}>
                <ZListItem
                    text={t('notificationsShow', 'Show notifications')}
                    onToggle={value => handleSave('secretChatShowNotification', value)}
                    toggle={settings.secretChatShowNotification}
                />
                <ZListItem
                    text={t('sound', 'Sound')}
                    onToggle={value => handleSave('secretChatSound', value)}
                    toggle={settings.secretChatSound}
                />
            </ZListGroup>

            <ZListGroup header={t('notificationsCommunityGroups', 'Community groups messages')}>
                <ZListItem
                    text={t('notificationsShow', 'Show notifications')}
                    onToggle={value => handleSave('communityChatShowNotification', value)}
                    toggle={settings.communityChatShowNotification}
                />
                <ZListItem
                    text={t('sound', 'Sound')}
                    onToggle={value => handleSave('communityChatSound', value)}
                    toggle={settings.communityChatSound}
                />
            </ZListGroup>

            <ZListGroup header={t('notificationsChannels', 'Channels')}>
                <ZListItem
                    text={t('notificationsShow', 'Show notifications')}
                    onToggle={value => handleSave('channelsShowNotification', value)}
                    toggle={settings.channelsShowNotification}
                />
                <ZListItem
                    text={t('sound', 'Sound')}
                    onToggle={value => handleSave('channelsSound', value)}
                    toggle={settings.channelsSound}
                />
            </ZListGroup>

            <ZListGroup header={t('notificationsComments', 'New comments')}>
                <ZListItem
                    text={t('notificationsShow', 'Show notifications')}
                    onToggle={value => handleSave('commentsShowNotification', value)}
                    toggle={settings.commentsShowNotification}
                />
                <ZListItem
                    text={t('sound', 'Sound')}
                    onToggle={value => handleSave('commentsSound', value)}
                    toggle={settings.commentsSound}
                />
            </ZListGroup>

            <ZCheckmarkGroup
                header={t('notificationsPreview', 'Notifications preview')}
                value={settings.notificationPreview}
                onChange={item => handleSave('notificationPreview', item.value)}
                items={[
                    { label: t('notificationsNameAndText', 'Show name and text'), value: NotificationPreview.NAME_TEXT },
                    { label: t('notificationsNameOnly', 'Show name only'), value: NotificationPreview.NAME },
                ]}
            />

            <ZListGroup
                header={t('notificationsBadgeCounter', 'Badge counter')}
                footer={t('notificationsBadgeCounterDescription', `Push notification settings apply to all your mobile devices and don't affect desktop. Badge settings affect all your devices`)}
            >
                <ZListItem
                    text={t('notificationsIncludeMuted', 'Include muted chats')}
                    onToggle={value => handleSave('excludeMutedChats', !value)}
                    toggle={!settings.excludeMutedChats}
                />
                <ZListItem
                    text={t('notificationsCountChats', 'Count chats instead of messages')}
                    onToggle={value => handleSave('countUnreadChats', value)}
                    toggle={settings.countUnreadChats}
                />
            </ZListGroup>
        </SScrollView>
    );
});

const SettingsNotifciationsComponent = React.memo((props: PageProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('notifications', 'Notifications')} />
            <SettingsNotificationsContent />
        </>
    );
});

export const SettingsNotifications = withApp(SettingsNotifciationsComponent);
