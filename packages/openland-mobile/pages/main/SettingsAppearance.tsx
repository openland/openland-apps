import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';
import { ThemeGlobalKind } from 'openland-y-utils/themes/ThemeGlobal';
import { View } from 'react-native';
import { ThemeContext, resolveTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemePreview } from './components/appearance/ThemePreview';
import { ThemeSwitcher } from './components/appearance/ThemeSwitcher';
import { AccentCircle } from './components/appearance/AccentCircle';

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const handleChange = React.useCallback((appearance: ThemeGlobalKind) => {
        ThemeController.appearance = appearance;
    }, []);

    const [currentTheme, setCurrentTheme] = React.useState(ThemeController.appearance.theme);
    React.useEffect(() => {
        ThemeController.watch((appearance) => {
            setCurrentTheme(appearance.theme);
        });
    }, []);

    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ThemePreview />

                <ZListGroup header="Theme">
                    <View flexDirection="row" paddingHorizontal={16} paddingVertical={8}>
                        <ThemeSwitcher selected={currentTheme === 'System'} label="System" onPress={() => handleChange({ theme: 'System' })} />
                        <ThemeSwitcher selected={currentTheme === 'Light'} label="Light" onPress={() => handleChange({ theme: 'Light' })} />
                        <ThemeSwitcher selected={currentTheme === 'Dark'} label="Dark" onPress={() => handleChange({ theme: 'Dark' })} />
                    </View>
                </ZListGroup>

                <ZListGroup header="Accent">
                    <View flexDirection="row" justifyContent="flex-start" flexWrap="wrap" paddingHorizontal={8}>
                        {theme.supportedAccents.map(accent => (
                            <AccentCircle
                                key={accent}
                                onPress={() => handleChange({ theme: currentTheme, accent })}
                                color={resolveTheme({ theme: currentTheme, accent }).accentPrimary}
                                checked={theme.accentType === accent}
                            />
                        ))}
                    </View>
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);