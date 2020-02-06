import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { Track, TrackPlatform } from 'openland-engines/Tracking';
import { EventPlatform } from 'openland-api/spacex.types';
import { isMobile } from 'openland-web/hooks/useIsMobile';
import { detectOS } from 'openland-x-utils/detectOS';
import { CrashReporting } from 'openland-engines/CrashReporting';

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
    CrashReporting.notify(src);
}

const getReferrer: () => { host: string, url: string } = () => {
    let url = 'unknown';
    let host = 'unknown';

    if (document && document.referrer && document.referrer.length > 0) {
        url = document.referrer;
        host = new URL(url).hostname;
    }

    return { url, host };
};

const trackLaunch = () => {
    if (canUseDOM) {
        const firstLaunch = localStorage.getItem('openland-first-launch');
        const firstSessionLaunch = sessionStorage.getItem('openland-first-session-launch');
        const { host, url } = getReferrer();

        if (!firstLaunch) {
            const currentDate = new Date();

            trackEvent('launch_first_time', { 'referral_host': host, 'referral_url': url });

            localStorage.setItem('openland-first-launch', currentDate.getTime().toString());
        }

        if (!firstSessionLaunch) {
            const currentDate = new Date();

            trackEvent('session_start', { 'referral_host': host, 'referral_url': url });

            sessionStorage.setItem('openland-first-session-launch', currentDate.getTime().toString());
        }
    }
};

trackLaunch();