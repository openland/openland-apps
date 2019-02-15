import { processColor } from 'react-native';
import { processGradient } from 'react-native-async-view/utils/processGradient';

export function baseStyleProcessor(src: any) {
    return {
        ...src,
        backgroundColor: src.backgroundColor ? processColor(src.backgroundColor) : undefined,
        backgroundGradient: processGradient(src.backgroundGradient)
    };
}