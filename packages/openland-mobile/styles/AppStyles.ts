import { Platform, TextStyle } from 'react-native';

export const RadiusStyles = {
    small: 6,
    medium: 12,
    large: 18,
};

export const TextStyles = {
    weight: {
        thin: '100' as '100',
        light: '300' as '300',
        regular: '400' as '400',
        medium: Platform.OS === 'ios' ? '600' : '500' as ('600' | '500'),
        bold: '700' as '700',
        black: '900' as '900',
    },
    family: {
        monospace: Platform.OS === 'ios' ? 'CourierNewPSMT' : 'monospace'
    }
};

export const TypeStyles = {
    title1: {
        fontSize: 34,
        lineHeight: 40,
        fontWeight: TextStyles.weight.bold
    } as TextStyle,
    title2: {
        fontSize: 28,
        lineHeight: 32,
        fontWeight: TextStyles.weight.bold
    } as TextStyle,
    title3: {
        fontSize: 20,
        lineHeight: 26,
        fontWeight: TextStyles.weight.bold
    } as TextStyle,
    title4: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: TextStyles.weight.bold
    } as TextStyle,
    label1: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: TextStyles.weight.medium
    } as TextStyle,
    label2: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: TextStyles.weight.medium
    } as TextStyle,
    body: {
        fontSize: 17,
        lineHeight: 24,
        fontWeight: TextStyles.weight.regular
    } as TextStyle,
    densed: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: TextStyles.weight.regular
    } as TextStyle,
    subhead: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: TextStyles.weight.regular
    } as TextStyle,
    caption: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: TextStyles.weight.regular
    } as TextStyle
};