import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeController } from 'openland-mobile/themes/ThemeControler';
import { ThemeGlobalKind } from 'openland-y-utils/themes/ThemeGlobal';
import { View, TouchableOpacity, Image, Text, LayoutChangeEvent } from 'react-native';
import { ThemeContext, resolveTheme } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { isPad } from '../Root';

const ThemePreview = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    const gradientStart = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0)' : 'rgba(242, 243, 245, 0)';
    const gradientEnd = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0.56)' : 'rgba(242, 243, 245, 0.56)';

    return (
        <LinearGradient colors={[gradientStart, gradientEnd]} paddingTop={8} paddingBottom={24} paddingHorizontal={16}>
            <View marginBottom={8} alignItems="flex-start">
                <View backgroundColor={theme.incomingBackgroundPrimary} paddingVertical={7} paddingLeft={12} paddingRight={70} borderRadius={RadiusStyles.Large}>
                    <Text style={[TextStyles.Densed, { color: theme.incomingForegroundPrimary }]} allowFontScaling={false}>
                        Hello! How are you?
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.incomingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]}>
                        9:41 AM
                    </Text>
                </View>
            </View>
            <View alignItems="flex-end">
                <View backgroundColor={theme.outgoingBackgroundPrimary} paddingVertical={7} paddingLeft={12} paddingRight={70} borderRadius={RadiusStyles.Large}>
                    <Text style={[TextStyles.Densed, { color: theme.outgoingForegroundPrimary }]} allowFontScaling={false}>
                        I’m fine. Thanks!
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.outgoingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]}>
                        9:41 AM
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
});

const ThemeSwitcher = React.memo((props: { label: string, onPress: () => void, selected: boolean }) => {
    const { label, onPress, selected } = props;
    const theme = React.useContext(ThemeContext);

    return (
        <View flexGrow={1}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View
                    backgroundColor={selected ? theme.backgroundTertiary : undefined}
                    alignItems="center"
                    justifyContent="center"
                    height={36}
                    borderRadius={RadiusStyles.Large}
                >
                    <Text style={[TextStyles.Label1, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                        {label}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});

const AccentCircle = React.memo((props: { color: string, checked: boolean, onPress: () => void }) => {
    const { color, checked, onPress } = props;
    const theme = React.useContext(ThemeContext);

    const [height, setHeight] = React.useState(0);
    const onLayout = React.useCallback((e: LayoutChangeEvent) => {
        setHeight(e.nativeEvent.layout.width - 16);
    }, []);

    return (
        <View width={isPad ? '12.5%' : '25%'} padding={8} onLayout={onLayout}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.64}>
                <View height={height} borderRadius={height / 2} backgroundColor={color} alignItems="center" justifyContent="center">
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
        </View>
    );
});

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const handleChange = React.useCallback((appearance: ThemeGlobalKind) => {
        // setTimeout(() => {
        ThemeController.appearance = appearance;
        // }, 10);
    }, []);

    const currentTheme = ThemeController.appearance.theme;

    return (
        <>
            <SHeader title="Appearance" />
            <SScrollView>
                <ThemePreview />

                <ZListGroup header="Theme">
                    <View flexDirection="row" paddingHorizontal={16} paddingVertical={8}>
                        <ThemeSwitcher selected={ThemeController.appearance.theme === 'System'} label="System" onPress={() => handleChange({ theme: 'System' })} />
                        <ThemeSwitcher selected={ThemeController.appearance.theme === 'Light'} label="Light" onPress={() => handleChange({ theme: 'Light' })} />
                        <ThemeSwitcher selected={ThemeController.appearance.theme === 'Dark'} label="Dark" onPress={() => handleChange({ theme: 'Dark' })} />
                    </View>
                </ZListGroup>

                <ZListGroup header="Accent">
                    <View flexDirection="row" justifyContent="flex-start" flexWrap="wrap" paddingHorizontal={8}>
                        {theme.supportedAccents.map(accent => (
                            <AccentCircle
                                key={`${theme.type}-${accent}`}
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