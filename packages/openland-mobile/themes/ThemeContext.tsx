import * as React from 'react'
import { ThemeKind, ThemeController } from './ThemeControler';
import { Platform } from 'react-native';
import { SStatusBar } from 'react-native-s/SStatusBar';

export interface AppTheme {
    backgroundColor: string;
    textColor: string;
    textLabelColor: string;
    separatorColor: string;
    selectorColor: string;
    arrowColor: string;
    androidIconColor: string;
    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';
    accentColor: string;
    hairlineColor: string;
    groupHeaderColor: string;

    tabColorActive: string;
    tabColor: string;
}

export const DefaultTheme: AppTheme = {
    backgroundColor: 'white',
    statusBar: 'dark-content',
    blurType: 'light',
    keyboardAppearance: 'light',
    androidIconColor: 'black',
    textColor: '#181818',
    textLabelColor: Platform.OS === 'android' ? '#000' : '#8F8F91',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea',
    arrowColor: '#D1D1D6',
    accentColor: '#0084fe',
    hairlineColor: '#e0e3e7',
    groupHeaderColor: Platform.OS === 'android' ? '#000' : '#99a2b0',
    selectorColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, .24)' : '#eee',

    tabColor: Platform.OS === 'android' ? '#737373' : '#99a2b0',
    tabColorActive: Platform.OS === 'android' ? '#0084fe' : '#0084fe'
}

export const DarkTheme: AppTheme = {
    backgroundColor: 'black',
    statusBar: 'light-content',
    blurType: 'dark',
    keyboardAppearance: 'dark',
    androidIconColor: 'white',
    textColor: 'white',
    textLabelColor: '#7D7D80',
    separatorColor: '#262629',
    arrowColor: '#565658',
    accentColor: 'white',
    hairlineColor: '#1C1C1E',
    groupHeaderColor: 'white',
    selectorColor: Platform.OS === 'android' ? 'rgba(1, 1, 1, .24)' : '#1C1C1E',

    tabColor: '#929292',
    tabColorActive: '#FDFDFD'
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