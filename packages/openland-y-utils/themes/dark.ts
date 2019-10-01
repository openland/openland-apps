import { ThemeGlobal, TintGlobal, ThemeGlobalKind } from './ThemeGlobal';
import { TintBlue, TintGreen, TintRed, TintOrange, TintCyan, TintPurple, TintInverted, TintPink } from './tints';

const buildBubbleColor = (tint: TintGlobal, isOut: boolean) => ({
    backgroundPrimary: isOut ? tint.primary : '#242629',
    backgroundSecondary: isOut ? tint.secondary : '#2E3033',

    foregroundPrimary: isOut ? '#FFFFFF' : '#FFFFFF',
    foregroundSecondary: isOut ? 'rgba(255, 255, 255, 0.56)' : '#55575C',
    foregroundTertiary: isOut ? 'rgba(255, 255, 255, 0.36)' : '#55575C',
});

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

    backgroundTertiary: 'rgba(96, 101, 107, 0.24)',
    backgroundTertiaryHover: '#242629',
    backgroundTertiaryActive: '#242629',

    accentPrimary: '#FFFFFF',
    accentPrimaryHover: '#FFFFFF',
    accentPrimaryActive: '#FFFFFF',

    accentMuted: '#FFFFFF',
    accentMutedHover: '#FFFFFF',
    accentMutedActive: '#FFFFFF',

    accentPositive: TintGreen.primary,
    accentPositiveHover: TintGreen.hover,
    accentPositiveActive: TintGreen.active,

    accentNegative: TintRed.primary,
    accentNegativeHover: TintRed.hover,
    accentNegativeActive: TintRed.active,

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
    tintPink: '#242629',
    tintGrey: '#242629',
    tintInverted: TintInverted.primary,

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
};

const buildTintedTheme: (kind: ThemeGlobalKind, tint: TintGlobal) => ThemeGlobal = (kind, tint) => ({
    ...ThemeDark,

    kind,

    accentPrimary: tint.primary,
    accentPrimaryHover: tint.hover,
    accentPrimaryActive: tint.active,

    foregroundInverted: '#FFFFFF',

    bubble: (isOut) => buildBubbleColor(tint, isOut),
});

export const ThemeDarkBlue = buildTintedTheme('DarkBlue', TintBlue);
export const ThemeDarkRed = buildTintedTheme('DarkRed', TintRed);
export const ThemeDarkOrange = buildTintedTheme('DarkOrange', TintOrange);
export const ThemeDarkGreen = buildTintedTheme('DarkGreen', TintGreen);
export const ThemeDarkCyan = buildTintedTheme('DarkCyan', TintCyan);
export const ThemeDarkPink = buildTintedTheme('DarkPink', TintPink);
export const ThemeDarkPurple = buildTintedTheme('DarkPurple', TintPurple);