import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';
import { Track } from 'openland-engines/Tracking';

let sentryEndpoint = canUseDOM && loadConfig().sentryEndpoint && loadConfig().release;


export function trackEvent(event: string, params?: { [key: string]: any }) {
    if (canUseDOM) {
        Track.track(event, params);
    }
}

export function trackPage(page?: string) {
    // if (shouldTrack) {
    //     let p = page ? page : document.location.pathname;

    //     // Track in other analytical platforms
    //     // Replacing with application level event tracking
    //     // trackEvent('Page Viewed', { page: p });
    // }
}

export function trackProfile(id: string, firstName: string, lastName: string | null, email: string | null) {
    // if (shouldTrack) {

    //     // Identify mixpanel
    //     // if (MixpanelToken) {
    //     //     Mixpanel.identify(id);
    //     //     Mixpanel.people.set({
    //     //         '$email': email,
    //     //         '$first_name': firstName,
    //     //         '$last_name': lastName
    //     //     });
    //     // }

    //     // Identify Centry
    //     if (sentryEndpoint) {
    //         // TODO: Fix Me
    //         // (window as any).Raven.setUserContext({
    //         //     email: email,
    //         //     id: id
    //         // });
    //     }
    // }
}

export function trackError(src: any) {
    // Log exception to analytics
    trackEvent('Error', { error: '' + src });
}