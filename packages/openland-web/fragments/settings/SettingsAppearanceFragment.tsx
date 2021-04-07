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
import { highlightSecretOption, showFeaturedIconOption, largeEmojiOption } from 'openland-web/modules/appearance/stored-options';

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

enum AccentColors {
    BLUE = '#248BF2',
    RED = '#E04556',
    ORANGE = '#F28B0C',
    GREEN = '#8AB840',
    CYAN = '#27B2CE',
    PURPLE = '#8643E4',
    PINK = '#EF568D',
    GREY = '#8192B2',
}

export const SettingsAppearanceFragment = React.memo(() => {
    const theme = useTheme();
    const form = useForm();

    const lsGetItem = (k: string) => {
        return localStorage.getItem(k);
    };

    const secretGroupDisplay = useField(
        'input.secretGroupDisplay',
        highlightSecretOption.isEnabled(),
        form,
    );
    const featuredGroupDisplay = useField(
        'input.featuredGroupDisplay',
        showFeaturedIconOption.isEnabled(),
        form,
    );
    const largeEmojiField = useField(
        'input.largeEmojiField',
        largeEmojiOption.isEnabled(),
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
        if (showFeaturedIconOption.isEnabled()) {
            document.documentElement.classList.remove('hide-featured-icon');
        } else {
            document.documentElement.classList.add('hide-featured-icon');
        }
        if (highlightSecretOption.isEnabled()) {
            document.documentElement.classList.add('highlight-secret-chat');
        } else {
            document.documentElement.classList.remove('highlight-secret-chat');
        }
        if (largeEmojiOption.isEnabled()) {
            document.documentElement.classList.remove('regular-emoji-size');
        } else {
            document.documentElement.classList.add('regular-emoji-size');
        }
    };

    React.useEffect(() => {
        highlightSecretOption.setValue(secretGroupDisplay.value);
        showFeaturedIconOption.setValue(featuredGroupDisplay.value);
        largeEmojiOption.setValue(largeEmojiField.value);

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
                    <XView marginHorizontal={-16} color="var(--foregroundPrimary)">
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
                                color: AccentColors.BLUE,
                            },
                            {
                                value: AccentOptions.RED,
                                label: 'Red',
                                color: AccentColors.RED,
                            },
                            {
                                value: AccentOptions.ORANGE,
                                label: 'Orange',
                                color: AccentColors.ORANGE,
                            },
                            {
                                value: AccentOptions.GREEN,
                                label: 'Green',
                                color: AccentColors.GREEN,
                            },
                            {
                                value: AccentOptions.CYAN,
                                label: 'Cyan',
                                color: AccentColors.CYAN,
                            },
                            {
                                value: AccentOptions.PURPLE,
                                label: 'Purple',
                                color: AccentColors.PURPLE,
                            },
                            {
                                value: AccentOptions.PINK,
                                label: 'Pink',
                                color: AccentColors.PINK,
                            },
                            {
                                value: AccentOptions.GREY,
                                label: 'Grey',
                                color: AccentColors.GREY,
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
                            label="Show featured mark"
                            field={featuredGroupDisplay}
                            asSwitcher={true}
                        />
                    </XView>
                </FormSection>
            </FormWrapper>
        </Page>
    );
});
