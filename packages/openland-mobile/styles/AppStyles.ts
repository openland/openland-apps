import { Platform, TextStyle } from 'react-native';

export const RadiusStyles = {
    Small: 6,
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

type TextStylesVariants = 'Large' | 'Title1' | 'Title2' | 'Headline' | 'Label1' | 'Label2' | 'Label3' | 'Body' | 'Densed' | 'Subhead' | 'Caption';

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
    Caption: { fontSize: 13, lineHeight: 18, fontWeight: FontStyles.Weight.Regular }
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
    Caption: { fontSize: 12, lineHeight: 16, fontWeight: FontStyles.Weight.Regular }
};

export const TextStyles = Platform.OS === 'ios' ? TextStylesIOS : TextStylesAndroid;