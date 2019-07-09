export type ThemeGlobalKind = 'LightBlue' | 'Dark';

export type ThemeGlobal = {
    type: 'Light' | 'Dark';
    kind: ThemeGlobalKind;

    transparent: string;

    foregroundPrimary: string;
    foregroundSecondary: string;
    foregroundTertiary: string;
    foregroundQuaternary: string;

    backgroundPrimary: string;
    backgroundPrimaryHover: string;
    backgroundPrimaryActive: string;

    backgroundSecondary: string;
    backgroundSecondaryHover: string;
    backgroundSecondaryActive: string;

    backgroundTertiary: string;
    backgroundTertiaryHover: string;
    backgroundTertiaryActive: string;

    backgroundHighlight: string;

    contrastPrimary: string;
    contrastSpecial: string;

    overlayHeavy: string;
    overlayMedium: string;
    overlayLight: string;

    accentPrimary: string;
    accentPrimaryHover: string;
    accentPrimaryActive: string;

    accentPositive: string;
    accentPositiveHover: string;
    accentPositiveActive: string;

    accentNegative: string;
    accentNegativeHover: string;
    accentNegativeActive: string;

    tint1: string;
    tint2: string;
    tint3: string;
    tint4: string;
    tint5: string;
    tint6: string;

    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    bubbleIn: string;
    bubbleOut: string;

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

    // legacy

    separatorColor: string;
    hairlineColor: string;
    accentBackgroundColor: string;
    chatImageBackground: string;
}

export type PlaceholderGlobal = {
    start: string;
    end: string;
}