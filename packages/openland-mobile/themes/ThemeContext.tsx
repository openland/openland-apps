import * as React from 'react';
import { ThemeController } from './ThemeControler';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { ThemeGlobal, ThemeGlobalKind, AccentGlobalType, getThemeByType, getAccentByType, ThemeVariants } from 'openland-y-utils/themes/ThemeGlobal';
import { ThemeLight } from 'openland-y-utils/themes/light';
import { initialMode, eventEmitter } from 'react-native-dark-mode';

export const ThemeContext = React.createContext<ThemeGlobal>(ThemeLight);
export const useTheme = () => React.useContext(ThemeContext);

export let SystemTheme = initialMode;

eventEmitter.on('currentModeChanged', newMode => {
    if (SystemTheme === newMode) {
        return;
    }
    SystemTheme = newMode;

    if (ThemeController.appearance.theme === 'System') {
        ThemeController.appearance = { theme: 'System' };
    }
});

export function resolveTheme(appearance: ThemeGlobalKind): ThemeGlobal {
    let resolvedThemeType: ThemeVariants = 'System';
    let resolvedAccentType: AccentGlobalType = 'Default';

    if (appearance.theme === 'Light' || appearance.theme === 'Dark' || appearance.theme === 'TrueDark' || appearance.theme === 'System') {
        resolvedThemeType = appearance.theme;
    }

    const resolvedThemeObject = getThemeByType(resolvedThemeType);
    if (appearance.accent && resolvedThemeObject.supportedAccents.includes(appearance.accent)) {
        resolvedAccentType = appearance.accent;
    }

    const resolvedAccentObject = getAccentByType(resolvedAccentType);

    return {
        ...resolvedThemeObject,
        ...resolvedAccentObject
    };
}

export const ThemeProvider = (props: { children?: any }) => {
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.appearance));

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
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.appearance));

    React.useEffect(() => {
        return ThemeController.watch((t) => {
            let r = resolveTheme(t);
            // SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        });
    }, []);

    return theme;
};