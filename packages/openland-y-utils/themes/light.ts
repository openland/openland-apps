import { ThemeGlobal, TintGlobal, ThemeGlobalKind } from './ThemeGlobal';
import { TintBlue, TintGreen, TintRed, TintOrange, TintCyan, TintPurple, TintInverted, TintPink, TintGrey } from './tints';

const buildBubbleColor = (tint: TintGlobal, isOut: boolean) => ({
    backgroundPrimary: isOut ? tint.primary : '#F2F3F5',
    backgroundSecondary: isOut ? tint.secondary : '#E8EAED',

    foregroundPrimary: isOut ? '#FFFFFF' : '#171A1F',
    foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#969AA3',
    foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#C4C7CC',
});

export const ThemeLight: ThemeGlobal = {
    type: 'Light',
    kind: 'Light',

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

    backgroundTertiary: 'rgba(201, 204, 209, 0.24)',
    backgroundTertiaryHover: '#EDEEF0',
    backgroundTertiaryActive: '#E6E7EB',

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

    bubble: (isOut) => buildBubbleColor(TintBlue, isOut),

    blurType: 'light',
    keyboardAppearance: 'light',
    statusBar: 'dark-content',
};

const buildTintedTheme: (kind: ThemeGlobalKind, tint: TintGlobal) => ThemeGlobal = (kind, tint) => ({
    ...ThemeLight,

    kind,

    accentPrimary: tint.primary,
    accentPrimaryHover: tint.hover,
    accentPrimaryActive: tint.active,

    bubble: (isOut) => buildBubbleColor(tint, isOut),
});

export const ThemeLightRed = buildTintedTheme('LightRed', TintRed);
export const ThemeLightOrange = buildTintedTheme('LightOrange', TintOrange);
export const ThemeLightGreen = buildTintedTheme('LightGreen', TintGreen);
export const ThemeLightCyan = buildTintedTheme('LightCyan', TintCyan);
export const ThemeLightPink = buildTintedTheme('LightPink', TintPink);
export const ThemeLightPurple = buildTintedTheme('LightPurple', TintPurple);
export const ThemeLightGrey = buildTintedTheme('LightGrey', TintGrey);