import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';

class ThemePersisterImpl {
    prepare = async () => {
        let res = await AsyncStorage.getItem('app.theme')
        if (res === 'dark') {
            ThemeController.theme = 'dark';
        } else {
            ThemeController.theme = 'light';
        }
        ThemeController.watch((theme) => {
            AsyncStorage.setItem('app.theme', theme);
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();