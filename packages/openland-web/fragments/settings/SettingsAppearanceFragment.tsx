import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useRole } from 'openland-x-permissions/XWithRole';

enum AppearanceOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

enum ThemeOptions {
    DEFAULT = 'DEFAULT',
    DARK = 'DARK',
}

export const SettingsAppearanceFragment = React.memo(() => {
    const superAdmin = useRole('super-admin');
    const form = useForm();
    const secretGroupDisplay = useField(
        'input.secretGroupDisplay',
        localStorage.getItem('highlight_secret_chat') === 'true'
            ? AppearanceOptions.HIGHLIGHTED
            : AppearanceOptions.DEFAULT,
        form,
    );

    const themeField = useField(
        'input.theme',
        localStorage.getItem('interactive_app_theme') === 'true'
            ? ThemeOptions.DARK
            : ThemeOptions.DEFAULT,
        form
    );

    React.useEffect(() => {
        localStorage.setItem(
            'highlight_secret_chat',
            secretGroupDisplay.value === AppearanceOptions.HIGHLIGHTED ? 'true' : 'false',
        );
        localStorage.setItem(
            'interactive_app_theme',
            themeField.value === ThemeOptions.DARK ? 'true' : 'false',
        );
        if (localStorage.getItem('interactive_app_theme') === 'true') {
            document.body.classList.add('interactive');
        }
        if (localStorage.getItem('interactive_app_theme') === 'false') {
            document.body.classList.remove('interactive');
        }
    });

    return (
        <Page track="account_appearance">
            <UHeader title="Appearance" />
            <FormWrapper>
                <FormSection title="Secret group display">
                    <XView marginHorizontal={-16}>
                        <RadioButtonsSelect
                            {...secretGroupDisplay.input}
                            selectOptions={[
                                {
                                    value: AppearanceOptions.DEFAULT,
                                    label: `Default`,
                                },
                                {
                                    value: AppearanceOptions.HIGHLIGHTED,
                                    label: `Highlighted`,
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
                {superAdmin && (
                    <FormSection title="Theme">
                        <XView marginHorizontal={-16}>
                            <RadioButtonsSelect
                                {...themeField.input}
                                selectOptions={[
                                    {
                                        value: ThemeOptions.DEFAULT,
                                        label: `Light`,
                                    },
                                    {
                                        value: ThemeOptions.DARK,
                                        label: `Dark`,
                                    },
                                ]}
                            />
                        </XView>
                    </FormSection>
                )}
            </FormWrapper>
        </Page>
    );
});
