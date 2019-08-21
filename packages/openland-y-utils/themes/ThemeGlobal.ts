export type ThemeGlobalKind = 'LightBlue' | 'Dark';

export type ThemeGlobal = {
    type: 'Light' | 'Dark';
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

    backgroundInverted: string;
    backgroundInvertedHover: string;
    backgroundInvertedActive: string;

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

    overlayTotal: string;
    overlayHeavy: string;
    overlayMedium: string;
    overlayLight: string;

    bubble: (isOut: boolean) => {
        backgroundPrimary: string;
        backgroundSecondary: string;

        foregroundPrimary: string;
        foregroundSecondary: string;
        foregroundTertiary: string;
    };

    tintRed: string;
    tintOrange: string;
    tintGreen: string;
    tintCyan: string;
    tintBlue: string;
    tintPurple: string;

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
    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    // legacy
    separatorColor: string;
};

export type PlaceholderGlobal = {
    start: string;
    end: string;
};