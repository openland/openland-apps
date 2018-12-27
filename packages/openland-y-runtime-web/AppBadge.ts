import { AppBadgeAPi } from 'openland-y-runtime-api/AppBadgeApi';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

class BadgeStub implements AppBadgeAPi {
    private readonly isDesktop = canUseDOM && !!(global as any).require;

    setBadge(count: number) {
        if (this.isDesktop) {
            let app = (global as any).require('electron').remote.app;
            if (count <= 0) {
                app.setBadgeCount(0);
            } else {
                app.setBadgeCount(count);
            }
        }
    }
}

export const AppBadge = new BadgeStub();