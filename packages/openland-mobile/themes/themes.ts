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

    roundButtonBackground: string;
    roundButtonText: string;

    dialogTitleColor: string;
    dialogTitleSecureColor: string;
    dialogDateColor: string;
    dialogSenderColor: string;
    dialogMessageColor: string;
    dialogTypingColor: string;

    loaderColorIos: string;
    loaderColorAndroid: string;
    chatImageBackground: string;

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

    highlightedComment: string;
    listItemIconColor: string;
    listItemIconBackgroundColor: string;

    settingsNotificationIcon: string;
    settingsAppearanceIcon: string;
    settingsInviteIcon: string;
    settingsHelpIcon: string;
    settingsRateIcon: string;

    radioBorderColor: string;

    modalOverlay: string;
    modalBackground: string;

    ironyBackgroundOut: string;
    ironyBackground: string;
    ironyColorOut: string;
    ironyColor: string;
    ironyPaddedText: string;
}

export const DefaultTheme: AppTheme = {
    headerColor: 'white',
    transparent: 'rgba(255,255,255,0)',
    backgroundColor: 'white',
    inputBackground: '#f3f5f7',
    statusBar: 'dark-content',
    blurType: 'light',
    keyboardAppearance: 'light',
    androidIconColor: '#020202',
    textColor: '#181818',
    textInverseColor: 'white',
    textInputColor: '#020202',
    textLabelColor: Platform.OS === 'android' ? '#000' : '#8F8F91',
    separatorColor: Platform.OS === 'android' ? '#ebebeb' : '#eaeaea',
    arrowColor: '#D1D1D6',
    accentColor: '#0084fe',
    accentDisabledColor: '#c8c8c8',
    hairlineColor: '#e0e3e7',
    groupHeaderColor: Platform.OS === 'android' ? '#000' : '#99a2b0',
    selectorColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, .1)' : '#eee',

    roundButtonBackground: '#0084fe',
    roundButtonText: 'white',

    tabColor: Platform.OS === 'android' ? '#737373' : '#99a2b0',
    tabColorActive: Platform.OS === 'android' ? '#0084fe' : '#0084fe',

    loaderColorIos: '#999',
    loaderColorAndroid: '#0084fe',
    chatImageBackground: '#dbdce1',

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

    highlightedComment: '#fffee8',
    listItemIconColor: '#fff',
    listItemIconBackgroundColor: '#0084fe',

    settingsNotificationIcon: '#0084fe',
    settingsAppearanceIcon: '#eb7272',
    settingsInviteIcon: '#fe9400',
    settingsHelpIcon: '#00bfff',
    settingsRateIcon: '#8a54ff',

    radioBorderColor: '#c7cdd7',

    modalOverlay: Platform.OS === 'android' ? 'rgba(0,0,0,0.3)' : 'rgba(4, 4, 15, 0.4)',
    modalBackground: 'white',

    ironyBackgroundOut: 'rgba(255, 56, 46, 0.9)',
    ironyBackground: 'rgba(255, 56, 46, 0.1)',
    ironyColorOut: 'white',
    ironyColor: '#f6564e',
    ironyPaddedText: '\u00a0',
}

export const DarkTheme: AppTheme = {
    headerColor: '#1a1a1a',
    transparent: 'rgba(0,0,0,0)',
    backgroundColor: '#020202',
    inputBackground: '#020202',
    statusBar: 'light-content',
    blurType: 'dark',
    keyboardAppearance: 'dark',
    androidIconColor: 'white',
    textColor: 'white',
    textInverseColor: '#020202',
    textInputColor: 'white',
    textLabelColor: '#7D7D80',
    separatorColor: '#262629',
    arrowColor: '#565658',
    accentColor: 'white',
    accentDisabledColor: '#808080',
    hairlineColor: '#1C1C1E',
    groupHeaderColor: 'white',
    selectorColor: Platform.OS === 'android' ? '#1C1C1E' : '#1C1C1E',

    roundButtonBackground: '#313131',
    roundButtonText: 'white',

    tabColor: '#929292',
    tabColorActive: '#FDFDFD',

    loaderColorIos: 'white',
    loaderColorAndroid: 'white',
    chatImageBackground: '#555',

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

    reactionBackground: '#020202',

    inputIconsColor: '#767676',
    inputIconsColorInactive: '#b0b0b0',
    inputIconsColorInactiveBackground: '#ebebeb',

    highlightedComment: '#002140',
    listItemIconColor: '#d4d4d4',
    listItemIconBackgroundColor: '#262626',

    settingsNotificationIcon: '#262626',
    settingsAppearanceIcon: '#262626',
    settingsInviteIcon: '#262626',
    settingsHelpIcon: '#262626',
    settingsRateIcon: '#262626',
    radioBorderColor: '#fff',

    modalOverlay: Platform.OS === 'android' ? 'rgba(0,0,0,0.4)' : 'rgba(4, 4, 15, 0.5)',
    modalBackground: '#1a1a1a',

    ironyBackgroundOut: 'transparent',
    ironyBackground: 'transparent',
    ironyColorOut: '#f6564e',
    ironyColor: '#f6564e',
    ironyPaddedText: '',
}