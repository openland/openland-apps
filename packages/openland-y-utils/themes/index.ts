import { ThemeGlobal } from './types';

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

    backgroundTertiary: '#F0F2F5',
    backgroundTertiaryHover: '#F0F2F5',
    backgroundTertiaryActive: '#F0F2F5',

    backgroundHighlight: '#FFFEE8',
    backgroundInverted: '#F0F2F5',

    contrastPrimary: '#FFFFFF',
    contrastSpecial: '#FFFFFF',

    overlayHeavy: '#000000',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    accentPrimary: '#1885F2',
    accentPrimaryHover: '#0D86FF',
    accentPrimaryActive: '#0B78E6',

    accentPositive: '#30BF6C',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#F22447',
    accentNegativeHover: '#FF0D35',
    accentNegativeActive: '#E60C30',

    tint1: '#FF5148',
    tint2: '#FFA201',
    tint3: '#3DBF1E',
    tint4: '#01C1CE',
    tint5: '#0C7FF2',
    tint6: '#9C10F2',

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',

    bubbleIn: '#f3f5f7',
    bubbleOut: '#1970ff',

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
    chatImageBackground: '#dbdce1',
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

    backgroundHighlight: '#002140',
    backgroundInverted: '#000000',

    contrastPrimary: '#FFFFFF',
    contrastSpecial: '#000000',

    overlayHeavy: '#000000',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',

    accentPositive: '#30BF6C',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#F22447',
    accentNegativeHover: '#FF0D35',
    accentNegativeActive: '#E60C30',

    tint1: '#262626',
    tint2: '#262626',
    tint3: '#262626',
    tint4: '#262626',
    tint5: '#262626',
    tint6: '#262626',

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
    chatImageBackground: '#555555',
};