import * as React from 'react'
import { ThemeKind, ThemeController } from './ThemeControler';
import { Platform } from 'react-native';
import { SStatusBar } from 'react-native-s/SStatusBar';

export interface AppTheme {
    backgroundColor: string;
    textColor: string;
    separatorColor: string;
    arrowColor: string;
    blurType: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';
    accentColor: string;
    hairlineColor: string;
    groupHeaderColor: string;
}

export const DefaultTheme: AppTheme = {
    backgroundColor: 'white',
    statusBar: 'dark-content',
    blurType: 'light',
    textColor: '#181818',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea',
    arrowColor: '#565658',
    accentColor: '#0084fe',
    hairlineColor: '#e0e3e7',
    groupHeaderColor: Platform.OS === 'android' ? '#000' : '#99a2b0'
}

export const DarkTheme: AppTheme = {
    backgroundColor: 'black',
    statusBar: 'light-content',
    blurType: 'dark',
    textColor: 'white',
    separatorColor: '#262629',
    arrowColor: '#565658',
    accentColor: 'white',
    hairlineColor: '#1C1C1E',
    groupHeaderColor: 'white'
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
            let r = resolveTheme(t);
            SStatusBar.setBarStyle(r.statusBar);
            setTheme(r);
        })
    }, [])
    console.log('render theme: ' + theme.backgroundColor);

    return (
        <ThemeContext.Provider value={theme}>
            {props.children}
        </ThemeContext.Provider>
    )
};