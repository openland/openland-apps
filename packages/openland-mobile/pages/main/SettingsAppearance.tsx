import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';
import { ThemeGlobalKind, ThemeGlobalType } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLight, ThemeLightPink, ThemeLightCyan, ThemeLightGrey, ThemeLightRed, ThemeLightOrange, ThemeLightGreen, ThemeLightPurple } from 'openland-y-utils/themes/light';
import { View, TouchableOpacity, Image } from 'react-native';
import { ThemeDark, ThemeDarkBlue, ThemeDarkRed, ThemeDarkOrange, ThemeDarkGreen, ThemeDarkCyan, ThemeDarkPink, ThemeDarkPurple } from 'openland-y-utils/themes/dark';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';

const SortedThemes: { [key in ThemeGlobalType]: { [key: string]: string } } = {
    Light: {
        Light: ThemeLight.accentPrimary,
        LightGrey: ThemeLightGrey.accentPrimary,
        LightRed: ThemeLightRed.accentPrimary,
        LightOrange: ThemeLightOrange.accentPrimary,
        LightGreen: ThemeLightGreen.accentPrimary,
        LightCyan: ThemeLightCyan.accentPrimary,
        LightPink: ThemeLightPink.accentPrimary,
        LightPurple: ThemeLightPurple.accentPrimary,
    },
    Dark: {
        Dark: ThemeDark.accentPrimary,
        DarkBlue: ThemeDarkBlue.accentPrimary,
        DarkRed: ThemeDarkRed.accentPrimary,
        DarkOrange: ThemeDarkOrange.accentPrimary,
        DarkGreen: ThemeDarkGreen.accentPrimary,
        DarkCyan: ThemeDarkCyan.accentPrimary,
        DarkPink: ThemeDarkPink.accentPrimary,
        DarkPurple: ThemeDarkPurple.accentPrimary,
    }
};

const ThemeItem = React.memo((props: { type: ThemeGlobalType, checked: boolean, onPress: () => void }) => {
    const theme = React.useContext(ThemeContext);
    const { type, checked, onPress } = props;
    const themeObject = type === 'Light' ? ThemeLight : ThemeDark;

    const primaryColor = checked ? theme.bubble(true).backgroundPrimary : themeObject.bubble(true).backgroundPrimary;
    const secondaryColor = checked ? theme.bubble(false).backgroundPrimary : themeObject.bubble(false).backgroundPrimary;

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.64}>
            <View padding={12} width={104} height={148} borderWidth={1} borderColor={themeObject.border} backgroundColor={themeObject.backgroundPrimary} marginLeft={16} borderRadius={RadiusStyles.Medium}>
                <View backgroundColor={primaryColor} alignSelf="flex-end" marginBottom={4} width={64} height={16} borderTopLeftRadius={8} borderTopRightRadius={8} borderBottomLeftRadius={8} borderBottomRightRadius={4} />
                <View backgroundColor={primaryColor} alignSelf="flex-end" marginBottom={8} width={48} height={16} borderTopLeftRadius={8} borderTopRightRadius={4} borderBottomLeftRadius={8} borderBottomRightRadius={8} />
                <View backgroundColor={secondaryColor} marginBottom={4} width={64} height={16} borderTopLeftRadius={8} borderTopRightRadius={8} borderBottomLeftRadius={4} borderBottomRightRadius={8} />
                <View backgroundColor={secondaryColor} width={64} height={16} borderTopLeftRadius={4} borderTopRightRadius={8} borderBottomLeftRadius={8} borderBottomRightRadius={8} />

                <View position="absolute" alignSelf="center" bottom={16} backgroundColor={checked ? theme.accentPrimary : themeObject.backgroundPrimary} borderColor={checked ? theme.accentPrimary : themeObject.foregroundSecondary} borderWidth={2} borderRadius={RadiusStyles.Medium} width={24} height={24}>
                    {checked && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.foregroundInverted }} />}
                </View>
            </View>
        </TouchableOpacity>
    );
});

const AccentCircle = React.memo((props: { color: string, checked: boolean, onPress: () => void }) => {
    const { color, checked, onPress } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.64}>
            <View width={74} height={74} borderRadius={37} backgroundColor={color} alignItems="center" justifyContent="center" marginBottom={16}>
                {checked && (
                    <Image
                        source={require('assets/ic-done-24.png')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: color === theme.foregroundContrast ? theme.backgroundPrimary : theme.foregroundContrast
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
});

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const handleChange = React.useCallback((type: ThemeGlobalKind) => {
        setTimeout(() => {
            ThemeController.theme = type;
        }, 10);
    }, []);

    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ZListGroup header="Theme">
                    <View flexDirection="row" paddingRight={16}>
                        <ThemeItem
                            type="Light"
                            checked={theme.type === 'Light'}
                            onPress={() => handleChange('Light')}
                        />
                        <ThemeItem
                            type="Dark"
                            checked={theme.type === 'Dark'}
                            onPress={() => handleChange('Dark')}
                        />
                    </View>
                </ZListGroup>

                {NON_PRODUCTION && (
                    <ZListGroup header="Accent (NON_PRODUCTION)">
                        <View flexDirection="row" justifyContent="space-between" paddingHorizontal={16} flexWrap="wrap">
                            {Object.keys(SortedThemes[theme.type]).map(k => (
                                <AccentCircle
                                    key={k}
                                    onPress={() => handleChange(k as ThemeGlobalKind)}
                                    color={SortedThemes[theme.type][k]}
                                    checked={theme.kind === k}
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