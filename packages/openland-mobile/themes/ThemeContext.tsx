import * as React from 'react'
import { ThemeKind, ThemeController } from './ThemeControler';
import { SStatusBar } from 'react-native-s/SStatusBar';
import { AppTheme, DefaultTheme, DarkTheme } from './themes';

export const ThemeContext = React.createContext<AppTheme>(DefaultTheme);

function resolveTheme(theme: ThemeKind) {
    if (theme === 'dark') {
        return DarkTheme;
    } else {
        return DefaultTheme;
    }
}

export const ThemeProvider = (props: { children?: any }) => {
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.theme));
    React.useEffect(() => {
        return ThemeController.watch((t) => {
            let r = resolveTheme(t);
            SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        })
    }, [])
    // console.log('render theme: ' + theme.backgroundColor);

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useThemeGlobal = () => {
    let [theme, setTheme] = React.useState(resolveTheme(ThemeController.theme));
    React.useEffect(() => {
        return ThemeController.watch((t) => {
            let r = resolveTheme(t);
            SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        })
    }, [])
    return theme;
}