import * as ga from 'react-ga';
import * as Mixpanel from 'mixpanel-browser';

import { canUseDOM } from './environment';
let shouldTrack = canUseDOM && process.env.NODE_ENV === 'production';
if (shouldTrack) {
    ga.initialize('UA-99506931-3');
    Mixpanel.init('1cd91d607bef005d48954609f7ddd9a0');
}

export function trackPage(page?: string) {
    if (shouldTrack) {
        let p = page ? page : document.location.pathname;
        ga.pageview(p);
        Mixpanel.track('Page Viewed', { page: p });
    }
}