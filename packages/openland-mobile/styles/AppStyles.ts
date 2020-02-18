import { Platform, TextStyle } from 'react-native';
import { ASTextProps } from 'react-native-async-view/ASText';

export const RadiusStyles = {
    XSmall: 4,
    Small: 8,
    Medium: 12,
    Large: 18,
};

export const FontStyles = {
    Weight: {
        Thin: '100' as '100',
        Light: '300' as '300',
        Regular: '400' as '400',
        Medium: Platform.OS === 'ios' ? '600' : '500' as ('600' | '500'),
        Bold: '700' as '700',
        Black: '900' as '900',
    },
    Family: {
        Monospace: Platform.OS === 'ios' ? 'CourierNewPSMT' : 'monospace'
    }
};

type TextStylesVariants = 'Large' | 'Title1' | 'Title2' | 'Headline' | 'Label1' | 'Label2' | 'Label3' | 'Body' | 'Densed' | 'Subhead' | 'Caption' | 'Detail' | 'Post1' | 'Post2';

const TextStylesIOS: { [key in TextStylesVariants]: TextStyle } = {
    Large: { fontSize: 34, lineHeight: 40, fontWeight: FontStyles.Weight.Bold },
    Title1: { fontSize: 28, lineHeight: 32, fontWeight: FontStyles.Weight.Bold },
    Title2: { fontSize: 20, lineHeight: 26, fontWeight: FontStyles.Weight.Bold },
    Headline: { fontSize: 17, lineHeight: 24, fontWeight: FontStyles.Weight.Bold },
    Label1: { fontSize: 17, lineHeight: 24, fontWeight: FontStyles.Weight.Medium },
    Label2: { fontSize: 15, lineHeight: 20, fontWeight: FontStyles.Weight.Medium },
    Label3: { fontSize: 13, lineHeight: 18, fontWeight: FontStyles.Weight.Medium },
    Body: { fontSize: 17, lineHeight: 24, fontWeight: FontStyles.Weight.Regular },
    Densed: { fontSize: 17, lineHeight: 22, fontWeight: FontStyles.Weight.Regular },
    Subhead: { fontSize: 15, lineHeight: 20, fontWeight: FontStyles.Weight.Regular },
    Caption: { fontSize: 13, lineHeight: 18, fontWeight: FontStyles.Weight.Regular },
    Detail: { fontSize: 10, lineHeight: 12, fontWeight: FontStyles.Weight.Bold },
    Post1: { fontSize: 24, lineHeight: 34, fontWeight: FontStyles.Weight.Regular },
    Post2: { fontSize: 20, lineHeight: 28, fontWeight: FontStyles.Weight.Regular }
};

const TextStylesAndroid: { [key in TextStylesVariants]: TextStyle } = {
    Large: { fontSize: 34, lineHeight: 40, fontWeight: FontStyles.Weight.Bold },
    Title1: { fontSize: 28, lineHeight: 32, fontWeight: FontStyles.Weight.Bold },
    Title2: { fontSize: 18, lineHeight: 26, fontWeight: FontStyles.Weight.Bold },
    Headline: { fontSize: 20, lineHeight: 28, fontWeight: FontStyles.Weight.Bold },
    Label1: { fontSize: 16, lineHeight: 24, fontWeight: FontStyles.Weight.Medium },
    Label2: { fontSize: 14, lineHeight: 20, fontWeight: FontStyles.Weight.Medium },
    Label3: { fontSize: 12, lineHeight: 16, fontWeight: FontStyles.Weight.Medium },
    Body: { fontSize: 16, lineHeight: 24, fontWeight: FontStyles.Weight.Regular },
    Densed: { fontSize: 16, lineHeight: 22, fontWeight: FontStyles.Weight.Regular },
    Subhead: { fontSize: 14, lineHeight: 20, fontWeight: FontStyles.Weight.Regular },
    Caption: { fontSize: 12, lineHeight: 16, fontWeight: FontStyles.Weight.Regular },
    Detail: { fontSize: 10, lineHeight: 12, fontWeight: FontStyles.Weight.Bold },
    Post1: { fontSize: 24, lineHeight: 34, fontWeight: FontStyles.Weight.Regular },
    Post2: { fontSize: 20, lineHeight: 28, fontWeight: FontStyles.Weight.Regular }
};

