import { ThemeGlobal } from './ThemeGlobal';
import {
    TintBlue,
    TintGreen,
    TintRed,
    TintOrange,
    TintCyan,
    TintPurple,
    TintInverted,
    TintPink,
    TintGrey,
} from './tints';

export const ThemeLight: ThemeGlobal = {
    type: 'Light',
    accentType: 'Default',
    supportedAccents: ['Red', 'Orange', 'Green', 'Cyan', 'Default', 'Purple', 'Pink', 'Grey'],

    transparent: 'rgba(255, 255, 255, 0)',

    foregroundPrimary: '#171A1F',
    foregroundSecondary: '#71747A',
    foregroundTertiary: '#9D9FA3',
    foregroundQuaternary: '#C8C9CC',
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

    backgroundTertiaryTrans: 'rgba(201, 204, 209, 0.24)',
    backgroundTertiaryHoverTrans: 'rgba(169, 174, 184, 0.24)',
    backgroundTertiaryActiveTrans: 'rgba(148, 155, 168, 0.24)',

    payBackgroundPrimary: '#171A1F',
    payBackgroundSecondary: '#292C33',
    payForegroundPrimary: '#FFFFFF',
    payForegroundSecondary: 'rgba(255, 255, 255, 0.56)',

    accentPrimary: TintBlue.primary,
    accentPrimaryHover: TintBlue.hover,
    accentPrimaryActive: TintBlue.active,

    accentMuted: '#4595E5',
    accentMutedHover: '#4595E5',
    accentMutedActive: '#4595E5',

    accentPositive: TintGreen.primary,
    accentPositiveHover: TintGreen.hover,
    accentPositiveActive: TintGreen.active,

    accentNegative: TintRed.primary,
    accentNegativeHover: TintRed.hover,
    accentNegativeActive: TintRed.active,

    accentPay: '#171A1F',
    accentPayHover: '#212329',
    accentPayActive: '#33373D',

    border: 'rgba(0, 0, 0, 0.08)',
    borderLight: 'rgba(0, 0, 0, 0.04)',

    overlayTotal: '#000000',
    overlayHeavy: 'rgba(0, 0, 0, 0.84)',
    overlayMedium: 'rgba(0, 0, 0, 0.48)',
    overlayLight: 'rgba(0, 0, 0, 0.24)',

    tintRed: TintRed.primary,
    tintOrange: TintOrange.primary,
    tintGreen: TintGreen.primary,
    tintCyan: TintCyan.primary,
    tintBlue: TintBlue.primary,
    tintPurple: TintPurple.primary,
    tintPink: TintPink.primary,
    tintGrey: TintGrey.primary,
    tintInverted: TintInverted.primary,

    incomingBackgroundPrimary: '#F2F3F5',
    incomingBackgroundSecondary: '#E8EAED',
    incomingForegroundPrimary: '#171A1F',
    incomingForegroundSecondary: '#969AA3',
    incomingForegroundTertiary: '#C4C7CC',

    outgoingBackgroundPrimary: TintBlue.primary,
    outgoingBackgroundSecondary: TintBlue.secondary,
    outgoingForegroundPrimary: '#FFFFFF',
    outgoingForegroundSecondary: 'rgba(255, 255, 255, 0.56)',
    outgoingForegroundTertiary: 'rgba(255, 255, 255, 0.36)',

    gradient0to100Start: 'rgba(201, 204, 209, 0)',
    gradient0to100End: 'rgba(201, 204, 209, 0.14)',

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',

    displayFeaturedIcon: true,
};
