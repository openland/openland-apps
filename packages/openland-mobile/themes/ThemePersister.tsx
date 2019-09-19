import { AsyncStorage } from 'react-native';
import { ThemeController } from './ThemeControler';
import { ThemeGlobalKind } from 'openland-y-utils/themes/ThemeGlobal';

class ThemePersisterImpl {
    prepare = async () => {
        let res = await AsyncStorage.getItem('app.theme') as ThemeGlobalKind;

        if (res === 'LightRed') {
            ThemeController.theme = 'LightRed';
        } else if (res === 'LightOrange') {
            ThemeController.theme = 'LightOrange';
        } else if (res === 'LightGreen') {
            ThemeController.theme = 'LightGreen';
        } else if (res === 'LightCyan') {
            ThemeController.theme = 'LightCyan';
        } else if (res === 'LightPink') {
            ThemeController.theme = 'LightPink';
        } else if (res === 'LightPurple') {
            ThemeController.theme = 'LightPurple';
        } else if (res === 'LightGrey') {
            ThemeController.theme = 'LightGrey';
        } else if (res === 'Dark') {
            ThemeController.theme = 'Dark';
        } else if (res === 'DarkBlue') {
            ThemeController.theme = 'DarkBlue';
        } else if (res === 'DarkRed') {
            ThemeController.theme = 'DarkRed';
        } else if (res === 'DarkOrange') {
            ThemeController.theme = 'DarkOrange';
        } else if (res === 'DarkGreen') {
            ThemeController.theme = 'DarkGreen';
        } else if (res === 'DarkCyan') {
            ThemeController.theme = 'DarkCyan';
        } else if (res === 'DarkPink') {
            ThemeController.theme = 'DarkPink';
        } else if (res === 'DarkPurple') {
            ThemeController.theme = 'DarkPurple';
        } else {
            ThemeController.theme = 'Light';
        }

        ThemeController.watch((theme) => {
            AsyncStorage.setItem('app.theme', theme);
        });
    }
}

export const ThemePersister = new ThemePersisterImpl();