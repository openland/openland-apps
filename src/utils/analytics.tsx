import * as ga from 'react-ga';
import * as Mixpanel from 'mixpanel-browser';
import { canUseDOM } from './environment';

let shouldTrack = canUseDOM && (window as any).isProduction;
if (shouldTrack) {
    ga.initialize('UA-99506931-3');
    Mixpanel.init('1cd91d607bef005d48954609f7ddd9a0');
}

export function trackEvent(event: string, params?: { [key: string]: any }) {
    if (shouldTrack) {
        
        // Forward to mixpanel
        Mixpanel.track(event, params);

        // Forward to intercom
        (window as any).Intercom('trackEvent', event, params);
    }
}

export function trackPage(page?: string) {
    if (shouldTrack) {
        let p = page ? page : document.location.pathname;
        
        // Track in Google Analytics
        ga.pageview(p);

        // Track in other analytical platforms
        // Replacing with application level event tracking
        // trackEvent('Page Viewed', { page: p });
    }
}

export function trackProfile(id: string, firstName: string, lastName: string, email: string) {
    if (shouldTrack) {

        // Identify mixpanel
        Mixpanel.identify(id);
        Mixpanel.people.set({
            '$email': email,
            '$first_name': firstName,
            '$last_name': lastName
        });

        // Identify Centry
        (window as any).Raven.setUserContext({
            email: email,
            id: id
        });

        // Identify Intercom
        (window as any).Intercom('update', { email: email, user_id: id, name: (firstName + ' ' + lastName).trim() });
    }
}

export function trackError(src: any) {
    if (shouldTrack) {
        // Trying to report exception
        (window as any).Raven.captureException(src);

        // Log exception to analytics
        trackEvent('Error', { error: '' + src });
    }
}