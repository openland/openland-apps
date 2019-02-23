import * as React from 'react'
import { ThemeKind, ThemeController } from './ThemeControler';
import { Platform } from 'react-native';

export interface AppTheme {
    backgroundColor: string;
    textColor: string;
    separatorColor: string;
}

export const DefaultTheme: AppTheme = {
    backgroundColor: 'white',
    textColor: '#181818',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea'
}

export const DarkTheme: AppTheme = {
    backgroundColor: 'black',
    textColor: 'white',
    separatorColor: '#1C1C1E'
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
    console.log('render theme: ' + theme.backgroundColor);

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
};