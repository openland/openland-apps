import { ThemeGlobal } from './ThemeGlobal';

export const ThemeLightBlue: ThemeGlobal = {
    type: 'Light',
    kind: 'LightBlue',

    transparent: 'rgba(255, 255, 255, 0)',

    foregroundPrimary: '#171A1F',
    foregroundSecondary: '#6C717A',
    foregroundTertiary: '#969AA3',
    foregroundQuaternary: '#C4C7CC',
    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#FFFFFF',

    backgroundPrimary: '#FFFFFF',
    backgroundPrimaryHover: '#F2F3F5',
    backgroundPrimaryActive: '#F2F3F5',

    backgroundSecondary: '#FFFFFF',
    backgroundSecondaryHover: '#F2F3F5',
    backgroundSecondaryActive: '#F2F3F5',

    backgroundTertiary: '#F2F3F5',
    backgroundTertiaryHover: '#EDEEF0',
    backgroundTertiaryActive: '#E6E7EB',

    accentPrimary: '#248BF2',
    accentPrimaryHover: '#2693FF',
    accentPrimaryActive: '#0B72D9',

    accentMuted: '#4595E5',
    accentMutedHover: '#4595E5',
    accentMutedActive: '#4595E5',

    accentPositive: '#3EB265',
    accentPositiveHover: '#41BA69',
    accentPositiveActive: '#26994D',

    accentNegative: '#E62243',
    accentNegativeHover: '#F23041',
    accentNegativeActive: '#CC1424',

    border: 'rgba(0, 0, 0, 0.08)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    tintRed: '#E52233',
    tintOrange: '#FFAE0D',
    tintGreen: '#3EB265',
    tintCyan: '#21C9D9',
    tintBlue: '#248BF2',
    tintPurple: '#8518F2',
    tintInverted: 'rgba(255, 255, 255, 0.32)',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#248BF2' : '#F2F3F5',
        backgroundSecondary: isOut ? '#0E7CEB' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),

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
    backgroundInverted: '#F2F3F5',
    backgroundInvertedHover: '#EBEDF0',
    backgroundInvertedActive: '#F2F3F5',
    separatorColor: '#eaeaea',
};

export const ThemeDark: ThemeGlobal = {
    type: 'Dark',
    kind: 'Dark',

    transparent: 'rgba(0, 0, 0, 0)',

    foregroundPrimary: '#FFFFFF',
    foregroundSecondary: '#808185',
    foregroundTertiary: '#55575C',
    foregroundQuaternary: '#36383D',
    foregroundContrast: '#FFFFFF',
    foregroundInverted: '#111214',

    backgroundPrimary: '#111214',
    backgroundPrimaryHover: '#242629',
    backgroundPrimaryActive: '#242629',

    backgroundSecondary: '#242629',
    backgroundSecondaryHover: '#242629',
    backgroundSecondaryActive: '#242629',

    backgroundTertiary: '#242629',
    backgroundTertiaryHover: '#242629',
    backgroundTertiaryActive: '#242629',

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',

    accentMuted: '#FFFFFF',
    accentMutedHover: '#FFFFFF',
    accentMutedActive: '#FFFFFF',

    accentPositive: '#3EB265',
    accentPositiveHover: '#41BA69',
    accentPositiveActive: '#26994D',

    accentNegative: '#E62243',
    accentNegativeHover: '#F23041',
    accentNegativeActive: '#CC1424',

    border: 'rgba(255, 255, 255, 0.08)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    tintRed: '#242629',
    tintOrange: '#242629',
    tintGreen: '#242629',
    tintCyan: '#242629',
    tintBlue: '#242629',
    tintPurple: '#242629',
    tintInverted: 'rgba(255, 255, 255, 0.32)',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#4B4E52' : '#242629',
        backgroundSecondary: isOut ? '#424447' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? '#808185' : '#55575C',
        foregroundTertiary: isOut ? '#808185' : '#55575C',
    }),

    blurType: 'none',
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
    backgroundInverted: '#000000',
    backgroundInvertedHover: '#000000',
    backgroundInvertedActive: '#000000',
    separatorColor: '#262629',
};

export const ThemeDefault = ThemeLightBlue;