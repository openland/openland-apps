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

const trackLaunch = async () => {
    const firstLaunch = await localStorage.getItem('openland-first-launch');

    if (!firstLaunch) {
        const currentDate = new Date();

        await localStorage.setItem('openland-first-launch', currentDate.getTime().toString());

        trackEvent('launch_first_time');
    }

    trackEvent('session_start');
}

trackLaunch();