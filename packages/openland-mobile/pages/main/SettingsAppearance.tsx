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
import { AccentCircle } from './components/appearance/AccentCircle';
import { ZTab } from 'openland-mobile/components/ZTab';
import { SUPER_ADMIN } from '../Init';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useText } from 'openland-mobile/text/useText';

const SettingsAppearanceComponent = React.memo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const handleChange = React.useCallback((appearance: ThemeGlobalKind) => {
        ThemeController.appearance = appearance;
    }, []);

    const [currentTheme, setCurrentTheme] = React.useState(ThemeController.appearance.theme);
    React.useEffect(() => {
        ThemeController.watch((appearance) => {
            setCurrentTheme(appearance.theme);
        });
    }, []);
    const [displayFeaturedIcon, setDisplayFeaturedIcon] = React.useState(theme.displayFeaturedIcon);
    const [largeEmoji, setLargeEmoji] = React.useState(theme.largeEmoji);

    return (
        <>
            <SHeader title={t('appearance', 'Appearance')} />
            <SScrollView>
                <ThemePreview />

                <ZListGroup header={t('theme', 'Theme')}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 }}>
                        <ZTab selected={currentTheme === 'System'} onPress={() => handleChange({ theme: 'System' })}>{t('themeSystem', 'System')}</ZTab>
                        <ZTab selected={currentTheme === 'Light'} onPress={() => handleChange({ theme: 'Light' })}>{t('themeLight', 'Light')}</ZTab>
                        <ZTab selected={currentTheme === 'Dark'} onPress={() => handleChange({ theme: 'Dark' })}>{t('themeDark', 'Dark')}</ZTab>

                        {SUPER_ADMIN && <ZTab selected={currentTheme === 'TrueDark'} onPress={() => handleChange({ theme: 'TrueDark' })}>{t('themeTrueDark', 'True Dark')}</ZTab>}
                    </View>
                </ZListGroup>

                <ZListGroup header={t('themeAccent', 'Accent')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', paddingHorizontal: 8 }}>
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

                <ZListGroup header={t('other', 'Other')}>
                    <ZListItem
                        text={t('themeLargeEmoji', 'Show large emoji')}
                        onToggle={(value) => {
                            setLargeEmoji(x => !x);
                            handleChange({ theme: currentTheme, largeEmoji: value });
                        }}
                        toggle={largeEmoji}
                    />
                    <ZListItem
                        text={t('themeFeaturedMark', 'Show featured mark')}
                        onToggle={(value) => {
                            setDisplayFeaturedIcon(x => !x);
                            handleChange({ theme: currentTheme, displayFeaturedIcon: value });
                        }}
                        toggle={displayFeaturedIcon}
                    />
                </ZListGroup>

                <View style={{ height: 16 }} />
            </SScrollView>
        </>
    );
});

export const SettingsAppearance = withApp(SettingsAppearanceComponent);