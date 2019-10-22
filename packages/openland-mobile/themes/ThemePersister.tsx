import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';
import { ThemeGlobalType, AccentGlobalType, getThemeByType } from 'openland-y-utils/themes/ThemeGlobal';

class ThemePersisterImpl {
    prepare = async () => {
        const storageThemeType = await AsyncStorage.getItem('app.theme.2') as ThemeGlobalType;
        const storageAccentType = await AsyncStorage.getItem('app.accent.2') as AccentGlobalType;

        let resolvedThemeType: ThemeGlobalType = 'Light';
        let resolvedAccentType: AccentGlobalType = 'Default';

        if (storageThemeType === 'Light' || storageThemeType === 'Dark') {
            resolvedThemeType = storageThemeType;
        }

        const resolvedThemeObject = getThemeByType(resolvedThemeType);
        if (resolvedThemeObject.supportedAccents.includes(storageAccentType)) {
            resolvedAccentType = storageAccentType;
        }

        ThemeController.theme = [resolvedThemeType, resolvedAccentType];
        ThemeController.watch((theme) => {
            AsyncStorage.setItem('app.theme.2', theme[0]);
            AsyncStorage.setItem('app.accent.2', theme[1]);
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();