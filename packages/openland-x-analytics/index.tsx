import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Track, TrackPlatform } from 'openland-engines/Tracking';

const platform: TrackPlatform = {
    name: 'Web',
    type: location.hostname === 'openland.com' ? 'production' : 'development'
};

export function trackEvent(event: string, params?: { [key: string]: any }) {
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