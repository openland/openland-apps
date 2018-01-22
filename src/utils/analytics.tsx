import * as ga from 'react-ga';
import { canUseDOM } from './environment';
let shouldTrack = canUseDOM && process.env.NODE_ENV !== 'production';
if (shouldTrack) {
    ga.initialize('UA-99506931-3');
}
export function trackPage(page: string) {
    if (shouldTrack) {
        ga.pageview('/');
    }
}