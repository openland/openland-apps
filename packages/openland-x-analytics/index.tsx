import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Track } from 'openland-engines/Tracking';

export function trackEvent(event: string, params?: { [key: string]: any }) {
    if (canUseDOM) {
        Track.track(event, params);
    }
}

export function trackPage(page?: string) {
    // Nothing to do
}

export function trackProfile(id: string, firstName: string, lastName: string | null, email: string | null) {
    // Nothing to do
}

export function trackError(src: any) {
    // Log exception to analytics
    trackEvent('Error', { error: '' + src });
}