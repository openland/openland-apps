import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';
import { ThemeGlobalKind } from 'openland-y-utils/themes/types';

class ThemePersisterImpl {
    prepare = async () => {
        let res = await AsyncStorage.getItem('app.theme') as ThemeGlobalKind;

        if (res === 'Dark') {
            ThemeController.theme = 'Dark';
        } else {
            ThemeController.theme = 'LightBlue';
        }

        ThemeController.watch((theme) => {
            AsyncStorage.setItem('app.theme', theme);
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();