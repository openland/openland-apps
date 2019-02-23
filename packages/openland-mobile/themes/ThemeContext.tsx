import * as React from 'react'
import { ThemeKind, ThemeController } from './ThemeControler';

export interface AppTheme {
    backgroundColor: string
}

export const DefaultTheme: AppTheme = {
    backgroundColor: 'white'
}

export const DarkTheme: AppTheme = {
    backgroundColor: 'black'
}

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
            setTheme(resolveTheme(t));
        })
    }, [])

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
};