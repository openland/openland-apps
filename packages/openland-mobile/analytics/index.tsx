import { Track, TrackPlatform } from 'openland-engines/Tracking';
import { Platform } from 'react-native';
import { EventPlatform } from 'openland-api/Types';

const platform: TrackPlatform = {
    name: Platform.OS === 'ios' ? EventPlatform.iOS : EventPlatform.Android,
    isProd: !__DEV__
};

export function trackEvent(event: string, params?: { [key: string]: any }) {
    Track.track(platform, event, params);
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