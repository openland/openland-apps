import { processColor } from 'react-native';
import { processGradient } from 'react-native-async-view/utils/processGradient';
import { ASViewStyle } from 'react-native-async-view/ASViewStyle';

export function baseStyleProcessor(src: any) {
    return {
        ...src,
        backgroundColor: src.backgroundColor ? processColor(src.backgroundColor) : undefined,
        backgroundGradient: processGradient(src.backgroundGradient)
    };
}

export function rm(src: { [key: string]: ASViewStyle }) {
    let res = {};
    for (let k of Object.keys(src)) {
        res[k] = { props: baseStyleProcessor(src[k]) }
    }
    return res;
}