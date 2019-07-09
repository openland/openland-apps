export type ThemeGlobalKind = 'LightBlue' | 'DarkBlue';

export type ThemeGlobal = {
    type: 'light' | 'dark';

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

    contrastPrimary: string;

    accentPrimary: string;
    accentPrimaryHover: string;
    accentPrimaryActive: string;

    accentPositive: string;
    accentPositiveHover: string;
    accentPositiveActive: string;

    accentNegative: string;
    accentNegativeHover: string;
    accentNegativeActive: string;

    blurType: 'dark' | 'light';
    keyboardAppearance: 'dark' | 'light';
    statusBar: 'dark-content' | 'light-content';

    bubbleIn: string;
    bubbleOut: string[];

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

    // Legacy. Need to discuss!
    separatorColor: string;
    modalOverlay: string;
    hairlineColor: string;
    settingsNotificationIcon: string;
    settingsAppearanceIcon: string;
    settingsInviteIcon: string;
    settingsHelpIcon: string;
    settingsRateIcon: string;
    accentBackgroundColor: string;
    highlightedComment: string;
    chatImageBackground: string;
}

export type PlaceholderGlobal = {
    start: string;
    end: string;
}