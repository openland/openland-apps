import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';
import { AccentGlobalType, getThemeByType, ThemeVariants } from 'openland-y-utils/themes/ThemeGlobal';

class ThemePersisterImpl {
    prepare = async () => {
        const storageThemeType = await AsyncStorage.getItem('app.theme.3') as ThemeVariants;
        const storageAccentType = await AsyncStorage.getItem('app.accent.3') as AccentGlobalType;

        let resolvedThemeType: ThemeVariants = 'System';
        let resolvedAccentType: AccentGlobalType = 'Default';

        if (storageThemeType === 'Light' || storageThemeType === 'Dark' || storageThemeType === 'System') {
            resolvedThemeType = storageThemeType;
        }

        const resolvedThemeObject = getThemeByType(resolvedThemeType);
        if (resolvedThemeObject.supportedAccents.includes(storageAccentType)) {
            resolvedAccentType = storageAccentType;
        }

        ThemeController.appearance = { theme: resolvedThemeType, accent: resolvedAccentType };
        ThemeController.watch((appearance) => {
            AsyncStorage.setItem('app.theme.3', appearance.theme);
            AsyncStorage.setItem('app.accent.3', appearance.accent || 'Default');
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();