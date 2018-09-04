import { processColor } from 'react-native';

export function baseStyleProcessor(src: any) {
    return {
        ...src,
        backgroundColor: src.backgroundColor ? processColor(src.backgroundColor) : undefined,
        backgroundGradient: src.backgroundGradient ? {
            start: processColor(src.backgroundGradient.start),
            end: processColor(src.backgroundGradient.end)
        } : undefined
    };
}