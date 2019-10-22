import { AccentGlobal, TintGlobal, AccentGlobalType } from './ThemeGlobal';
import { TintRed, TintGrey, TintPink, TintPurple, TintBlue, TintCyan, TintGreen, TintOrange } from './tints';

const buildAccent = (type: AccentGlobalType, tint: TintGlobal) => ({
    accentType: type,

    foregroundInverted: '#FFFFFF',

    accentPrimary: tint.primary,
    accentPrimaryHover: tint.hover,
    accentPrimaryActive: tint.active,

    outgoingBackgroundPrimary: tint.primary,
    outgoingBackgroundSecondary: tint.secondary,
    outgoingForegroundPrimary: '#FFFFFF',
    outgoingForegroundSecondary: 'rgba(255, 255, 255, 0.56)',
    outgoingForegroundTertiary: 'rgba(255, 255, 255, 0.36)',
}) as AccentGlobal;

export const AccentRed = buildAccent('Red', TintRed);
export const AccentOrange = buildAccent('Orange', TintOrange);
export const AccentGreen = buildAccent('Green', TintGreen);
export const AccentCyan = buildAccent('Cyan', TintCyan);
export const AccentBlue = buildAccent('Blue', TintBlue);
export const AccentPurple = buildAccent('Purple', TintPurple);
export const AccentPink = buildAccent('Pink', TintPink);
export const AccentGrey = buildAccent('Grey', TintGrey);