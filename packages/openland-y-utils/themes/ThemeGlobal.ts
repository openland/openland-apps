export type ThemeGlobalKind = 'Light' | 'LightRed' | 'LightOrange' | 'LightGreen' | 'LightCyan' | 'LightPurple' | 'Dark' | 'DarkBlue' | 'DarkRed' | 'DarkOrange' | 'DarkGreen' | 'DarkCyan' | 'DarkPurple';
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
    tintInverted: string;

    bubble: (isOut: boolean) => {
        backgroundPrimary: string;
        backgroundSecondary: string;

        foregroundPrimary: string;
        foregroundSecondary: string;
        foregroundTertiary: string;
    };

    ironySpan: {
        backgroundOut: string;
        background: string;
        colorOut: string;
        color: string;
        paddedText: string;
    },

    codeSpan: {
        backgroundOut: string;
        background: string;
        paddedText: string;
    },

    // mobile-only
    blurType: 'dark' | 'light' | 'none';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    // legacy
    backgroundInverted: string;
    backgroundInvertedHover: string;
    backgroundInvertedActive: string;
    separatorColor: string;
};

export type PlaceholderGlobal = {
    start: string;
    end: string;
};