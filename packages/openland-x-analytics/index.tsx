import * as ga from 'react-ga';
import * as Mixpanel from 'mixpanel-browser';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { loadConfig } from 'openland-x-config';

let GAToken = canUseDOM && loadConfig().googleAnalyticsKey;
let MixpanelToken = canUseDOM && loadConfig().mixpanelKey;
let intercomToken = canUseDOM && loadConfig().intercomKey;
let sentryEndpoint = canUseDOM && loadConfig().sentryEndpoint;

let shouldTrack = canUseDOM && (!!GAToken || !!MixpanelToken);
if (shouldTrack) {
    if (GAToken) {
        ga.initialize(GAToken);
    }
    if (MixpanelToken) {
        Mixpanel.init(MixpanelToken);
    }
}

export function trackEvent(event: string, params?: { [key: string]: any }) {
    if (shouldTrack) {

        // Forward to mixpanel
        if (MixpanelToken) {
            Mixpanel.track(event, params);
        }

        // Forward to intercom
        if (intercomToken) {
            (window as any).Intercom('trackEvent', event, params);
        }
    }
}

export function trackPage(page?: string) {
    if (shouldTrack) {
        let p = page ? page : document.location.pathname;

        // Track in Google Analytics
        if (GAToken) {
            ga.pageview(p);
        }

        // Track in other analytical platforms
        // Replacing with application level event tracking
        // trackEvent('Page Viewed', { page: p });
    }
}

export function trackProfile(id: string, firstName: string, lastName: string | null, email: string | null) {
    if (shouldTrack) {

        // Identify mixpanel
        if (MixpanelToken) {
            Mixpanel.identify(id);
            Mixpanel.people.set({
                '$email': email,
                '$first_name': firstName,
                '$last_name': lastName
            });
        }

        // Identify Centry
        if (sentryEndpoint) {
            (window as any).Raven.setUserContext({
                email: email,
                id: id
            });
        }

        // Identify Intercom
        if (intercomToken) {
            (window as any).Intercom('update', { email: email, user_id: id, name: ((firstName === null ? '' : firstName) + ' ' + (lastName === null ? lastName : '')).trim() });
        }
    }
}

export function trackError(src: any) {
    if (shouldTrack) {
        // Trying to report exception
        if (sentryEndpoint) {
            (window as any).Raven.captureException(src);
        }

        // Log exception to analytics
        trackEvent('Error', { error: '' + src });
    }
}