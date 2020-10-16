import { ThemeGlobal } from './ThemeGlobal';
import { TintGreen, TintRed, TintInverted, TintMono } from './tints';

export const ThemeDark: ThemeGlobal = {
    type: 'Dark',
    accentType: 'Default',
    supportedAccents: ['Red', 'Orange', 'Green', 'Cyan', 'Blue', 'Purple', 'Pink', 'Default'],

    transparent: 'rgba(0, 0, 0, 0)',

    foregroundPrimary: '#FFFFFF',
    foregroundSecondary: '#898B8F',
    foregroundTertiary: '#5E6166',
    foregroundQuaternary: '#484B52',
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

    backgroundTertiaryTrans: 'rgba(96, 101, 107, 0.24)',
    backgroundTertiaryHoverTrans: 'rgba(76, 80, 87, 0.24)',
    backgroundTertiaryActiveTrans: 'rgba(53, 53, 56, 0.24)',

    payBackgroundPrimary: '#5E6166',
    payBackgroundSecondary: '#55575C',
    payForegroundPrimary: '#FFFFFF',
    payForegroundSecondary: 'rgba(255, 255, 255, 0.56)',

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',
    accentPrimaryTrans: 'rgba(255, 255, 255, 0.16)',

    accentMuted: '#FFFFFF',
    accentMutedHover: '#FFFFFF',
    accentMutedActive: '#FFFFFF',

    accentPositive: TintGreen.primary,
    accentPositiveHover: TintGreen.hover,
    accentPositiveActive: TintGreen.active,

    accentNegative: TintRed.primary,
    accentNegativeHover: TintRed.hover,
    accentNegativeActive: TintRed.active,

    accentPay: '#898B8F',
    accentPayHover: '#898B8F',
    accentPayActive: '#898B8F',

    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.04)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    tintRed: TintMono.primary,
    tintOrange: TintMono.primary,
    tintGreen: TintMono.primary,
    tintCyan: TintMono.primary,
    tintBlue: TintMono.primary,
    tintPurple: TintMono.primary,
    tintPink: TintMono.primary,
    tintGrey: TintMono.primary,
    tintInverted: TintInverted.primary,

    incomingBackgroundPrimary: '#242629',
    incomingBackgroundSecondary: '#2E3033',
    incomingForegroundPrimary: '#FFFFFF',
    incomingForegroundSecondary: '#55575C',
    incomingForegroundTertiary: '#55575C',

    outgoingBackgroundPrimary: '#4B4E52',
    outgoingBackgroundSecondary: '#424447',
    outgoingForegroundPrimary: '#FFFFFF',
    outgoingForegroundSecondary: '#808185',
    outgoingForegroundTertiary: '#808185',

    gradient0to100Start: 'rgba(96, 101, 107, 0)',
    gradient0to100End: 'rgba(96, 101, 107, 0.14)',

    blurType: 'none',
    keyboardAppearance: 'dark',
    statusBar: 'light-content',
};
