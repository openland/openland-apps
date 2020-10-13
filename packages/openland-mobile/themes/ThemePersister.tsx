import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';
import { AccentGlobalType, getThemeByType, ThemeVariants } from 'openland-y-utils/themes/ThemeGlobal';
let prepared = false;
class ThemePersisterImpl {
    prepare = async () => {
        if (prepared) {
            return;
        }
        prepared = true;
        const storageThemeType = await AsyncStorage.getItem('app.theme.3') as ThemeVariants;
        const storageAccentType = await AsyncStorage.getItem('app.accent.3') as AccentGlobalType;
        const storageDisplayFeaturedIcon = await AsyncStorage.getItem('app.displayFeaturedIcon.3') as 'show' | 'hide' | null;
        const storageLargeEmoji = await AsyncStorage.getItem('app.largeEmoji.3') as 'true' | 'false' | null;

        let resolvedThemeType: ThemeVariants = 'System';
        let resolvedAccentType: AccentGlobalType = 'Default';

        if (storageThemeType === 'Light' || storageThemeType === 'Dark' || storageThemeType === 'TrueDark' || storageThemeType === 'System') {
            resolvedThemeType = storageThemeType;
        }

        const resolvedThemeObject = getThemeByType(resolvedThemeType);
        if (resolvedThemeObject.supportedAccents.includes(storageAccentType)) {
            resolvedAccentType = storageAccentType;
        }

        ThemeController.appearance = {
            theme: resolvedThemeType,
            accent: resolvedAccentType,
            displayFeaturedIcon: storageDisplayFeaturedIcon !== null ? storageDisplayFeaturedIcon === 'show' : undefined,
            largeEmoji: storageLargeEmoji !== null ? storageLargeEmoji === 'true' : undefined,
        };
        ThemeController.watch((appearance) => {
            AsyncStorage.setItem('app.theme.3', appearance.theme);
            AsyncStorage.setItem('app.accent.3', appearance.accent || 'Default');
            if (typeof appearance.displayFeaturedIcon !== 'undefined') {
                AsyncStorage.setItem('app.displayFeaturedIcon.3', appearance.displayFeaturedIcon ? 'show' : 'hide');
            }
            if (typeof appearance.largeEmoji !== 'undefined') {
                AsyncStorage.setItem('app.largeEmoji.3', appearance.largeEmoji ? 'true' : 'false');
            }
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();