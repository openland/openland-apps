import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Track, TrackPlatform } from 'openland-engines/Tracking';
import { EventPlatform } from 'openland-api/Types';
import { isMobile } from 'openland-web/hooks/useIsMobile';
import { detectOS } from 'openland-x-utils/detectOS';

export function trackEvent(event: string, params?: { [key: string]: any }) {
    const platform: TrackPlatform = {
        name: isMobile() ? EventPlatform.MobileWeb : EventPlatform.WEB,
        os: detectOS() || 'Mac',
        isProd: location.hostname === 'openland.com'
    };

    if (canUseDOM) {
        Track.track(platform, event, params);
    }
}

export function trackError(src: any) {
    trackEvent('Error', { error: '' + src });
}

const trackLaunch = () => {
    if (canUseDOM) {
        const firstLaunch = localStorage.getItem('openland-first-launch');
        const firstSessionLaunch = sessionStorage.getItem('openland-first-session-launch');

        if (!firstLaunch) {
            const currentDate = new Date();

            trackEvent('launch_first_time');

            localStorage.setItem('openland-first-launch', currentDate.getTime().toString());
        }

        if (!firstSessionLaunch) {
            const currentDate = new Date();
            let url = '';
            let hostname = '';

            if (document.referrer && document.referrer.length > 0) {
                url = document.referrer;
                hostname = new URL(url).hostname;

                console.warn('referrer', { url, hostname });
            }

            trackEvent('session_start');

            sessionStorage.setItem('openland-first-session-launch', currentDate.getTime().toString());
        }
    }
};

trackLaunch();