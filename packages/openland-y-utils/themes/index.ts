import { ThemeGlobal } from './types';

export const ThemeLightBlue: ThemeGlobal = {
    type: 'light',

    transparent: 'rgba(255, 255, 255, 0)',

    foregroundPrimary: '#1C2229',
    foregroundSecondary: '#78808F',
    foregroundTertiary: '#A9AEB8',
    foregroundQuaternary: '#D7DAE0',

    backgroundPrimary: '#FFFFFF',
    backgroundPrimaryHover: '#FFFFFF',
    backgroundPrimaryActive: '#FFFFFF',

    backgroundSecondary: '#FFFFFF',
    backgroundSecondaryHover: '#FFFFFF',
    backgroundSecondaryActive: '#FFFFFF',

    backgroundTertiary: '#F0F2F5',
    backgroundTertiaryHover: '#F0F2F5',
    backgroundTertiaryActive: '#F0F2F5',

    contrastPrimary: '#FFFFFF',

    accentPrimary: '#0C7FF2',
    accentPrimaryHover: '#0D86FF',
    accentPrimaryActive: '#0B78E6',

    accentPositive: '#26BF66',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#F20C32',
    accentNegativeHover: '#FF0D35',
    accentNegativeActive: '#E60C30',

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',

    bubbleIn: '#f3f5f7',
    bubbleOut: ['#1970ff', '#11b2ff'],

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

    separatorColor: '#eaeaea',
    modalOverlay: 'rgba(4, 4, 15, 0.4)',
    hairlineColor: '#e0e3e7',
    settingsNotificationIcon: '#0084fe',
    settingsAppearanceIcon: '#eb7272',
    settingsInviteIcon: '#fe9400',
    settingsHelpIcon: '#00bfff',
    settingsRateIcon: '#8a54ff',
    accentBackgroundColor: '#e5f2fe',
    highlightedComment: '#fffee8',
    chatImageBackground: '#dbdce1',
}

export const ThemeDarkBlue: ThemeGlobal = {
    type: 'dark',

    transparent: 'rgba(0, 0, 0, 0)',

    foregroundPrimary: '#1C2229',
    foregroundSecondary: '#78808F',
    foregroundTertiary: '#A9AEB8',
    foregroundQuaternary: '#D7DAE0',

    backgroundPrimary: '#FFFFFF',
    backgroundPrimaryHover: '#FFFFFF',
    backgroundPrimaryActive: '#FFFFFF',

    backgroundSecondary: '#FFFFFF',
    backgroundSecondaryHover: '#FFFFFF',
    backgroundSecondaryActive: '#FFFFFF',

    backgroundTertiary: '#F0F2F5',
    backgroundTertiaryHover: '#F0F2F5',
    backgroundTertiaryActive: '#F0F2F5',

    contrastPrimary: '#FFFFFF',

    accentPrimary: '#0C7FF2',
    accentPrimaryHover: '#0D86FF',
    accentPrimaryActive: '#0B78E6',

    accentPositive: '#26BF66',
    accentPositiveHover: '#2BD974',
    accentPositiveActive: '#24B35F',

    accentNegative: '#F20C32',
    accentNegativeHover: '#FF0D35',
    accentNegativeActive: '#E60C30',

    blurType: 'dark',
    keyboardAppearance: 'dark',
    statusBar: 'light-content',

    bubbleIn: '#f3f5f7',
    bubbleOut: ['#1970ff', '#11b2ff'],

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

    separatorColor: '#eaeaea',
    modalOverlay: 'rgba(4, 4, 15, 0.4)',
    hairlineColor: '#e0e3e7',
    settingsNotificationIcon: '#262626',
    settingsAppearanceIcon: '#262626',
    settingsInviteIcon: '#262626',
    settingsHelpIcon: '#262626',
    settingsRateIcon: '#262626',
    accentBackgroundColor: '#e5f2fe',
    highlightedComment: '#fffee8',
    chatImageBackground: '#dbdce1',
}