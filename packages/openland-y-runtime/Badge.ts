import { BadgeAPi } from 'openland-y-runtime-api/BadgeApi';

class BadgeStub implements BadgeAPi {
    setBadge(count: number) {
        //
    }
}

export const Badge = new BadgeStub();