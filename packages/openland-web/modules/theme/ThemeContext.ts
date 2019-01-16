import * as React from 'react';

export interface Theme {
    backgroundColor: string;
    textColor: string;
    textColorSelected: string;
}

export const DefaultTheme: Theme = {
    backgroundColor: '#fff',
    
    textColor: '#000',
    textColorSelected: '#fff',
}

export const DarkTheme: Theme = {
    backgroundColor: '#2E3137',
    
    textColor: '#fff',
    textColorSelected: '#000',
}

export const ThemeContext = React.createContext<Theme>(DefaultTheme);