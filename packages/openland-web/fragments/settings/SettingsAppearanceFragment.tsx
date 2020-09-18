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

enum AccentOptions {
    BLUE = 'BLUE',
    RED = 'RED',
    ORANGE = 'ORANGE',
    GREEN = 'GREEN',
    CYAN = 'CYAN',
    PURPLE = 'PURPLE',
    PINK = 'PINK',
    GREY = 'GREY',
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

    const accentField = useField(
        'input.accent',
        lsGetItem('interactive_app_accent') === 'RED'
            ? AccentOptions.RED
            : lsGetItem('interactive_app_accent') === 'ORANGE'
            ? AccentOptions.ORANGE
            : lsGetItem('interactive_app_accent') === 'GREEN'
            ? AccentOptions.GREEN
            : lsGetItem('interactive_app_accent') === 'CYAN'
            ? AccentOptions.CYAN
            : lsGetItem('interactive_app_accent') === 'PURPLE'
            ? AccentOptions.PURPLE
            : lsGetItem('interactive_app_accent') === 'PINK'
            ? AccentOptions.PINK
            : lsGetItem('interactive_app_accent') === 'GREY'
            ? AccentOptions.GREY
            : AccentOptions.BLUE,
        form,
    );

    const themeChecker = () => {
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
    };

    const accentChecker = () => {
        const removeAllAccentClasses = () => {
            document.documentElement.classList.remove(
                'red',
                'orange',
                'green',
                'cyan',
                'purple',
                'pink',
                'grey',
            );
        };
        if (lsGetItem('interactive_app_accent') === 'RED') {
            removeAllAccentClasses();
            document.documentElement.classList.add('red');
        }
        if (lsGetItem('interactive_app_accent') === 'ORANGE') {
            removeAllAccentClasses();
            document.documentElement.classList.add('orange');
        }
        if (lsGetItem('interactive_app_accent') === 'GREEN') {
            removeAllAccentClasses();
            document.documentElement.classList.add('green');
        }
        if (lsGetItem('interactive_app_accent') === 'CYAN') {
            removeAllAccentClasses();
            document.documentElement.classList.add('cyan');
        }
        if (lsGetItem('interactive_app_accent') === 'PURPLE') {
            removeAllAccentClasses();
            document.documentElement.classList.add('purple');
        }
        if (lsGetItem('interactive_app_accent') === 'PINK') {
            removeAllAccentClasses();
            document.documentElement.classList.add('pink');
        }
        if (lsGetItem('interactive_app_accent') === 'GREY') {
            removeAllAccentClasses();
            document.documentElement.classList.add('grey');
        }
        if (lsGetItem('interactive_app_accent') === 'BLUE') {
            removeAllAccentClasses();
        }
    };

    React.useEffect(() => {
        localStorage.setItem(
            'highlight_secret_chat',
            secretGroupDisplay.value === AppearanceOptions.HIGHLIGHTED ? 'true' : 'false',
        );
        localStorage.setItem('interactive_app_theme', themeField.value);
        localStorage.setItem('interactive_app_accent', accentField.value);
        themeChecker();
        accentChecker();
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
                <FormSection title="Accent">
                    <XView marginHorizontal={-16}>
                        <RadioButtonsSelect
                            {...accentField.input}
                            selectOptions={[
                                {
                                    value: AccentOptions.BLUE,
                                    label: 'Default',
                                },
                                {
                                    value: AccentOptions.RED,
                                    label: 'Red',
                                },
                                {
                                    value: AccentOptions.ORANGE,
                                    label: 'Orange',
                                },
                                {
                                    value: AccentOptions.GREEN,
                                    label: 'Green',
                                },
                                {
                                    value: AccentOptions.CYAN,
                                    label: 'Cyan',
                                },
                                {
                                    value: AccentOptions.PURPLE,
                                    label: 'Purple',
                                },
                                {
                                    value: AccentOptions.PINK,
                                    label: 'Pink',
                                },
                                {
                                    value: AccentOptions.GREY,
                                    label: 'Grey',
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
