import * as React from 'react';
import { ThemeController } from './ThemeControler';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ThemeGlobal, ThemeGlobalKind } from 'openland-y-utils/themes/types';
import { ThemeLightBlue, ThemeDark } from 'openland-y-utils/themes';

export const ThemeContext = React.createContext<ThemeGlobal>(ThemeLightBlue);

function resolveTheme(theme: ThemeGlobalKind) {
    if (theme === 'Dark') {
        return ThemeDark;
    } else {
        return ThemeLightBlue;
    }
}

export const ThemeProvider = (props: { children?: any }) => {
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.theme));

    React.useEffect(() => {
        return ThemeController.watch((t) => {
            let r = resolveTheme(t);
            SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        });
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useThemeGlobal = () => {
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.theme));

    React.useEffect(() => {
        return ThemeController.watch((t) => {
            let r = resolveTheme(t);
            SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        });
    }, []);

    return theme;
};