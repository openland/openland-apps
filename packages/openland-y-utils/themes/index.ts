import { ThemeGlobal } from './ThemeGlobal';

export const ThemeLightBlue: ThemeGlobal = {
    type: 'Light',
    kind: 'LightBlue',

    transparent: 'rgba(255, 255, 255, 0)',

    foregroundPrimary: '#171B1F',
    foregroundSecondary: '#676D7A',
    foregroundTertiary: '#969AA3',
    foregroundQuaternary: '#C4C7CC',

    backgroundPrimary: '#FFFFFF',
    backgroundPrimaryHover: '#F0F2F5',
    backgroundPrimaryActive: '#F0F2F5',

    backgroundSecondary: '#FFFFFF',
    backgroundSecondaryHover: '#F0F2F5',
    backgroundSecondaryActive: '#F0F2F5',

    backgroundTertiary: '#F2F3F5',
    backgroundTertiaryHover: '#EBEDF0',
    backgroundTertiaryActive: '#E6E7EB',

    backgroundInverted: '#F2F3F5',
    backgroundInvertedHover: '#EBEDF0',
    backgroundInvertedActive: '#F2F3F5',

    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#FFFFFF',

    overlayHeavy: '#000000',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',
    overlayInverted: 'rgba(0, 0, 0, 0.24)',

    accentPrimary: '#1885F2',
    accentPrimaryHover: '#2693FF',
    accentPrimaryActive: '#0B72D9',

    accentPositive: '#30BF6C',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#E62233',
    accentNegativeHover: '#F23041',
    accentNegativeActive: '#CC1424',

    tintRed: '#E52233',
    tintOrange: '#FFAE0D',
    tintGreen: '#36B25F',
    tintCyan: '#21C9D9',
    tintBlue: '#1885F2',
    tintPurple: '#8518F2',

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',

    bubbleIn: '#F2F3F5',
    bubbleOut: '#1885F2',

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

    // legacy

    separatorColor: '#eaeaea',
};

export const ThemeDark: ThemeGlobal = {
    type: 'Dark',
    kind: 'Dark',

    transparent: 'rgba(0, 0, 0, 0)',

    foregroundPrimary: '#FFFFFF',
    foregroundSecondary: '#8F8F8F',
    foregroundTertiary: '#5C5C5C',
    foregroundQuaternary: '#292929',

    backgroundPrimary: '#000000',
    backgroundPrimaryHover: '#1F1F1F',
    backgroundPrimaryActive: '#1F1F1F',

    backgroundSecondary: '#1F1F1F',
    backgroundSecondaryHover: '#1F1F1F',
    backgroundSecondaryActive: '#1F1F1F',

    backgroundTertiary: '#1F1F1F',
    backgroundTertiaryHover: '#1F1F1F',
    backgroundTertiaryActive: '#1F1F1F',

    backgroundInverted: '#000000',
    backgroundInvertedHover: '#000000',
    backgroundInvertedActive: '#000000',

    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#000000',

    overlayHeavy: '#000000',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',
    overlayInverted: 'rgba(255, 255, 255, 0.24)',

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',

    accentPositive: '#30BF6C',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#F22447',
    accentNegativeHover: '#FF0D35',
    accentNegativeActive: '#E60C30',

    tintRed: '#262626',
    tintOrange: '#262626',
    tintGreen: '#262626',
    tintCyan: '#262626',
    tintBlue: '#262626',
    tintPurple: '#262626',

    blurType: 'dark',
    keyboardAppearance: 'dark',
    statusBar: 'light-content',

    bubbleIn: '#333333',
    bubbleOut: '#4d4d4d',

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

    // legacy

    separatorColor: '#262629',
};

export const ThemeDefault = ThemeLightBlue;