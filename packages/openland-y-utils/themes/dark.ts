import { ThemeGlobal } from './ThemeGlobal';

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
    borderLight: 'rgba(255, 255, 255, 0.04)',

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

export const ThemeDarkBlue: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkBlue',

    accentPrimary: '#248BF2',
    accentPrimaryHover: '#248BF2',
    accentPrimaryActive: '#248BF2',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#248BF2' : '#242629',
        backgroundSecondary: isOut ? '#248BF2' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkRed: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkRed',

    accentPrimary: '#E52243',
    accentPrimaryHover: '#E52243',
    accentPrimaryActive: '#E52243',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#E52243' : '#242629',
        backgroundSecondary: isOut ? '#E52243' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkOrange: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkOrange',

    accentPrimary: '#FFAE0D',
    accentPrimaryHover: '#FFAE0D',
    accentPrimaryActive: '#FFAE0D',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#FFAE0D' : '#242629',
        backgroundSecondary: isOut ? '#FFAE0D' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkGreen: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkGreen',

    accentPrimary: '#3EB265',
    accentPrimaryHover: '#3EB265',
    accentPrimaryActive: '#3EB265',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#3EB265' : '#242629',
        backgroundSecondary: isOut ? '#3EB265' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkCyan: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkCyan',

    accentPrimary: '#29BECC',
    accentPrimaryHover: '#29BECC',
    accentPrimaryActive: '#29BECC',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#29BECC' : '#242629',
        backgroundSecondary: isOut ? '#29BECC' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkPink: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkPink',

    accentPrimary: '#F218A9',
    accentPrimaryHover: '#F218A9',
    accentPrimaryActive: '#F218A9',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#F218A9' : '#242629',
        backgroundSecondary: isOut ? '#F218A9' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};

export const ThemeDarkPurple: ThemeGlobal = {
    ...ThemeDark,

    kind: 'DarkPurple',

    accentPrimary: '#8518F2',
    accentPrimaryHover: '#8518F2',
    accentPrimaryActive: '#8518F2',

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => ({
        backgroundPrimary: isOut ? '#8518F2' : '#242629',
        backgroundSecondary: isOut ? '#8518F2' : '#2E3033',

        foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
        foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
        foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
    }),
};