import * as ga from 'react-ga';
import * as Mixpanel from 'mixpanel-browser';
import { canUseDOM } from './environment';

let shouldTrack = canUseDOM && process.env.NODE_ENV === 'production' && process.env.APP_PRODUCTION === 'true';
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

export function trackProfile(id: string, firstName: string, lastName: string, email: string) {
    if (shouldTrack) {
        Mixpanel.identify(id);
        Mixpanel.people.set({
            '$email': email,
            '$first_name': firstName,
            '$last_name': lastName
        });
    }
}

export function trackError(src: any) {
    if (shouldTrack) {
        // Trying to report exception
        (window as any).Raven.captureException(src);

        // Log exception to mixpanel
        Mixpanel.track('Error', { error: '' + src });
    }
}