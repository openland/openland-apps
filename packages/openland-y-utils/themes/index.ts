import { ThemeGlobal } from './ThemeGlobal';

export const ThemeLightBlue: ThemeGlobal = {
    type: 'Light',
    kind: 'LightBlue',

    transparent: 'rgba(255, 255, 255, 0)',

    foregroundPrimary: '#171A1F',
    foregroundSecondary: '#676D7A',
    foregroundTertiary: '#969AA3',
    foregroundQuaternary: '#C4C7CC',
    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#FFFFFF',

    backgroundPrimary: '#FFFFFF',
    backgroundPrimaryHover: '#F2F3F5',
    backgroundPrimaryActive: '#EBEDF0',

    backgroundSecondary: '#FFFFFF',
    backgroundSecondaryHover: '#F2F3F5',
    backgroundSecondaryActive: '#F2F3F5',

    backgroundTertiary: '#F2F3F5',
    backgroundTertiaryHover: '#EBEDF0',
    backgroundTertiaryActive: '#E6E7EB',

    backgroundInverted: '#F2F3F5',
    backgroundInvertedHover: '#EBEDF0',
    backgroundInvertedActive: '#F2F3F5',

    accentPrimary: '#1885F2',
    accentPrimaryHover: '#2693FF',
    accentPrimaryActive: '#0B72D9',

    accentMuted: '#4595E5',
    accentMutedHover: '#4595E5',
    accentMutedActive: '#4595E5',

    accentPositive: '#36B35F',
    accentPositiveHover: '#41BA69',
    accentPositiveActive: '#26994D',

    accentNegative: '#E62233',
    accentNegativeHover: '#F23041',
    accentNegativeActive: '#CC1424',

    border: 'rgba(0, 0, 0, 0.08)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#1885F2' : '#F2F3F5',
        backgroundSecondary: isOut ? '#0E7CEB' : '#EBEDF0',
    }),

    tintRed: '#E52233',
    tintOrange: '#FFAE0D',
    tintGreen: '#36B25F',
    tintCyan: '#21C9D9',
    tintBlue: '#1885F2',
    tintPurple: '#8518F2',

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',

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
    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#000000',

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

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',

    accentMuted: '#FFFFFF',
    accentMutedHover: '#FFFFFF',
    accentMutedActive: '#FFFFFF',

    accentPositive: '#36B35F',
    accentPositiveHover: '#41BA69',
    accentPositiveActive: '#26994D',

    accentNegative: '#E62233',
    accentNegativeHover: '#F23041',
    accentNegativeActive: '#CC1424',

    border: 'rgba(255, 255, 255, 0.08)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#4d4d4d' : '#333333',
        backgroundSecondary: isOut ? '#4d4d4d' : '#333333',
    }),

    tintRed: '#262626',
    tintOrange: '#262626',
    tintGreen: '#262626',
    tintCyan: '#262626',
    tintBlue: '#262626',
    tintPurple: '#262626',

    blurType: 'dark',
    keyboardAppearance: 'dark',
    statusBar: 'light-content',

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