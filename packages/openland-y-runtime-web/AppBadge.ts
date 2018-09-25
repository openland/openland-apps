import { AppBadgeAPi } from 'openland-y-runtime-api/AppBadgeApi';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { backoff } from 'openland-y-utils/timer';
import { AppVisibility } from './AppVisibility';

class BadgeStub implements AppBadgeAPi {
    items: Promise<any[]> | null = null;
    private isVisible = false;

    constructor() {
        if (canUseDOM) {
            this.isVisible = AppVisibility.isVisible;
            AppVisibility.watch((isVisible: boolean) => {
                this.isVisible = isVisible;
                if (isVisible) {
                    this.setBadge(0);
                }
            });

            this.items = backoff(() => import('favico.js')).then((v) => {
                let els = document.querySelectorAll('link[rel=icon]');
                let res = [];
                for (let i = 0; i < els.length; i++) {
                    res.push(new (v.default as any)({
                        position: 'topright',
                        animation: 'none',
                        element: els.item(i)
                    }));
                }
                return res;
            });
        }
    }

    setBadge(count: number) {
        if (this.isVisible) {
            if (this.items) {
                this.items!!.then((v) => {
                    for (let i of v) {
                        i.badge(count);
                    }
                });
            }
        }
    }
}

export const AppBadge = new BadgeStub();