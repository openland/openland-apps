import { AppBadgeAPi } from 'openland-y-runtime-api/AppBadgeApi';

class BadgeStub implements AppBadgeAPi {
    setBadge(count: number) {
        //
    }
}

export const AppBadge = new BadgeStub();