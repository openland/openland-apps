import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useClient } from 'openland-web/utils/useClient';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { EmailFrequency, UpdateSettingsInput } from 'openland-api/spacex.types';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { debounce } from 'openland-y-utils/timer';

export const SettingsEmailFragment = React.memo(() => {
    const form = useForm();
    const client = useClient();
    const settings = client.useSettings().settings;

    const emailNotifications = useField('input.emailNotifications', settings.emailFrequency, form);
    const doConfirm = (input: UpdateSettingsInput) => {
        client.mutateSettingsUpdate({ input });
    };

    const doConfirmDebounced = React.useRef<null | ((input: UpdateSettingsInput) => void)>();
    React.useEffect(() => {
        doConfirmDebounced.current = debounce(doConfirm, 1000);
    }, []);
    React.useEffect(
        () => {
            if (doConfirmDebounced.current) {
                doConfirmDebounced.current({
                    emailFrequency: emailNotifications.value,
                });
            }
        },
        [emailNotifications.value],
    );
    return (
        <Page track="account_email">
            <UHeader title="Email preferences" />
            <FormWrapper>
                <FormSection
                    title="Messages notifications"
                    footer={
                        <>
                            When you’re busy or not online, Openland can send you email
                            notifications about new messages. We will use{' '}
                            <strong>{settings.primaryEmail}</strong> for notifications
                        </>
                    }
                >
                    <XView marginHorizontal={-16}>
                        <RadioButtonsSelect
                            {...emailNotifications.input}
                            selectOptions={[
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
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
