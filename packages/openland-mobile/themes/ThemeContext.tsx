import * as React from 'react';
import { ThemeController } from './ThemeControler';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ThemeGlobal, ThemeGlobalKind, ThemeGlobalType, AccentGlobalType, getThemeByType, getAccentByType } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLight } from 'openland-y-utils/themes/light';

export const ThemeContext = React.createContext<ThemeGlobal>(ThemeLight);
export const useTheme = () => React.useContext(ThemeContext);

export function resolveTheme(theme: ThemeGlobalKind): ThemeGlobal {
    let resolvedThemeType: ThemeGlobalType = 'Light';
    let resolvedAccentType: AccentGlobalType = 'Default';

    if (theme.theme === 'Light' || theme.theme === 'Dark') {
        resolvedThemeType = theme.theme;
    }

    const resolvedThemeObject = getThemeByType(resolvedThemeType);
    if (theme.accent && resolvedThemeObject.supportedAccents.includes(theme.accent)) {
        resolvedAccentType = theme.accent;
    }

    const resolvedAccentObject = getAccentByType(resolvedAccentType);

    return {
        ...resolvedThemeObject,
        ...resolvedAccentObject
    };
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