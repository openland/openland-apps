import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Settings_settings, EmailFrequency } from 'openland-api/spacex.types';
import { ZCheckmarkGroup } from 'openland-mobile/components/ZCheckmarkGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { backoff, debounce } from 'openland-y-utils/timer';
import { useText } from 'openland-mobile/text/useText';

const sendMutate = debounce(async (state: Settings_settings) => {
    const input = {
        emailFrequency: state.emailFrequency,
    };

    await backoff(async () => {
        await getClient().mutateSettingsUpdate({ input });
    });
}, 3000);

const SettingsEmailContent = React.memo(() => {
    const { t } = useText();
    const settingsData = getClient().useSettings({ fetchPolicy: 'network-only' }).settings;
    const [settings, setSettings] = React.useState<Settings_settings>(settingsData);

    const handleSave: <T>(field: string, value: T) => void = (field, value) => {
        setSettings((prevState) => ({ ...prevState, [field]: value }));
    };

    React.useEffect(() => {
        sendMutate(settings);
    }, [settings]);

    return (
        <SScrollView>
            <ZCheckmarkGroup
                header={t('notificationsMessages', 'Messages notifications')}
                footer={
                    t('notificationsEmailDescription', {
                        email: settings.primaryEmail,
                        defaultValue: 'When you’re busy or not online, Openland can send you email notifications about new messages. We will use {{email}} for notifications'
                    })
                }
                value={settings.emailFrequency}
                onChange={item => handleSave('emailFrequency', item.value)}
                items={[
                    {
                        value: EmailFrequency.MIN_15,
                        label: t('notificationsMin15', 'Every 15 minutes'),
                    },
                    {
                        value: EmailFrequency.HOUR_1,
                        label: t('notificationsHour', 'Once an hour'),
                    },
                    {
                        value: EmailFrequency.HOUR_24,
                        label: t('notificationsDay', `Once a day`),
                    },
                    {
                        value: EmailFrequency.WEEK_1,
                        label: t('notificationsWeek', `Once a week`),
                    },
                    {
                        value: EmailFrequency.NEVER,
                        label: t('notificationsNever', `Never`),
                    },
                ]}
            />
        </SScrollView>
    );
});

const SettingsEmailComponent = React.memo((props: PageProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('notificationsEmail', 'Email preferences')} />
            <SettingsEmailContent />
        </>
    );
});

export const SettingsEmail = withApp(SettingsEmailComponent);
