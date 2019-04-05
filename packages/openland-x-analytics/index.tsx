import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Track, TrackPlatform } from 'openland-engines/Tracking';
import { EventPlatform } from 'openland-api/Types';

export function trackEvent(event: string, params?: { [key: string]: any }) {
    const platform: TrackPlatform = {
        name: EventPlatform.WEB,
        isProd: location.hostname === 'openland.com'
    };

    if (canUseDOM) {
        Track.track(platform, event, params);
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