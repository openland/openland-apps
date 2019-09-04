import * as React from 'react';
import { ThemeController } from './ThemeControler';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ThemeGlobal, ThemeGlobalKind } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLight, ThemeLightRed, ThemeLightOrange, ThemeLightGreen, ThemeLightCyan, ThemeLightPurple, ThemeLightGray, ThemeLightPink } from 'openland-y-utils/themes/light';
import { ThemeDark, ThemeDarkBlue, ThemeDarkRed, ThemeDarkOrange, ThemeDarkGreen, ThemeDarkCyan, ThemeDarkPurple, ThemeDarkPink } from 'openland-y-utils/themes/dark';

export const ThemeContext = React.createContext<ThemeGlobal>(ThemeLight);

function resolveTheme(theme: ThemeGlobalKind) {
    if (theme === 'LightRed') {
        return ThemeLightRed;
    } else if (theme === 'LightOrange') {
        return ThemeLightOrange;
    } else if (theme === 'LightGreen') {
        return ThemeLightGreen;
    } else if (theme === 'LightCyan') {
        return ThemeLightCyan;
    } else if (theme === 'LightPink') {
        return ThemeLightPink;
    } else if (theme === 'LightPurple') {
        return ThemeLightPurple;
    } else if (theme === 'LightGray') {
        return ThemeLightGray;
    } else if (theme === 'Dark') {
        return ThemeDark;
    } else if (theme === 'DarkBlue') {
        return ThemeDarkBlue;
    } else if (theme === 'DarkRed') {
        return ThemeDarkRed;
    } else if (theme === 'DarkOrange') {
        return ThemeDarkOrange;
    } else if (theme === 'DarkGreen') {
        return ThemeDarkGreen;
    } else if (theme === 'DarkCyan') {
        return ThemeDarkCyan;
    } else if (theme === 'DarkPink') {
        return ThemeDarkPink;
    } else if (theme === 'DarkPurple') {
        return ThemeDarkPurple;
    } else {
        return ThemeLight;
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