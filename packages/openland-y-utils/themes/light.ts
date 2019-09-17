import { ThemeGlobal } from './ThemeGlobal';

export const ThemeLight: ThemeGlobal = {
    type: 'Light',
    kind: 'Light',

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
    borderLight: 'rgba(0, 0, 0, 0.04)',

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
};

export const ThemeLightRed: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightRed',

    accentPrimary: '#E52243',
    accentPrimaryHover: '#E52243',
    accentPrimaryActive: '#E52243',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#E52243' : '#F2F3F5',
        backgroundSecondary: isOut ? '#E52243' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightOrange: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightOrange',

    accentPrimary: '#FFAE0D',
    accentPrimaryHover: '#FFAE0D',
    accentPrimaryActive: '#FFAE0D',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#FFAE0D' : '#F2F3F5',
        backgroundSecondary: isOut ? '#FFAE0D' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightGreen: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightGreen',

    accentPrimary: '#3EB265',
    accentPrimaryHover: '#3EB265',
    accentPrimaryActive: '#3EB265',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#3EB265' : '#F2F3F5',
        backgroundSecondary: isOut ? '#3EB265' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightCyan: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightCyan',

    accentPrimary: '#29BECC',
    accentPrimaryHover: '#29BECC',
    accentPrimaryActive: '#29BECC',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#29BECC' : '#F2F3F5',
        backgroundSecondary: isOut ? '#29BECC' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightPink: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightPink',

    accentPrimary: '#F224AE',
    accentPrimaryHover: '#F224AE',
    accentPrimaryActive: '#F224AE',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#F224AE' : '#F2F3F5',
        backgroundSecondary: isOut ? '#E617A1' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightPurple: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightPurple',

    accentPrimary: '#8518F2',
    accentPrimaryHover: '#8518F2',
    accentPrimaryActive: '#8518F2',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#8518F2' : '#F2F3F5',
        backgroundSecondary: isOut ? '#8518F2' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};

export const ThemeLightGray: ThemeGlobal = {
    ...ThemeLight,

    kind: 'LightGray',

    accentPrimary: '#6C717A',
    accentPrimaryHover: '#6C717A',
    accentPrimaryActive: '#6C717A',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#6C717A' : '#F2F3F5',
        backgroundSecondary: isOut ? '#6C717A' : '#EBEDF0',

        foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
    }),
};