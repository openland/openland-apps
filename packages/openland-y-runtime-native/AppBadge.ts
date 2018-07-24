import { AppBadgeAPi } from 'openland-y-runtime-api/AppBadgeApi';
import Push from 'react-native-push-notification';

class BadgeStub implements AppBadgeAPi {
    setBadge(count: number) {
        Push.setApplicationIconBadgeNumber(count);
    }
}

export const AppBadge = new BadgeStub();