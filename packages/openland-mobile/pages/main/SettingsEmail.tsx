import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { Settings_settings, EmailFrequency } from 'openland-api/spacex.types';
import { ZCheckmarkGroup } from 'openland-mobile/components/ZCheckmarkGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { backoff, debounce } from 'openland-y-utils/timer';

const sendMutate = debounce(async (state: Settings_settings) => {
    const input = {
        emailFrequency: state.emailFrequency,
    };

    await backoff(async () => {
        await getClient().mutateSettingsUpdate({ input });
    });
}, 3000);

const SettingsEmailContent = XMemo<PageProps>(props => {
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
                header="Messages notifications"
                footer={
                    'When you’re busy or not online, Openland can send you email notifications about new messages. We will use ' +
                    settings.primaryEmail +
                    ' for notifications'
                }
                value={settings.emailFrequency}
                onChange={item => handleSave('emailFrequency', item.value)}
                items={[
                    {
                        value: EmailFrequency.MIN_15,
                        label: `Every 15 minutes`,
                    },
                    {
                        value: EmailFrequency.HOUR_1,
                        label: `Once an hour`,
                    },
                    {
                        value: EmailFrequency.HOUR_24,
                        label: `Once a day`,
                    },
                    {
                        value: EmailFrequency.WEEK_1,
                        label: `Once a week`,
                    },
                    {
                        value: EmailFrequency.NEVER,
                        label: `Never`,
                    },
                ]}
            />
        </SScrollView>
    );
});

class SettingsEmailComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Email preferences" />
                <SettingsEmailContent {...this.props} />
            </>
        );
    }
}

export const SettingsEmail = withApp(SettingsEmailComponent);
