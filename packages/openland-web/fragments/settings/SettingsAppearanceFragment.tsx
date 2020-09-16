import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RadioButtonsSelect } from './components/RadioButtonsSelect';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useTheme } from 'openland-x-utils/useTheme';

enum AppearanceOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

enum ThemeOptions {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
    AUTO = 'AUTO',
}

export const SettingsAppearanceFragment = React.memo(() => {
    const theme = useTheme();
    const form = useForm();

    const lsGetItem = (k: string) => {
        return localStorage.getItem(k);
    };

    const secretGroupDisplay = useField(
        'input.secretGroupDisplay',
        lsGetItem('highlight_secret_chat') === 'true'
            ? AppearanceOptions.HIGHLIGHTED
            : AppearanceOptions.DEFAULT,
        form,
    );

    const themeField = useField(
        'input.theme',
        lsGetItem('interactive_app_theme') === 'DARK'
            ? ThemeOptions.DARK
            : lsGetItem('interactive_app_theme') === 'LIGHT'
            ? ThemeOptions.LIGHT
            : ThemeOptions.AUTO,
        form,
    );

    React.useEffect(() => {
        localStorage.setItem(
            'highlight_secret_chat',
            secretGroupDisplay.value === AppearanceOptions.HIGHLIGHTED ? 'true' : 'false',
        );
        localStorage.setItem('interactive_app_theme', themeField.value);
        if (lsGetItem('interactive_app_theme') === 'LIGHT') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            theme.setTheme('light');
        }
        if (lsGetItem('interactive_app_theme') === 'DARK') {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            theme.setTheme('dark');
        }
        if (lsGetItem('interactive_app_theme') === 'AUTO') {
            document.documentElement.classList.remove('light', 'dark');
            theme.setTheme(null);
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
                <FormSection title="Theme">
                    <XView marginHorizontal={-16}>
                        <RadioButtonsSelect
                            {...themeField.input}
                            selectOptions={[
                                {
                                    value: ThemeOptions.LIGHT,
                                    label: 'Light',
                                },
                                {
                                    value: ThemeOptions.DARK,
                                    label: 'Dark',
                                },
                                {
                                    value: ThemeOptions.AUTO,
                                    label: 'Auto',
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
