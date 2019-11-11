import { ThemeLight } from './light';
import { ThemeDark } from './dark';
import { AccentRed, AccentOrange, AccentGrey, AccentGreen, AccentBlue, AccentPurple, AccentPink, AccentCyan } from './accents';
import { SystemTheme } from 'openland-mobile/themes/ThemeContext';

export type ThemeGlobalType = 'Light' | 'Dark';
export type AccentGlobalType = 'Default' | 'Red' | 'Orange' | 'Green' | 'Cyan' | 'Blue' | 'Purple' | 'Pink' | 'Grey';
export type ThemeVariants = ThemeGlobalType | 'System';
export type ThemeGlobalKind = {
    theme: ThemeVariants,
    accent?: AccentGlobalType
};

export type ThemeGlobal = {
    type: ThemeGlobalType;
    accentType: AccentGlobalType;
    supportedAccents: AccentGlobalType[];

    transparent: string;

    foregroundPrimary: string;
    foregroundSecondary: string;
    foregroundTertiary: string;
    foregroundQuaternary: string;
    foregroundContrast: string;
    foregroundInverted: string;

    backgroundPrimary: string;
    backgroundPrimaryHover: string;
    backgroundPrimaryActive: string;

    backgroundSecondary: string;
    backgroundSecondaryHover: string;
    backgroundSecondaryActive: string;

    backgroundTertiary: string;
    backgroundTertiaryHover: string;
    backgroundTertiaryActive: string;

    backgroundTertiaryTrans: string;

    accentPrimary: string;
    accentPrimaryHover: string;
    accentPrimaryActive: string;

    accentMuted: string;
    accentMutedHover: string;
    accentMutedActive: string;

    accentPositive: string;
    accentPositiveHover: string;
    accentPositiveActive: string;

    accentNegative: string;
    accentNegativeHover: string;
    accentNegativeActive: string;

    border: string;
    borderLight: string;

    overlayTotal: string;
    overlayHeavy: string;
    overlayMedium: string;
    overlayLight: string;

    tintRed: string;
    tintOrange: string;
    tintGreen: string;
    tintCyan: string;
    tintBlue: string;
    tintPurple: string;
    tintPink: string;
    tintGrey: string;
    tintInverted: string;

    // bubbles
    incomingBackgroundPrimary: string;
    incomingBackgroundSecondary: string;
    incomingForegroundPrimary: string;
    incomingForegroundSecondary: string;
    incomingForegroundTertiary: string;

    outgoingBackgroundPrimary: string;
    outgoingBackgroundSecondary: string;
    outgoingForegroundPrimary: string;
    outgoingForegroundSecondary: string;
    outgoingForegroundTertiary: string;

    // mobile-only
    blurType: 'dark' | 'light' | 'none';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';
};

export type AccentGlobal = {
    accentType: AccentGlobalType;

    foregroundInverted: string;

    accentPrimary: string;
    accentPrimaryHover: string;
    accentPrimaryActive: string;

    outgoingBackgroundPrimary: string;
    outgoingBackgroundSecondary: string;
    outgoingForegroundPrimary: string;
    outgoingForegroundSecondary: string;
    outgoingForegroundTertiary: string;
};

export type TintGlobal = {
    primary: string;
    hover: string;
    active: string;
    secondary: string;
};

export type PlaceholderGlobal = {
    start: string;
    end: string;
};

export const getThemeByType = (type: ThemeGlobalType | 'System') => {
    if (type === 'Light') {
        return ThemeLight;
    } else if (type === 'Dark') {
        return ThemeDark;
    } else if (type === 'System' && SystemTheme === 'dark') {
        return ThemeDark;
    }

    return ThemeLight;
};

export const getAccentByType = (type: AccentGlobalType) => {
    if (type === 'Red') {
        return AccentRed;
    } else if (type === 'Orange') {
        return AccentOrange;
    } else if (type === 'Green') {
        return AccentGreen;
    } else if (type === 'Cyan') {
        return AccentCyan;
    } else if (type === 'Blue') {
        return AccentBlue;
    } else if (type === 'Purple') {
        return AccentPurple;
    } else if (type === 'Pink') {
        return AccentPink;
    } else if (type === 'Grey') {
        return AccentGrey;
    } else {
        return undefined;
    }
};