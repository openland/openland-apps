export type ThemeGlobalKind = 'Light' | 'LightRed' | 'LightOrange' | 'LightGreen' | 'LightCyan' | 'LightPink' | 'LightPurple' | 'LightGrey' | 'Dark' | 'DarkBlue' | 'DarkRed' | 'DarkOrange' | 'DarkGreen' | 'DarkCyan' | 'DarkPink' | 'DarkPurple';
export type ThemeGlobalType = 'Light' | 'Dark';

export type ThemeGlobal = {
    type: ThemeGlobalType;
    kind: ThemeGlobalKind;

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

    bubble: (isOut: boolean) => {
        backgroundPrimary: string;
        backgroundSecondary: string;

        foregroundPrimary: string;
        foregroundSecondary: string;
        foregroundTertiary: string;
    };

    // mobile-only
    blurType: 'dark' | 'light' | 'none';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';
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