import { Platform } from 'react-native';

interface AppTheme {
    headerColor: string;
    subHeaderColor: string;
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
    androidInputBackground: NodeRequire;

    transparent: string;

    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    accentColor: string;
    accentDisabledColor: string;
    accentBackgroundColor: string;
    hairlineColor: string;
    groupHeaderColor: string;

    tabColorActive: string;
    tabColor: string;

    roundButtonBackground: {
        default: string;
        secondary: string;
    };
    roundButtonText: {
        default: string;
        secondary: string;
    };

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

    reactionsBackground: string;
    reactionsColor: string;
    commentsBackground: string;
    commentsColor: string;

    inputIconsColor: string;
    inputIconsColorBackground: string;
    inputIconsColorInactive: string;
    inputIconsColorInactiveBackground: string;
    inputIconsColorActive: string;
    inputIconsColorActiveBackground: string;

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

    ironySpan: {
        backgroundOut: string,
        background: string,
        colorOut: string,
        color: string,
        paddedText: string,
    };

    codeSpan: {
        backgroundOut: string,
        background: string,
        paddedText: string,
    };

    imageEmpty: NodeRequire;
}

const DefaultTheme: AppTheme = {
    headerColor: 'white',
    subHeaderColor: '#eff0f2',
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
    accentBackgroundColor: '#e5f2fe',
    hairlineColor: '#e0e3e7',
    groupHeaderColor: Platform.OS === 'android' ? '#000' : '#99a2b0',
    selectorColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, .1)' : '#eee',
    androidInputBackground: require('assets/input.png'),

    roundButtonBackground: {
        default: '#0084fe',
        secondary: '#e5f2fe',
    },
    roundButtonText: {
        default: 'white',
        secondary: '#0084fe',
    },

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

    reactionsBackground: '#f3f5f7',
    reactionsColor: '#99a2b0',
    commentsBackground: 'rgba(0, 132, 254, 0.1)',
    commentsColor: '#0084fe',

    inputIconsColor: Platform.OS === 'android' ? 'white' : '#b9c1cd',
    inputIconsColorBackground: '#0084fe',
    inputIconsColorInactive: '#b0b0b0',
    inputIconsColorInactiveBackground: '#ebebeb',
    inputIconsColorActive: 'white',
    inputIconsColorActiveBackground: '#0084fe',

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

    ironySpan: {
        backgroundOut: 'rgba(255, 56, 46, 0.9)',
        background: 'rgba(255, 56, 46, 0.1)',
        colorOut: 'white',
        color: '#f6564e',
        paddedText: '\u00a0',
    },

    codeSpan: {
        backgroundOut: 'rgba(0, 0, 0, 0.2)',
        background: 'rgba(255, 170, 0, 0.2)',
        paddedText: '\u202F',
    },

    imageEmpty: require('assets/img-empty.png')
};

const DarkTheme: AppTheme = {
    headerColor: '#1a1a1a',
    subHeaderColor: '#1a1a1a',
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
    accentBackgroundColor: '#808080',
    hairlineColor: '#1C1C1E',
    groupHeaderColor: 'white',
    selectorColor: Platform.OS === 'android' ? '#1C1C1E' : '#1C1C1E',
    androidInputBackground: require('assets/input_dark.png'),

    roundButtonBackground: {
        default: 'white',
        secondary: '#313131',
    },
    roundButtonText: {
        default: '#000000',
        secondary: 'white',
    },

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

    reactionsBackground: 'rgba(255, 255, 255, 0.2)',
    reactionsColor: 'rgba(255, 255, 255, 0.8)',
    commentsBackground: 'rgba(255, 255, 255, 0.2)',
    commentsColor: 'rgba(255, 255, 255, 0.8)',

    inputIconsColor: Platform.OS === 'android' ? 'white' : '#767676',
    inputIconsColorBackground: 'rgba(255, 255, 255, 0.2)',
    inputIconsColorInactive: '#b0b0b0',
    inputIconsColorInactiveBackground: '#000000',
    inputIconsColorActive: '#ffffff',
    inputIconsColorActiveBackground: '#000000',

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

    ironySpan: {
        backgroundOut: 'transparent',
        background: 'transparent',
        colorOut: '#f6564e',
        color: '#f6564e',
        paddedText: '',
    },

    codeSpan: {
        backgroundOut: 'rgba(255, 170, 0, 0.3)',
        background: 'rgba(255, 170, 0, 0.3)',
        paddedText: '\u202F',
    },

    imageEmpty: require('assets/img-empty-dark.png')
};