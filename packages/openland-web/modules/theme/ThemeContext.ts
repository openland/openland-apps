import * as React from 'react';

export interface Theme {

    appBarBackgroundColor: string;
    appBarSeparatorColor?: string;
    appBarSeparatorInnerColor: string;

    backgroundColor: string;
    textColor: string;
    textColorSelected: string;
}

export const DefaultTheme: Theme = {
    appBarBackgroundColor: '#f6f6f6',
    backgroundColor: '#fff',
    appBarSeparatorColor: '#ececec',
    appBarSeparatorInnerColor: 'rgba(220, 222, 228, 0.6)',

    textColor: '#000',
    textColorSelected: '#fff',
}

// rgba(33, 189, 81, 0.83)
export const VibrantTheme: Theme = {
    appBarBackgroundColor: '#220362',
    appBarSeparatorColor: undefined,
    appBarSeparatorInnerColor: 'rgba(33, 189, 81, 0.83)',

    backgroundColor: '#fff',

    textColor: '#000',
    textColorSelected: '#fff',
}

export const DarkTheme: Theme = {
    appBarBackgroundColor: '#2E3137',
    backgroundColor: '#2E3137',
    appBarSeparatorInnerColor: 'rgba(220, 222, 228, 0.6)',

    textColor: '#fff',
    textColorSelected: '#000',
}

export const ThemeContext = React.createContext<Theme>(DefaultTheme);