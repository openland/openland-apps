import { Platform } from 'react-native';

export interface AppTheme {
    headerColor: string;
    backgroundColor: string;
    inputBackground: string;
    textColor: string;
    textInverseColor: string;
    textInputColor: string;
    textLabelColor: string;
    separatorColor: string;
    selectorColor: string;
    arrowColor: string;
    androidIconColor: string;

    transparent: string;

    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    accentColor: string;
    accentDisabledColor: string;
    hairlineColor: string;
    groupHeaderColor: string;

    tabColorActive: string;
    tabColor: string;

    dialogTitleColor: string;
    dialogTitleSecureColor: string;
    dialogDateColor: string;
    dialogSenderColor: string;
    dialogMessageColor: string;
    dialogTypingColor: string;

    textColorOut: string;
    textSecondaryColor: string;
    linkColor: string;
    linkOutColor: string;
    bubbleColorIn: string;
    bubbleGradientOut: string[];

    reactionBackground: string;

    inputIconsColor: string;
    inputIconsColorInactive: string;
    inputIconsColorInactiveBackground: string;
}

export const DefaultTheme: AppTheme = {
    headerColor: 'white',
    transparent: 'rgba(255,255,255,0)',
    backgroundColor: 'white',
    inputBackground: '#f3f5f7',
    statusBar: 'dark-content',
    blurType: 'light',
    keyboardAppearance: 'light',
    androidIconColor: 'black',
    textColor: '#181818',
    textInverseColor: 'white',
    textInputColor: 'black',
    textLabelColor: Platform.OS === 'android' ? '#000' : '#8F8F91',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea',
    arrowColor: '#D1D1D6',
    accentColor: '#0084fe',
    accentDisabledColor: '#c8c8c8',
    hairlineColor: '#e0e3e7',
    groupHeaderColor: Platform.OS === 'android' ? '#000' : '#99a2b0',
    selectorColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, .1)' : '#eee',

    tabColor: Platform.OS === 'android' ? '#737373' : '#99a2b0',
    tabColorActive: Platform.OS === 'android' ? '#0084fe' : '#0084fe',

    dialogTitleColor: '#181818',
    dialogTitleSecureColor: '#1daf30',
    dialogDateColor: '#aaaaaa',
    dialogSenderColor: '#181818',
    dialogMessageColor: Platform.OS === 'android' ? '#676767' : '#7b7b7b',
    dialogTypingColor: '#0084fe',

    textColorOut: 'white',
    textSecondaryColor: '#8a8a8f',
    linkColor: '#0084fe',
    linkOutColor: 'white',
    bubbleColorIn: '#f3f5f7',
    bubbleGradientOut: ['#1970ff', '#11b2ff'],

    reactionBackground: '#f3f5f7',

    inputIconsColor: '#b9c1cd',
    inputIconsColorInactive: '#b0b0b0',
    inputIconsColorInactiveBackground: '#ebebeb',
}

export const DarkTheme: AppTheme = {
    headerColor: '#1a1a1a',
    transparent: 'rgba(0,0,0,0)',
    backgroundColor: 'black',
    inputBackground: 'black',
    statusBar: 'light-content',
    blurType: 'dark',
    keyboardAppearance: 'dark',
    androidIconColor: 'white',
    textColor: 'white',
    textInverseColor: 'black',
    textInputColor: 'white',
    textLabelColor: '#7D7D80',
    separatorColor: '#262629',
    arrowColor: '#565658',
    accentColor: 'white',
    accentDisabledColor: '#808080',
    hairlineColor: '#1C1C1E',
    groupHeaderColor: 'white',
    selectorColor: Platform.OS === 'android' ? '#1C1C1E' : '#1C1C1E',

    tabColor: '#929292',
    tabColorActive: '#FDFDFD',

    dialogTitleColor: 'white',
    dialogTitleSecureColor: '#33c045',
    dialogDateColor: 'white',
    dialogSenderColor: 'white',
    dialogMessageColor: 'white',
    dialogTypingColor: 'white',

    textColorOut: 'white',
    textSecondaryColor: '#808080',
    linkColor: 'white',
    linkOutColor: 'white',
    bubbleColorIn: '#333333',
    bubbleGradientOut: ['#4d4d4d', '#6d6d6d'],

    reactionBackground: 'black',

    inputIconsColor: '#767676',
    inputIconsColorInactive: '#b0b0b0',
    inputIconsColorInactiveBackground: '#ebebeb',
}