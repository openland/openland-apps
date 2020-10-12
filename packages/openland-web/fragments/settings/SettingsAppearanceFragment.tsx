import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { FormSection } from './components/FormSection';
import { FormWrapper } from './components/FormWrapper';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useTheme } from 'openland-x-utils/useTheme';
import { ThemeSelect } from './components/ThemeSelect';
import { AccentSelect } from './components/AccentSelect';
import { UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';

export enum AppearanceOptions {
    DEFAULT = 'DEFAULT',
    HIGHLIGHTED = 'HIGHLIGHTED',
}

export enum ThemeOptions {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
    AUTO = 'AUTO',
}

export enum AccentOptions {
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
        lsGetItem('highlight_featured_chat') === 'true',
        form,
    );
    const featuredGroupDisplayStored = lsGetItem('highlight_featured_chat');
    const featuredGroupDisplay = useField(
        'input.featuredGroupDisplay',
        featuredGroupDisplayStored === null || featuredGroupDisplayStored === 'true',
        form,
    );
    const largeEmojiStored = lsGetItem('settings_large_emoji');
    const largeEmojiField = useField(
        'input.largeEmojiField',
        largeEmojiStored === null || largeEmojiStored === 'true',
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

    const otherChecker = () => {
        if (lsGetItem('highlight_secret_chat') === 'true') {
            document.documentElement.classList.add('highlight-secret-chat');
        } else {
            document.documentElement.classList.remove('highlight-secret-chat');
        }
        if (lsGetItem('highlight_featured_chat') === 'true') {
            document.documentElement.classList.remove('hide-featured-icon');
        } else {
            document.documentElement.classList.add('hide-featured-icon');
        }
        if (lsGetItem('settings_large_emoji') === 'true') {
            document.documentElement.classList.remove('regular-emoji-size');
        } else {
            document.documentElement.classList.add('regular-emoji-size');
        }
    };

    React.useEffect(() => {
        localStorage.setItem(
            'highlight_secret_chat',
            secretGroupDisplay.value ? 'true' : 'false',
        );
        localStorage.setItem(
            'highlight_featured_chat',
            featuredGroupDisplay.value ? 'true' : 'false',
        );
        localStorage.setItem(
            'settings_large_emoji',
            largeEmojiField.value ? 'true' : 'false',
        );
        localStorage.setItem('interactive_app_theme', themeField.value);
        localStorage.setItem('interactive_app_accent', accentField.value);
        themeChecker();
        accentChecker();
        otherChecker();
    });

    return (
        <Page track="account_appearance">
            <UHeader title="Appearance" />
            <FormWrapper>
                <FormSection title="Theme">
                    <XView marginHorizontal={-16}>
                        <ThemeSelect
                            {...themeField.input}
                            selectOptions={[
                                {
                                    value: ThemeOptions.AUTO,
                                    label: 'System',
                                },
                                {
                                    value: ThemeOptions.LIGHT,
                                    label: 'Light',
                                },
                                {
                                    value: ThemeOptions.DARK,
                                    label: 'Dark',
                                },
                            ]}
                        />
                    </XView>
                </FormSection>
                <FormSection title="Accent">
                    <AccentSelect
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
                </FormSection>
                <FormSection title="Other">
                    <XView marginHorizontal={-16}>
                        <UCheckboxFiled
                            label="Highlight secret groups"
                            field={secretGroupDisplay}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled
                            label="Show large emoji"
                            field={largeEmojiField}
                            asSwitcher={true}
                        />
                        <UCheckboxFiled
                            label="Show group featured icon"
                            field={featuredGroupDisplay}
                            asSwitcher={true}
                        />
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
