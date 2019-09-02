import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';
import { ThemeGlobalKind } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLight } from 'openland-y-utils/themes/light';
import { View, TouchableOpacity, Image } from 'react-native';
import { ThemeDark } from 'openland-y-utils/themes/dark';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const SortedLightThemes: { [key: string]: string } = {
    Light: ThemeLight.accentPrimary,
    LightRed: ThemeLight.tintRed,
    LightOrange: ThemeLight.tintOrange,
    LightGreen: ThemeLight.tintGreen,
    LightCyan: ThemeLight.tintCyan,
    LightPurple: ThemeLight.tintPurple,
};

const SortedDarkThemes: { [key: string]: string } = {
    Dark: ThemeDark.accentPrimary,
    DarkBlue: ThemeLight.tintBlue,
    DarkRed: ThemeLight.tintRed,
    DarkOrange: ThemeLight.tintOrange,
    DarkGreen: ThemeLight.tintGreen,
    DarkCyan: ThemeLight.tintCyan,
    DarkPurple: ThemeLight.tintPurple,
};

const AccentCircle = React.memo((props: { color: string, checked: boolean, onPress: () => void }) => {
    const { color, checked, onPress } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    backgroundColor: color,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {checked && (
                    <Image
                        source={require('assets/ic-checkmark.png')}
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: color === theme.foregroundContrast ? theme.backgroundPrimary : theme.foregroundContrast
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
});

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    const [theme, setTheme] = React.useState(ThemeController.theme);
    const handleChange = React.useCallback((type: ThemeGlobalKind) => {
        setTimeout(() => {
            setTheme(type);
            ThemeController.theme = type;
        }, 10);
    }, []);

    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ZListGroup header="Theme">
                    <ZListItem
                        text="Light"
                        checkmark={theme.startsWith('Light')}
                        onPress={() => handleChange('Light')}
                    />
                    <ZListItem
                        text="Dark"
                        checkmark={theme.startsWith('Dark')}
                        onPress={() => handleChange('Dark')}
                    />

                </ZListGroup>
                {NON_PRODUCTION && (
                    <ZListGroup header="Accent">
                        <View flexDirection="row" alignItems="center" justifyContent="space-between" paddingHorizontal={16}>
                            {theme.startsWith('Light') && Object.keys(SortedLightThemes).map(k => (
                                <AccentCircle
                                    key={k}
                                    onPress={() => handleChange(k as ThemeGlobalKind)}
                                    color={SortedLightThemes[k]}
                                    checked={theme === k}
                                />
                            ))}
                            {theme.startsWith('Dark') && Object.keys(SortedDarkThemes).map(k => (
                                <AccentCircle
                                    key={k}
                                    onPress={() => handleChange(k as ThemeGlobalKind)}
                                    color={SortedDarkThemes[k]}
                                    checked={theme === k}
                                />
                            ))}
                        </View>
                    </ZListGroup>
                )}
            </SScrollView>
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);