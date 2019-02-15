import { processColor } from 'react-native';

export function processGradient(src: any) {
    return src ? {
        start: processColor(src.start),
        end: processColor(src.end)
    } : undefined
}