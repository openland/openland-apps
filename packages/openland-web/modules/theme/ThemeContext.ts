import * as React from 'react';

export interface Theme {
    appBarBackgroundColor: string;
    appBarSeparatorColor?: string;
    appBarSeparatorInnerColor: string;
    backgroundColor: string;

    dialogDateTextColor: string;
    dialogDateTextColorSelected: string;
    dialogTitleTextColor: string;
    dialogTitleTextColorSelected: string;
    dialogMessageTextColor: string;
    dialogMessageTextColorSelected: string;
}

export const DefaultTheme: Theme = {
    appBarBackgroundColor: '#f6f6f6',
    backgroundColor: '#fff',
    appBarSeparatorColor: '#ececec',
    appBarSeparatorInnerColor: 'rgba(220, 222, 228, 0.6)',

    dialogDateTextColor: 'rgba(0, 0, 0, 0.3)',
    dialogDateTextColorSelected: '#fff',
    dialogTitleTextColor: '#000',
    dialogTitleTextColorSelected: '#fff',
    dialogMessageTextColor: 'rgba(0, 0, 0, 0.5)',
    dialogMessageTextColorSelected: '#fff',
};

// rgba(33, 189, 81, 0.83)
export const VibrantTheme: Theme = {
    appBarBackgroundColor: '#220362',
    appBarSeparatorColor: undefined,
    appBarSeparatorInnerColor: 'rgba(33, 189, 81, 0.83)',

    backgroundColor: '#fff',

    dialogDateTextColor: '#000',
    dialogDateTextColorSelected: '#fff',
    dialogTitleTextColor: '#000',
    dialogTitleTextColorSelected: '#fff',
    dialogMessageTextColor: '#000',
    dialogMessageTextColorSelected: '#fff',
};

export const DarkTheme: Theme = {
    appBarBackgroundColor: '#2E3137',
    backgroundColor: '#2E3137',
    appBarSeparatorInnerColor: 'rgba(220, 222, 228, 0.6)',

    dialogDateTextColor: '#fff',
    dialogDateTextColorSelected: '#000',
    dialogTitleTextColor: '#fff',
    dialogTitleTextColorSelected: '#000',
    dialogMessageTextColor: '#fff',
    dialogMessageTextColorSelected: '#000',
};

export const ThemeContext = React.createContext<Theme>(DefaultTheme);
