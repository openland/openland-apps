import { AccentGlobal, AccentGlobalType } from './ThemeGlobal';

type AccentSource = {
    primary: string;
    hover: string;
    active: string;
    secondary: string;
    darkMuted: string;
};
const buildAccent = (type: AccentGlobalType, source: AccentSource) => ({
    accentType: type,

    foregroundInverted: '#FFFFFF',

    accentPrimary: source.primary,
    accentPrimaryHover: source.hover,
    accentPrimaryActive: source.active,
    accentDarkMuted: source.darkMuted,

    outgoingBackgroundPrimary: source.primary,
    outgoingBackgroundSecondary: source.secondary,
    outgoingForegroundPrimary: '#FFFFFF',
    outgoingForegroundSecondary: 'rgba(255, 255, 255, 0.56)',
    outgoingForegroundTertiary: 'rgba(255, 255, 255, 0.36)',
}) as AccentGlobal;

const AccentSourceRed: AccentSource = {
    primary: '#E04556',
    hover: '#ED5263',
    active: '#DA384A',
    secondary: '#DA384A',
    darkMuted: '#B44B56',
};

const AccentSourceOrange: AccentSource = {
    primary: '#F28B0C',
    hover: '#FF9F29',
    active: '#EA8304',
    secondary: '#EA8304',
    darkMuted: '#C7763C',
};

const AccentSourceGreen: AccentSource = {
    primary: '#8AB840',
    hover: '#99C84D',
    active: '#80B12F',
    secondary: '#80B12F',
    darkMuted: '#7DA044',
};

const AccentSourceCyan: AccentSource = {
    primary: '#27B2CE',
    hover: '#35C4E0',
    active: '#19A9C6',
    secondary: '#19A9C6',
    darkMuted: '#309BB0',
};

const AccentSourceBlue: AccentSource = {
    primary: '#248BF2',
    hover: '#3399FF',
    active: '#1677D9',
    secondary: '#1677D9',
    darkMuted: '#3A79B9',
};

const AccentSourcePurple: AccentSource = {
    primary: '#9456EC',
    hover: '#A56AFA',
    active: '#8341E1',
    secondary: '#654692',
    darkMuted: '#654692'
};

const AccentSourcePink: AccentSource = {
    primary: '#EF568D',
    hover: '#FD6FA2',
    active: '#EA4480',
    secondary: '#EA4480',
    darkMuted: '#C1587E',
};

const AccentSourceGrey: AccentSource = {
    primary: '#8192B2',
    hover: '#97A7C6',
    active: '#7489B0',
    secondary: '#7489B0',
    darkMuted: '#677798'
};

export const AccentRed = buildAccent('Red', AccentSourceRed);
export const AccentOrange = buildAccent('Orange', AccentSourceOrange);
export const AccentGreen = buildAccent('Green', AccentSourceGreen);
export const AccentCyan = buildAccent('Cyan', AccentSourceCyan);
export const AccentBlue = buildAccent('Blue', AccentSourceBlue);
export const AccentPurple = buildAccent('Purple', AccentSourcePurple);
export const AccentPink = buildAccent('Pink', AccentSourcePink);
export const AccentGrey = buildAccent('Grey', AccentSourceGrey);