const TextStylesAsyncIOS: { [key in TextStylesVariants]: ASTextProps } = {
    Large: { ...TextStylesIOS.Large as ASTextProps, letterSpacing: 0.4 },
    Title1: { ...TextStylesIOS.Title1 as ASTextProps, letterSpacing: 0.36 },
    Title2: { ...TextStylesIOS.Title2 as ASTextProps, letterSpacing: 0.38 },
    Headline: { ...TextStylesIOS.Headline as ASTextProps, letterSpacing: -0.41 },
    Label1: { ...TextStylesIOS.Label1 as ASTextProps, letterSpacing: -0.41 },
    Label2: { ...TextStylesIOS.Label2 as ASTextProps, letterSpacing: -0.24 },
    Label3: { ...TextStylesIOS.Label3 as ASTextProps, letterSpacing: -0.08 },
    Body: { ...TextStylesIOS.Body as ASTextProps, letterSpacing: -0.41 },
    Densed: { ...TextStylesIOS.Densed as ASTextProps, letterSpacing: -0.41 },
    Subhead: { ...TextStylesIOS.Subhead as ASTextProps, letterSpacing: -0.24 },
    Caption: { ...TextStylesIOS.Caption as ASTextProps, letterSpacing: -0.08 },
    Detail: { ...TextStylesIOS.Detail as ASTextProps, letterSpacing: 0.25 },
    Post1: { ...TextStylesIOS.Post1 as ASTextProps, letterSpacing: 0.36 },
    Post2: { ...TextStylesIOS.Post2 as ASTextProps, letterSpacing: 0.38 },
};

const TextStylesAsyncAndroid: { [key in TextStylesVariants]: ASTextProps } = {
    Large: { ...TextStylesAndroid.Large as ASTextProps, letterSpacing: undefined },
    Title1: { ...TextStylesAndroid.Title1 as ASTextProps, letterSpacing: undefined },
    Title2: { ...TextStylesAndroid.Title2 as ASTextProps, letterSpacing: 0.15 },
    Headline: { ...TextStylesAndroid.Headline as ASTextProps, letterSpacing: 0.15 },
    Label1: { ...TextStylesAndroid.Label1 as ASTextProps, letterSpacing: 0.15 },
    Label2: { ...TextStylesAndroid.Label2 as ASTextProps, letterSpacing: 0.1 },
    Label3: { ...TextStylesAndroid.Label3 as ASTextProps, letterSpacing: 0.4 },
    Body: { ...TextStylesAndroid.Body as ASTextProps, letterSpacing: 0.25 },
    Densed: { ...TextStylesAndroid.Densed as ASTextProps, letterSpacing: 0.25 },
    Subhead: { ...TextStylesAndroid.Subhead as ASTextProps, letterSpacing: 0.25 },
    Caption: { ...TextStylesAndroid.Caption as ASTextProps, letterSpacing: 0.4 },
    Detail: { ...TextStylesAndroid.Detail as ASTextProps, letterSpacing: 0.25 },
    Post1: { ...TextStylesAndroid.Post1 as ASTextProps, letterSpacing: 0.36 },
    Post2: { ...TextStylesAndroid.Post2 as ASTextProps, letterSpacing: 0.38 },
};

export const TextStyles = Platform.OS === 'ios' ? TextStylesIOS : TextStylesAndroid;
export const TextStylesAsync = Platform.OS === 'ios' ? TextStylesAsyncIOS : TextStylesAsyncAndroid;

export const CompensationAlpha = 0.84;
export const SecondarinessAlpha = 0.56;
export const HighlightAlpha = 0.24;